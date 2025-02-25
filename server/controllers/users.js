
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

        const passwordControlResult=await bcrypt.compare(password,user.password) // parola şifreli olduğundan dolayı burada kontrol ettiriyoruz
        if(!passwordControlResult){
            return(
                res.status(400).json({message:'Parolayı Doğru giriniz'})
            )
        }

        const token = jwt.sign({email:user.email, id:user._id},'emre-secret-key',{expiresIn:'3h'})

        res.status(200).json({result:user,token}) // user ve tokeni döndürüyoruz

    } catch (error) {
        res.status(500).json({message:'Bir Hata oluştu daha sonra tekrar deneyiniz'})
        
    }

}

const signup=async (req,res)=>{
    const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName
    }= req.body;

    try {
        const user =await User.findOne({email})

        if(user) return res.status(400).json({message:'Kullanıcı Zaten Bulunuyor '})
        
        if(password !== confirmPassword) return res.status(400).json({message:'Parolalar uyuşmadı'})

        const hashedPassword=await bcrypt.hash(password,12)   // paroloyı şifreliyoruz
        const result=await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`});
        const token = jwt.sign({email:result.email,id:result._id},'emre-secret-key',{expiresIn:'3h'})
        res.status(200).json({result,token})

    } catch (error) {
        res.status(500).json({message:'Bir Hata oluştu'})
    }


}


export {
    signin,
    signup
}