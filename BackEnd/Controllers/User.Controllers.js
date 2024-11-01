import user from "../Schema/user.Schema.js";
import bcrypt from "bcrypt";
import cloudinary from 'cloudinary'
import fs from 'fs/promises';

const Home = () => {
  console.log("Welcome brother in home page ");
};

const cookieOption = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7dayslogin
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Set to true in production, false in development
};

// Sign Up Function
const SignUp = async (req, res, next) => {
  // console.log("Welcome brother in signup page ");

  const { fullName, email, password } = req.body;
  const EmailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@gmail\.com$/;
  
  

  try {


    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Every Field is Required",
      });
    }

    if(!email.match(EmailValid)){
      return res.status(400).json({
        success: false,
        message: "plz Enter valid emailmclsmcls",
      });
  }
  
    const userExist = await user.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }


    if(password.length < 6){
      return res.status(400).json({
        success:false,
        message:"Password Should having minimum 6 characters"
      })
    }

    
    const userr = await user.create({
      fullName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "https://cdn.pixabay.com/photo/2022/09/27/19/46/ai-generated-7483596_960_720.jpg",
      },
    });

    if (!userr) {
      return res.status(400).json({
        success: false,
        message: "User Registration Fail, please try again",
      });
    }

    //TODO: File Upload

    if(req.file){


      try{ 
          // yaha pe hum file ko cloudinary pe store kar rhe hai. upload karne ka syntax hai:-
          const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'lms',
            transformation: {
              crop: 'auto',
              width: 250,
              height: 250,
              gravity: 'auto',
            },
          }); 

          

          if(result){
              userr.avatar.public_id = result.public_id;

              userr.avatar.secure_url = result.secure_url;

              //Remove file(of the jpg or image) from the server. .... cloudinary pe file rakhni  hai but local me nahi rakhni hai so we have to delete that binary image file.

              fs.rm(`uploads/${req.file.filename}`)
          }
          
      }catch(e){

          // return next (new AppError('File is not uploaded, please try again',500));
          console.log("file upload fails on cloudinary",e.message)


      }
  }

    await userr.save();

    const token = await userr.generatejwtToken();

    res.cookie("token", token, cookieOption);

    userr.password = undefined;
    return res.status(200).json({
      success: true,
      message: "User Registration SuccessFully",
      userr,
      token,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "User Registration fails ",
    });
  }
};

// LOGIN Function
const Login = async (req, res, next) => {
  console.log("Welcome brother in Login page ");

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Both Email and password require for login",
      });
    }

    const userr = await user.findOne({ email }).select("+password");

    if (!email || !(await bcrypt.compare(password, userr.password))) {
      return res.status(400).json({
        success: false,
        message: "Both Email and password Incorrect",
      });
    }

    const token = await userr.generatejwtToken();

    res.cookie("token", token, cookieOption);

    return res.status(200).json({
      success: true,
      message: "Successfully Login",
      userr,
      token,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Fail TO Login",
    });
  }
};

// logout function
const LogOut = async (req, res, next) => {
  console.log("Welcome brother in Logout page ");

  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged Out successfully",
  });
};

// Get user Profile data
const GetUser = async (req, res, next) => {
    console.log("Welcome brother in user Profile page");
  
    // Accessing the user ID from the request object
    const userId = req.user.id;
  
    try {
      // Find user by ID
      const userr = await user.findById(userId);
  
      // If user not found, return 404
      if (!userr) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
  
      // If user found, return success response
      return res.status(200).json({
        success: true,
        message: "Here is the user data:",
        user: userr
      });
    } catch (e) {
      // Handle any error
      return res.status(400).json({
        success: false,
        message: e.message
      });
    }
  };
  
  

export { 
    Home, 
    SignUp, 
    Login, 
    LogOut,
    GetUser 
  };
