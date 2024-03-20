import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

const registerController = async (req, res) => {
  try {
    // check if all data is coming from the client
    // const { name, email, password, passwordConfirm, profileImage } = req.body;
    // if (!name || !email || !password || !passwordConfirm || !profileImage) {
    //     return res.status(400).send({ message: "All fields are required", success: false });
    //   }
    const existingUser = await User.findOne({ email: req.body.email });
    console.log(req.body.email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const confirmPassword = await bcrypt.hash(req.body.passwordConfirm, salt);
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCase: false,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    req.body.confirmPassword = confirmPassword;
    

   
    // if (req.body.password !== req.body.confirmPassword) {
    //     console.log(req.body.password);
    // console.log(req.body.confirmPassword);
    //     return res.status(400).json({ message: "Passwords do not match ...........", success: false });
    //   }
      
      
    if (req.body.password === req.body.confirmPassword) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        otp: otp,
        profileImage: req.body.profileImage,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "Rameshgudpawar@gmail.com",
          pass: "Rames@123",
        },
      });

      const mailOptions = {
        from: "Rameshgudpawar@gmail.com",
        to: req.body.email,
        subject: "Account Verification",
        text: `Your OTP is ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error in sending email...");
        }
        res.send({
          message: "Otp sent successfully",
        });
      });

      return res.status(201).send({
        message: "User registered successfully",
        data: {
          user: newUser,
          token: token,
        },
        success: true,
      });
    }
    else{
        return res.status(201).send({message: "Password and Confirm Password do not match", success: false});
    }
  } catch (error) {
    console.error(error);
    // console.log(req.body.password);
    // console.log(req.body.confirmPassword);
    return res.status(500).send({ message: "Register error" , success: false});
    
  }
};

export default registerController;