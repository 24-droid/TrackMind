import cron from "node-cron"
import User from "../models/User.model.js";
import Application from "../models/Application.model.js";
import sendReminderEmail from "../utils/emailService.js";
const startReminderJob=()=>{
    cron.schedule('0 8 * * *',async()=>{
        console.log("Running daily deadline reminder job...");
        try {
            const users=await User.find({emailNotificationsEnabled:true});
            for(const user of users)
                {   
                    const today = new Date();
                    today.setHours(0,0,0,0);
                    const reminderCutoffDate=new Date(today);
                    reminderCutoffDate.setDate(today.getDate() + user.reminderDaysBefore);
                    reminderCutoffDate.setHours(23, 59, 59, 999);
                    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
                if (user.lastReminderSentAt && user.lastReminderSentAt > twelveHoursAgo) {
                    console.log(`Skipping reminder for user ${user.email} (already sent recently).`);
                    continue; 
                }
                const upcomingApplications = await Application.find({
                    userId: user._id,
                    deadline: { $gte: today, $lte: reminderCutoffDate }, 
                    status: { $nin: ['Offer', 'Rejected'] } 
                });
                if (upcomingApplications.length > 0) {
                    
                    let emailSubject = '🔔Upcoming Job Application Deadlines!';
                    let emailHtml = `
                        <h2>Hello ${user.fullName || user.email},</h2>
                        <p>You have upcoming job application deadlines:</p>
                        <ul>
                    `;

                    upcomingApplications.forEach(app => {
                        const deadlineDate = app.deadline.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        emailHtml += `
                            <li>
                                <strong>${app.jobTitle}</strong> at ${app.company} - Deadline: ${deadlineDate}
                            </li>
                        `;
                    });

                    emailHtml += `
                        </ul>
                        <p>Don't miss out! Log in to your account to review and manage your applications.</p>
                        <p>Best regards,<br>TrackMind Team</p>
                    `;

                    
                    await sendReminderEmail(user.email, emailSubject, emailHtml);

                    
                    user.lastReminderSentAt = new Date();
                    await user.save();

                }
                else{
                    console.log(`No applications found for ${user.email} within the reminder window`);
                }
                }
                console.log('Daily deadline reminder job completed successfully.');
        } catch (error) {
            console.error("Error in deadline reminder job",error);
        }
    })
}
export default startReminderJob;