import User from "../models/User.model.js";
import { generateJSONContent } from "../utils/aiService.js";

export const startInterview = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if (!user.resumeText) {
            return res.status(400).json({ message: "Please upload and analyze your resume first to start a mock interview." });
        }

        // Check for 1-week limit
        if (user.lastMockInterviewAt) {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            if (user.lastMockInterviewAt > oneWeekAgo) {
                const nextAvailableDate = new Date(user.lastMockInterviewAt);
                nextAvailableDate.setDate(nextAvailableDate.getDate() + 7);
                return res.status(403).json({ 
                    message: `You can only take one mock interview per week. Your next session will be available after ${nextAvailableDate.toLocaleDateString()}.` 
                });
            }
        }

        // Generate questions
        const prompt = `
        You are an elite technical interviewer. Based on the following resume text, generate 5 challenging and realistic interview questions.
        The questions should cover technical skills, projects, and experience mentioned in the resume.
        
        Resume Content:
        ${user.resumeText}
        
        Response MUST be a JSON array of strings, like this:
        ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]
        Return ONLY the JSON array.
        `;

        const questions = await generateJSONContent(prompt, "You are an elite technical interviewer.");

        // Update last interview date
        user.lastMockInterviewAt = new Date();
        await user.save();

        res.status(200).json({ questions });
    } catch (error) {
        console.error("Error starting mock interview:", error);
        res.status(500).json({ message: "Failed to initialize mock interview session." });
    }
};

export const getInterviewFeedback = async (req, res) => {
    try {
        const { questions, answers } = req.body;
        
        if (!questions || !answers || questions.length !== answers.length) {
            return res.status(400).json({ message: "Invalid interview data provided." });
        }

        const prompt = `
        You are an expert technical interviewer. Evaluate the following mock interview responses.
        For each question and answer pair, provide brief feedback and a score (1-10).
        Finally, provide an overall summary and areas for improvement.

        Interview Data:
        ${questions.map((q, i) => `Q: ${q}\nA: ${answers[i]}`).join('\n\n')}

        Response MUST be a JSON object with this structure:
        {
            "feedbacks": [
                { "question": "...", "feedback": "...", "score": 8 },
                ...
            ],
            "overallScore": 8.5,
            "summary": "...",
            "improvements": ["...", "..."]
        }
        Return ONLY the JSON object.
        `;

        const feedback = await generateJSONContent(prompt, "You are an expert technical interviewer evaluating a mock session.");
        res.status(200).json(feedback);
    } catch (error) {
        console.error("Error generating interview feedback:", error);
        res.status(500).json({ message: "Failed to generate interview feedback." });
    }
};
