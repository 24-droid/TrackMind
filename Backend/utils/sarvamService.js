import axios from 'axios';

/**
 * Converts text to speech using Sarvam AI's Bulbul model.
 * Returns a base64 encoded wav audio string.
 */
export const textToSpeech = async (text) => {
    try {
        if (!process.env.SARVAM_API_KEY || process.env.SARVAM_API_KEY === 'your_sarvam_api_key' || !process.env.SARVAM_API_KEY.trim()) {
            console.error("❌ Sarvam AI Error: API Key is missing or not configured in .env");
            throw new Error("Sarvam API key not configured.");
        }

        console.log("🔊 Attempting Sarvam TTS generation...");
        
        const response = await axios.post('https://api.sarvam.ai/text-to-speech', {
            inputs: [text],
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

        console.log("✅ Sarvam TTS success: Audio generated.");
        return response.data.audios[0];
    } catch (error) {
        let errorMsg = error.message;
        if (error.response?.data?.error?.message) {
            errorMsg = error.response.data.error.message;
        } else if (error.response?.data?.message) {
            errorMsg = error.response.data.message;
        }
        console.error("❌ Sarvam TTS System Error:", errorMsg);
        throw new Error(errorMsg);
    }
};

/**
 * Converts speech to text using Sarvam AI's STT model.
 * Expects a FormData containing the audio file.
 */
export const speechToText = async (formData) => {
    try {
        if (!process.env.SARVAM_API_KEY || process.env.SARVAM_API_KEY === 'your_sarvam_api_key') {
            throw new Error("Sarvam API key not configured.");
        }

        const response = await axios.post('https://api.sarvam.ai/speech-to-text', formData, {
            headers: {
                'api-subscription-key': process.env.SARVAM_API_KEY,
                ...formData.getHeaders()
            }
        });

        return response.data.transcript;
    } catch (error) {
        console.error("Sarvam STT Error:", error.response?.data || error.message);
        throw error;
    }
};
