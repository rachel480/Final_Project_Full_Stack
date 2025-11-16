const ContactMessage = require("../models/ContactMessage");
const { sendEmail } = require("../utils/sendEmail");

const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().lean()
    if (!messages)
      return res.status(400).json({ message: "לא נמצאו הודעות" })
    res.status(200).json(messages)
  } catch (err) {
    res.status(500).json({ message: "שגיאה בקבלת ההודעות", error: err.message })
  }
}

const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message)
      return res.status(400).json({ message: "נא למלא את כל השדות" })

    const newMessage = await ContactMessage.create({ name, email, subject, message, user: req.user?._id || null })

    await sendEmail({
      from: `${name}`,
      fromEmail: email,
      to: process.env.EMAIL_USER,
      subject: `הודעה חדשה: ${subject}`,
      html: `
        <h3>התקבלה הודעה חדשה מהאתר</h3>
        <p><strong>שם:</strong> ${name}</p>
        <p><strong>אימייל:</strong> ${email}</p>
        <p><strong>נושא:</strong> ${subject}</p>
        <p><strong>תוכן ההודעה:</strong></p>
        <p>${message}</p>
      `,
    })

    res.status(201).json({ message: "ההודעה נשלחה בהצלחה", newMessage })
  } catch (err) {
    res.status(500).json({ message: "שגיאת שרת", error: err.message })
  }
}

const deleteMessage = async (req, res) => {
  const { id } = req.body
  if (!id)
    return res.status(400).send('id is required')

  const foundMessage = await ContactMessage.findById(id).exec()
  if (!foundMessage)
    return res.status(400).json({ message: "no message found" })

  const deletedMessage = await ContactMessage.deleteOne()
  if (!deletedMessage)
    return res.status(400).json({ message: `error occurred while deleting message` })

  return res.status(201).json({ message: `message was deleted successfully` })
}

module.exports = { getAllMessages, createMessage, deleteMessage }