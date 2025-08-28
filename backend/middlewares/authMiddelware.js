// const JWT=require('jsonwebtoken');

// module.exports=async(req,res,next)=>{
//     try{
//         const token=req.headers["authorization"].split(" ")[1];
//         JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
//             if(err){
//                 return res.status(404).send({
//                     success:false,
//                     message:"Auth Failed"
//                 });
//             }else{
//                 req.body.userId=decode.userId;
//                 next();
//             }
//         });
//     }catch(error){
//         console.log(error);
//         return res.status(401).send({
//             success:false,
//             error,
//             message:"Auth Failed"
//         });
//     };
// };



const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({
                success: false,
                message: "Auth Failed: No or Invalid Authorization header"
            });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // ✅ Attach userId to req
        next();
    } catch (error) {
        console.error("JWT Auth Error:", error.message);
        return res.status(401).send({
            success: false,
            message: "Auth Failed",
            error: error.message
        });
    }
};

module.exports = authMiddleware;
