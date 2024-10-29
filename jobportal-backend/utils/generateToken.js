import jwt from 'jsonwebtoken'

export const generateToken=(id,res)=>{
       try{
              const token=jwt.sign({userId:id},process.env.JWT_SECRET,{expiresIn:'10d'})

             
              res.cookie("job-token",token,{
                    httpOnly:true,
                    secure:process.env.NODE_ENV === 'Production',
                    sameSite: "none",
		     maxAge: 7 * 24 * 60 * 60 * 1000,
                    path: '/'
              })

              

               return token;
       }catch(err){

           console.error(err.message);
           
       }
}