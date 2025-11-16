const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendEmail } = require("../utils/sendEmail.js");

// a service that checks if userName or email is available
const { checkUsernameUniqueness, checkEmailUniqueness } = require('../services/userService.js')

const register = async (req, res) => {
    try {
        const { userName, password, fullName, email, phone } = req.body

        // validation:
        if (!userName || !password || !fullName || !email) {
            return res.status(400).json({ message: 'userName fullName password and email are required' })
        }

        // unique userName
        const existUser = await checkUsernameUniqueness(userName)
        if (existUser)
            return res.status(409).json({ message: 'userName must be unique' })

        //unique email
        const existEmail = await checkEmailUniqueness(email)
        if (existEmail)
            return res.status(409).json({ message: 'email adress must be unique' })

        // encrypt password:
        const hashPwd = await bcrypt.hash(password, 10)

        // create user:
        const user = await User.create({ userName, password: hashPwd, fullName, email, phone })

        if (!user)
            return res.status(400).json({ message: `error occurred while creating user ${userName}` })

        return res.status(201).json({ message: `user ${userName} was created successfully` })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

const login = async (req, res) => {
    try {
        const { userName, password } = req.body

        // validation:
        if (!userName || !password)
            return res.status(400).json({ message: 'userName and password are required' })

        // exist user or active
        const existUser = await User.findOne({ userName }).lean()
        if (!existUser)
            return res.status(401).json({ message: "Unauthorized" })

        // correct password
        const match = await bcrypt.compare(password, existUser.password)
        if (!match)
            return res.status(401).json({ message: "Unauthorized" })

        // create token
        const userInfo = {
            _id: existUser._id,
            fullName: existUser.fullName,
            roles: existUser.roles,
            userName: existUser.userName,
            email: existUser.email
        }
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)

        return res.status(201).json({
            message: "logged in successfully",
            accessToken: accessToken,
            user: {
                id: existUser._id,
                fullName: existUser.fullName,
                userName: existUser.userName,
                roles: existUser.roles
            }
        })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    if (!email)
        return res.status(400).json({ message: 'נדרש כתובת מייל' })

    const user = await User.findOne({ email: email }).exec()

    if (!user)
        return res.json({ message: "אם כתובת האימייל שהזנת קיימת במערכת, נשלח אליך מייל עם קישור לאיפוס הסיסמה. הקישור תקף למשך שעה אחת מרגע שליחתו." })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`

    const html = `
      <div dir="rtl" style="font-family: Arial, sans-serif; color: #333;">
        <h2>שחזור סיסמה</h2>
        <p>שלום,</p>
        <p>כדי לאפס את הסיסמה שלך, לחצ/י על הקישור הבא:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>אם לא ביקשת איפוס סיסמה, פשוט התעלם/י מהמייל הזה.</p>
        <p>בברכה,<br/>english city</p>
      </div>
    `

    await sendEmail({
        to: user.email,
        subject: "איפוס סיסמה",
        html,
    })

    return res.json({ message: "אם כתובת האימייל שהזנת קיימת במערכת, נשלח אליך מייל עם קישור לאיפוס הסיסמה. הקישור תקף למשך שעה אחת מרגע שליחתו." })
}

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if(!token || !password)
         return res.status(400).json({ message: 'סיסמא וטוקן נדרשים' })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ message: "משתמש לא נמצא" });

        const hashed = await bcrypt.hash(password, 10);
        user.password = hashed;
        const updatedUser = await user.save();
        if (!updatedUser)
            return res.status(400).json({ message: "עדכון נכשל" })

        return res.json({ message: "הסיסמה אופסה בהצלחה" });
    } catch (err) {
        return res.status(400).json({ message: "טוקן לא תקין או פג תוקף" });
    }
}

module.exports = { login, register, forgotPassword, resetPassword }