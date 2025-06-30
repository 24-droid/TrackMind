import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import User from "../models/User.model.js"
import dotenv from "dotenv"
dotenv.config();
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser(async(id,done)=>{
    try {
        const user=await User.findById(id);
        done(null,user);
    } catch (error) {
        done(err,null);
    }
})
passport.use(
    new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:process.env.GOOGLE_CALLBACK_URL,
        scope:['profile','email'],
    },async(accessToken,refreshToken,profile,done)=>{
        console.log("Passport callback function fired!");
        try{
            let currentUser = await User.findOne({ googleId: profile.id });
            if(currentUser){
                console.log("Existing user found:",currentUser.fullName);
                if (!currentUser.avatar && profile.photos && profile.photos.length > 0) {
                    currentUser.avatar = profile.photos[0].value;
                    await currentUser.save();
                }
                done(null, currentUser);
            }
            else{
                const newUser=new User({
                    googleId:profile.id,
                    fullName:profile.displayName[0],
                    email:profile.emails && profile.emails.length>0?profile.emails[0].value:null,
                    avatar:profile.photos && profile.photos.length>0?profile.photos[0].value:null,
                    userType: 'student',
                });
                if(newUser.email){
                    const existingLocalUser=await User.findOne({email:newUser.email});
                    if(existingLocalUser && !existingLocalUser.googleId)
                        {
                            console.error("Email already registered with a local account:",newUser.email);
                            return done(new Error("This email is already registered with a local account. Please log in using your password or contact support to link accounts."),null);                            
                        }
                    else if(existingLocalUser && existingLocalUser.googleId && existingLocalUser.googleId!==profile.id){
                        console.error('Another Google account already registered with this email:',newUser.email);
                        return done(new Error("This email is already associated with a different Google account."),null);
                    }
                }
                await newUser.save();
                console.log('New user created:', newUser.fullName);
                done(null, newUser); 
            }
        } catch (err) {
            console.error('Error during Google authentication:', err);
            done(err, null);
        }
    })
)