const jwt=require('jsonwebtoken')

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization || req.headers.Authorization
    //validation:
    //chek if there is a token
    if(!authHeader?.startsWith('Bearer '))
        return res.status(401).json({message:"Unauthorized"})
    const token=authHeader.split(' ')[1]
    //chek if the token is valid
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err)
        {
            console.log(`error: ${err}`)
            return res.status(403).json({message:'forbidden'})
        }
            
        req.user=decoded
        
        next()
    })
}

module.exports=verifyJWT