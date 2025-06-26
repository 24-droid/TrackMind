import express from "express"
import pdf from "pdf-parse"
import mammoth,{extractRawText} from "mammoth"
import {GoogleGenerativeAI} from "@google/generative-ai"
import upload from "../utils/multerConfig.js"
const router=express.Router();
const genAI=new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model=genAI.getGenerativeModel({model:"gemini-1.5-flash-latest"});
async function extractTextFromFile(fileBuffer,mimetype){
    let text="";
    if(mimetype=='application/pdf'){
        try {
            const data=await pdf(fileBuffer);
            text=data.text;
        } catch (error) {
            console.error("Error extracting text from pdf:",error);
            res.status(500).json({message:"Failed to extract text from the PDF."});
        }
    }
    else if(mimetype=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        try {
            const result = await mammoth.extractRawText({ arrayBuffer: fileBuffer.buffer });
            text = result.value;
        } catch (error) {
            console.error("Error extracting text from DOCX:",error);
            res.status(500).json({message:"Failed to extract text from DOCX."});
        }
    }
    return text;
}
router.post('/analyze',upload.single('resume'),async(req,res)=>{
    console.log('Received request to /analyze');
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    if(!req.file)
        {
            return res.status(400).json({message:"No resume file uploaded."});
        }
    if (!req.body.jobRole || req.body.jobRole.trim() === '') {
    return res.status(400).json({ message: 'Job role is required.' });
        }
    const {buffer,mimetype}=req.file;
    const {jobRole}=req.body;
    try {
         const resumeText = await extractTextFromFile(buffer, mimetype);
         if (!resumeText || resumeText.trim().length < 50) {
      return res.status(422).json({ message: "Could not extract sufficient text from the resume file. Please ensure it contains readable content." });
    }
    
    const prompt = `
      As an expert Applicant Tracking System (ATS) and career coach, analyze the following resume against the specified job description.
      Provide an ATS compatibility score out of 100, focusing on keyword relevance, formatting, clarity, and overall suitability.
      Then, offer actionable suggestions for improvement.
      Finally, identify key terms from the job description that are missing from the resume,
      and key terms from the job description that are present in the resume.
      Your response MUST be in JSON format. Do not include any conversational text before or after the JSON.

      Job Role:
      ${jobRole}

      Resume:
      ${resumeText}

      Respond ONLY with a JSON object like this example:
      \`\`\`json
      {
        "atsScore": 75,
        "suggestions": ["Elaborate on project outcomes with metrics.", "Ensure consistent date formats.", "Add a professional summary."],
        "keywords": {
          "missing": ["Cloud Security", "DevOps"],
          "found": ["JavaScript", "React", "Node.js"]
        }
      }
      \`\`\`
    `;
    const result=await model.generateContent(prompt);
    const response=result.response;
    let textContent=response.text();
    const jsonMatch = textContent.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
        textContent = jsonMatch[1].trim(); 
    } else {
        console.warn('Gemini response did not contain a ```json code block. Attempting direct parse.');
    }
    let analysisResult;
    try {
        analysisResult = JSON.parse(textContent);
    } catch (parseError) {
        console.error('Failed to parse Gemini JSON response:', parseError);
        console.error('Raw Gemini output:', textContent);
        return res.status(500).json({ message: 'AI response was malformed or not valid JSON. Please try again.' });
    }
    if (
      typeof analysisResult.atsScore !== 'number' ||
      !Array.isArray(analysisResult.suggestions) ||
      !analysisResult.keywords ||
      !Array.isArray(analysisResult.keywords.missing) ||
      !Array.isArray(analysisResult.keywords.found)
    ) {
      console.error('Gemini response missing expected structure:', analysisResult);
      return res.status(500).json({ message: 'AI provided an unexpected analysis format. Please try again.' });
    }
    analysisResult.atsScore = Math.max(0, Math.min(100, analysisResult.atsScore));
    res.status(200).json(analysisResult);
    } catch (error) {
        console.error("Server error during resume analysis:",error);
        res.status(500).json({ message: error.message || 'Internal server error during resume analysis.' });
    }

});
export default router;