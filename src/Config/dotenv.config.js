import {config} from "dotenv";
config();
export default{
    MONGO:{
        URL:process.env.MONGO_URL
    },
    JWT:{
        SECRET:process.env.JWT_SECRET,
        COOKIE:process.env.JWT_COOKIE
    }
}