import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// const SECRET = "SECRET"

const userSchema = new Schema({


    fullName:{
        type:'String',
        required:[true,"Fullname is required"],
        minLength:[5,"Name Must be atleast 5 Character"],
        maxLength:[20,"Name should not be greater then 20 character"],
        lowercase:true,
        trim:true
    },

    email:{
        type:'String',
        lowercase:true,
        trim:true,
        unique:true,
        // match:[ 

        //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        //     ,"please fill the valid email Address "]

    },

    password:{
        type:'String',
        required:true,
        minLength:[6,"Password minimum length is 6 characters "],
        select:false,
    },

    avatar:{
        public_id:{
            type:'String',

        },
        secure_url:{
            type:'String',
        }
    },
    role:{
        type:'String',
        enum:['USER','ADMIN'],
        default:'USER'
    },

    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
},{
    timestamps:true
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    return next();

    this.password = await bcrypt.hash(this.password,10)
    return next()
})

userSchema.methods = {
    
    generatejwtToken: async function(){
        return jwt.sign({
            id:this._id,
            role:this.role,
            Subscription:this.Subscription
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'1000s'
        }
        )
    }
}

export default mongoose.model("user",userSchema)

