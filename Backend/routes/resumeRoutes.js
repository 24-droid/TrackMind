import express from "express"
import pdf from "pdf-parse"
import mammoth from "mammoth"
import upload from "../utils/multerConfig.js"
import { protect } from "../middleware/authMiddleware.js"
import User from "../models/User.model.js"
import { generateJSONContent } from "../utils/aiService.js"

const router = express.Router();

async function extractTextFromFile(fileBuffer, mimetype) {
    let text = "";
    if (mimetype == 'application/pdf') {
        try {
            const data = await pdf(fileBuffer);
            text = data.text;
        } catch (error) {
            console.error("Error extracting text from pdf:", error);
            throw new Error("Failed to extract text from the PDF. It might be corrupted or unreadable.");
        }
    }
    else if (mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        try {
            const result = await mammoth.extractRawText({ arrayBuffer: fileBuffer.buffer });
            text = result.value;
        } catch (error) {
            console.error("Error extracting text from DOCX:", error);
            throw new Error("Failed to extract text from DOCX. Ensure it's a valid .docx file.");
        }
    }
    else {
        throw new Error("Unsupported file type for text extraction.")
    }
    return text;
}

router.post('/ai/analyze-document', protect, upload.single('document'), async (req, res) => {
    console.log('Received request to /ai/analyze-document');
    if (!req.file) {
        return res.status(400).json({ message: "No resume document uploaded." });
    }
    if (!req.body.jobRole || req.body.jobRole.trim() === '') {
        return res.status(400).json({ message: 'Job role is required.' });
    }
    const { buffer, mimetype } = req.file;
    const { jobRole } = req.body;
    try {
        const documentText = await extractTextFromFile(buffer, mimetype);
        if (!documentText || documentText.trim().length < 50) {
            return res.status(422).json({ message: "Could not extract sufficient text from the resume file. Please ensure it contains readable content." });
        }

        // Save resume text to user profile for mock interview feature
        await User.findByIdAndUpdate(req.user._id, { resumeText: documentText });

        const prompt = `
    As an expert Applicant Tracking System (ATS) and highly experienced career coach specializing in software development roles, meticulously analyze the provided document against the given job role.

    **Your primary goal is to simulate how a sophisticated ATS would score the document, and how a human recruiter would then review it.**
    Provide a comprehensive analysis including an ATS score, actionable suggestions, keyword analysis, and additional insights like grammar and readability.

    **Job Role for Analysis:** ${jobRole}

    **Document to Analyze:**
    ${documentText}

    **Evaluation Criteria (Prioritized for ATS & Recruiter Perspective):**

    1.  **Keyword Density & Relevance (Weight: High):**
        * Identify direct matches from the "Job Role" description to the "Document."
        * Consider synonyms, related technologies, and common industry terms implied by the "Job Role."
        * Assess the *context* in which keywords appear (e.g., in experience/projects/body vs. just a skills list).

    2.  **Role-Specific Skills & Experience (Weight: High):**
        * **If the Job Role is "Fullstack Developer":** Evaluate the balance of frontend (e.g., React, UI/UX, responsiveness) and backend (e.g., Node.js, Python, API design, database, server-side logic, scalability) experience. Look for projects demonstrating end-to-end development.
        * **If the Job Role is "Frontend Developer":** Prioritize skills like React, JavaScript, HTML, CSS, UI/UX, responsive design, state management, component libraries, and frontend performance.
        * **If the Job Role is "Backend Developer":** Prioritize skills like Node.js, Python, API development (REST/GraphQL), database management (SQL/NoSQL), server-side frameworks (Express, Flask), authentication, and scalability.
        * Look for evidence of problem-solving, collaboration, and quantified impact.

    3.  **Clarity & Readability (Weight: Medium):**
        * Is the document easy to scan? Are sections clearly defined?
        * Is the language concise and professional? Avoid jargon or overly casual language.
        * Assess overall readability (e.g., complex sentences, sentence length variety).

    4.  **Formatting & Structure (Weight: Medium):**
        * Does it follow a standard document format (e.g., resume sections, clear paragraphs for cover letter)?
        * Are bullet points used effectively to describe achievements (for resumes)?
        * Is there consistent formatting (dates, titles, spacing)?

    5.  **Grammar, Spelling & Punctuation (Weight: Medium):**
        * Identify any noticeable errors that would detract from professionalism.

    **Instructions for Output:**

    * **atsScore**: A single integer score out of 100 representing ATS compatibility.
    * **suggestions**: An array of strings with specific, concise, and actionable advice for improving the document for *this specific job role*.
    * **keywords**: An object containing two arrays: missing(key terms from job role not found or under-represented) and found(key terms from job role clearly present).
    * **grammarErrors**: An array of strings describing specific grammar, spelling, or punctuation issues. If none, provide an empty array.
    * **readabilityAssessment**: A string (1-2 sentences) assessing the document's overall readability.

    **Response MUST be ONLY a JSON object and nothing else. Follow this exact structure:**
    \`\`\`json
    {
      "atsScore": integer,
      "suggestions": [string, string, ...],
      "keywords": {
        "missing": [string, string, ...],
        "found": [string, string, ...]
      },
      "grammarErrors": [string, string, ...],
      "readabilityAssessment": string
    }
    \`\`\`
    `;
        const analysisResult = await generateJSONContent(prompt, "You are an expert ATS scanner and career coach.");
        
        if (
            typeof analysisResult.atsScore !== 'number' ||
            !Array.isArray(analysisResult.suggestions) ||
            !analysisResult.keywords ||
            !Array.isArray(analysisResult.grammarErrors) ||
            typeof analysisResult.readabilityAssessment !== 'string'
        ) {
            console.error('AI response missing expected top-level structure:', analysisResult);
            return res.status(500).json({ message: 'AI provided an unexpected analysis format.' });
        }
        analysisResult.atsScore = Math.max(0, Math.min(100, analysisResult.atsScore));
        res.status(200).json(analysisResult);
    } catch (error) {
        console.error("Server error during resume analysis:", error);
        res.status(500).json({ message: error.message || 'Internal server error during resume analysis.' });
    }

});
export default router;