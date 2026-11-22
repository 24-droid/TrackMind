import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const testSarvam = async () => {
    try {
        console.log("Testing Sarvam TTS with key:", process.env.SARVAM_API_KEY ? "Key exists" : "No key");
        const response = await axios.post('https://api.sarvam.ai/text-to-speech', {
            inputs: ["Hello, this is a test."],
            target_language_code: "en-IN",
            speaker: "priya",
            speech_sample_rate: 22050,
            enable_preprocessing: true,
            model: "bulbul:v3"
        }, {
            headers: {
                'api-subscription-key': process.env.SARVAM_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        console.log("SUCCESS! Audio length:", response.data.audios[0].length);
    } catch (error) {
        console.error("FAILED!");
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
        console.error("Message:", error.message);
    }
};

testSarvam();
