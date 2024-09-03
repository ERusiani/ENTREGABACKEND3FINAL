import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy} from "passport-jwt";
import { UsersService } from "../Services/Repositories.js";
import AuthService from "../Services/AuthService.js";
import  config  from "../Config/dotenv.config.js";

const authService = new AuthService();

const initializePassportConfig = () =>{
    passport.use('register', new LocalStrategy({usernameField:'email',passReqToCallback:true},async (req,email,password,done)=>{
        const {first_name,last_name,age,cart,role} = req.body;
        if(!first_name||!last_name||!age||!cart){
            return done(null,false,{message:'Values are missing'});
        }
        if((role!="user")&&(role!="admin")&&(role!=null)){
            return done(null,false,{message:'Invalid values'});
        }
        const user = await usersService.getUserByEmail(email);
        if(user){
            return done(null,false,{message:"The user already exists"});
        };        

        const hashedPassword = await authService.hashPassword(password);
        const User = {
            first_name,
            last_name,
            email,
            age,
            password:hashedPassword,
            cart,
            role:role||"user"
        }
        const result = await usersService.createUser(User);
        return done(null,result);
    }));

    passport.use('login', new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        const user = await usersService.getUserByEmail(email);
        if(!user){
            return done(null,false,{message:"Values are incorrect"});
        };
       
        const validation = await authService.validatePassword(password,user.password);
        if(!validation){
            return done(null,false,{message:"Values are incorrect"});
        }
        return done(null,user);
    }));

    passport.use('current',new JWTStrategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor])
    },async(payload,done)=>{
        if(payload) return done(null, payload);
        else return done(null, false);
    }));
}


function cookieExtractor(req){
    return req?.cookies?.[process.env.JWT_COOKIE]||null;
}

export default initializePassportConfig;