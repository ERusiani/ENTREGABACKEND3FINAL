import jwt from "jsonwebtoken";

const registerUser = async(req, res) => {
    return res.sendSuccess("You've been registered");
}

const loginUser = async(req, res) => {
    if(req.user){
        const sessionUser = {
            name:`${req.user.first_name} ${req.user.last_name}`,
            cart:req.user.cart,
            role:req.user.role,
            id:req.user._id
        }
        try{
            const token = jwt.sign(sessionUser,process.env.JWT_SECRET,{expiresIn:"10d"});
            res.cookie(process.env.JWT_COOKIE,token);
        }catch(error){
            return res.sendBadRequest("Server error");
        }
        return res.sendSuccess("You have successfully logged-in")
    }
}
const current = async(req,res) => {
    if(req.user){
        res.sendSuccess(req.user);
    }else{
        res.sendUnauthorized("You need to log in first");
    }
}
export default {
    current,
    loginUser,
    registerUser
}