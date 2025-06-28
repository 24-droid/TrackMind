import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();
const transporter=nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:parseInt(process.env.EMAIL_PORT,10),
    secure:process.env.EMAIL_SECURE==='true',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    }

})
const sendReminderEmail=async(toEmail,subject,htmlContent)=>{
    const mailOptions={
        from:process.env.EMAIL_USER,
        to:toEmail,
        subject:subject,
        html:htmlContent,
    }
    try {
        const info=await transporter.sendMail(mailOptions);
        console.log(`Reminder email sent to ${toEmail}: ${info.messageId}`);
    } catch (error) {
        console.error(`Error sending email to ${toEmail} for subject "${subject}":`,error);
        if(error.response)
            {
                console.error("Nodemailer SMTP response:",error.response);
            }
        throw new Error(`Failed to send email via Nodemailer: ${error.message}`);
    }
}
export default sendReminderEmail;