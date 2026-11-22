import express from "express";
import { startInterview, getInterviewFeedback } from "../controllers/interviewController.js";
import { protect } from "../middleware/authMiddleware.js";

import { textToSpeech, speechToText } from "../utils/sarvamService.js";

import upload from "../utils/multerConfig.js";

const router = express.Router();

router.post("/start", protect, startInterview);
router.post("/feedback", protect, getInterviewFeedback);

router.post("/tts", protect, async (req, res) => {
    try {
        const { text } = req.body;
        const audioBase64 = await textToSpeech(text);
        res.json({ audio: audioBase64 });
    } catch (error) {
        console.error("Route TTS Error:", error.message);
        res.status(500).json({ message: error.message || "TTS Generation failed" });
    }
});

router.post("/stt", protect, upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No audio file provided" });
        }

        // For Sarvam, we need to send the file as a FormData
        const FormData = (await import('form-data')).default;
        const form = new FormData();
        form.append('file', req.file.buffer, {
            filename: 'audio.wav',
            contentType: 'audio/wav',
        });
        form.append('model', 'saaras:v1');

        const transcript = await speechToText(form);
        res.json({ transcript });
    } catch (error) {
        console.error("Route STT Error:", error.message);
        res.status(500).json({ message: error.message || "STT Transcription failed" });
    }
});

export default router;
