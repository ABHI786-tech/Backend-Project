const mongoose = require("mongoose");
const userSchema = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const jwtSecrectKey = process.env.JWT_SECRECTKEY;
const nodemailer = require("nodemailer");
const saltRounds = 10;


function convertjwtToken(email, id) {
    console.log(email)
    console.log(id)

    return jwt.sign({
        email, id
    }, jwtSecrectKey, { expiresIn: '1h' });

}

const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // your Gmail
                pass: process.env.EMAIL_PASS, // App password (not your main password)
            },
        });

        const mailOptions = {
            from: `"My App" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Email sent to:", to);
    } catch (err) {
        console.error("❌ Email send failed:", err);
    }
};



/////  user  register
async function userRegister(req, res) {
    try {
        const { firstname, email, password } = req.body;
        if (!firstname || !email || !password) {
            res.status(404).send("Please fill all required fields (firstname, email, password)")
        }
        const existingUser = await userSchema.findOne({ email })

        // 2️⃣ Hash password
        let hashPassword = await bcrypt.hash(password, saltRounds)
        console.log(hashPassword, "existingUser")

        // 3️⃣ Check if user already exists
        if (existingUser) {
            res.status(404).send("User already exists with this email")
        }

        else {
            const createUser = await userSchema.create({ firstname, email, password: hashPassword });
            res.status(200).send({ createUser, message: "User registered successfully" })
        }
    }
    catch (err) {
        res.status(400).send({ error: err, message: "Failed to register user" })

    }
}


//// user data get 
async function getUserREgister(req, res) {
    try {
        const user = await userSchema.find().lean()
        return res.send({ user, message: "get employee data sucessfuly" })
    }
    catch (err) {
        console.log({ err, message: "Failed to fetch employee data" })
    }
}


//// login section

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send("please filled the required field")
        }

        const FindEmail = await userSchema.findOne({ email })
        if (!FindEmail) {
            return res.status(400).send("user doesnot found please firstly register now")
        }

        const matchPassword = await bcrypt.compare(password, FindEmail?.password)
        if (matchPassword) {
            // console.log(convertjwtToken(email))
            const data = { id: FindEmail?._id, email, accessToken: convertjwtToken(email, FindEmail?._id) }
            return res.status(200).send({ data, message: "succesfully login" })

        }
        else {
            res.status(404).send("invalid credential")
        }
    }
    catch (err) {
        res.status(404).send({ err, message: "authcontroller login error" })
    }
}


//// forget password 
async function Forgetpassword(req, res) {
    try {
        const { email } = req?.body || {};

        if (!email) {
            return res.status(404).send("please enter your valid e-mail address")
        }
        const FindEmail = await userSchema.findOne({ email })
        if (!FindEmail) {
            return res.status(404).send("No account found with this email address")
        }
        if (FindEmail) {
            res.status(200).send("Password reset link has been sent to your email address")

            const resetToken = crypto.randomBytes(32).toString("hex")
            const hash = crypto.createHash('sha256').update(resetToken).digest("hex")

            FindEmail.resettoken = hash;

            await FindEmail.save();
            // const {firstname } = req?.body;
            const html = `
            <h1>RESET PASSWORD</h1>
            <h2>${FindEmail?.firstname}</h2>
            <p>for password reset successfuly click on the below link to reset the password </p>
            <a href ="http://localhost:8000/forgetpassword/${resetToken}">reset password</a>
            <p> password reset link has been expired in 15 min</p>
            `
            sendEmail(email, "reset password", html)
        }
    }
    catch (err) {
        res.status(404).send({ error: err, message: "Failed to process forgot password request" })
    }
}


//// reset password
async function resetpassword(req, res) {
    try {
        const { token } = req?.query;
        const { newpassword } = req?.body || {};
        if (!token) {
            return res.status(400).send("Reset token is required")
        }

        const hash = crypto.createHash('sha256').update(token).digest("hex")
        const resetpass = await userSchema.findOne({ resettoken: hash })

        if (!resetpass || !resetpass?.password) {
            return res.status(404).send("Invalid or expired reset token")
        }
        const encryptpass = await bcrypt.hash(newpassword, saltRounds);
        // console.log(encryptpass, resetpass)

        resetpass.password = encryptpass;
        resetpass.resettoken = "";

        await resetpass.save();
        res.status(200).send({ message: "Password has been reset successfully" })

    }
    catch (error) {
        res.status(400).send({ error, message: "Failed to reset password" })

    }
}

module.exports = {
    userRegister, getUserREgister, userLogin, Forgetpassword, resetpassword
}


