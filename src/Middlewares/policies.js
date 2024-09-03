export const executePolicies = (policies) =>{
    return (req,res,next)=>{
        if(policies.includes("PUBLIC")) return next();
        if(policies.includes("AUTHORIZED")&& !req.user) return res.sendUnauthorized();
        if(policies.includes(req?.user?.role?.toUpperCase())) return next();
        return res.sendUnauthorized();
    }
};