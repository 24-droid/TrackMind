import dotenv from 'dotenv';
import sendReminderEmail from './utils/emailService.js';
dotenv.config();

console.log('Testing email configuration...');
console.log('User:', process.env.EMAIL_USER);
console.log('Host:', process.env.EMAIL_HOST);

const testEmail = async () => {
    try {
        await sendReminderEmail(
            process.env.EMAIL_USER, 
            'TrackMind Email Test 🚀', 
            '<h2>Success!</h2><p>If you are reading this, your email configuration is working perfectly.</p>'
        );
        console.log('✅ Test email sent successfully! Check your inbox.');
    } catch (error) {
        console.error('❌ Failed to send test email:');
        console.error(error.message);
    }
};

testEmail();
