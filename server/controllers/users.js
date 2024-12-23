
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User  from '../models/user.js'


const signin=async (req,res)=>{
    const {email,password}=req.body;
     
    try {
        const user=await User.findOne({email})

        if(!user) {
            return(
                res.status(404).json({message:'Kullanıcı Bulunamadı'})
            ) 
        }

        const passwordControlResult=await bcrypt.compare(password,user.password)
        if(!passwordControlResult){
            return(
                res.status(400).json({message:'Parolayı Doğru giriniz'})
            )
        }

        const token = jwt.sign({email:'user.email',id:'user._id'},'emre-secret-key',{expiresIn:'3h'})

        res.status(200).json({result:user,token})

    } catch (error) {
        res.status(500).json({message:'Bir Hata oluştu daha sonra tekrar deneyiniz'})
        
    }

}

const signup=async (req,res)=>{
    res.send('signup')

}


export {
    signin,
    signup
}