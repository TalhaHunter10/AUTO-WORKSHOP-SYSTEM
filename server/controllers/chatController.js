const asyncHandler = require("express-async-handler");
const path = require("path");
const Message = require("../models/messageModel");
const pythonScriptPath = path.join(__dirname, "..", "chat", "chatbot.py");
const exec = require("child_process").exec;

const handleQuery = asyncHandler(async (req, res) => {
  const { userMessage } = req.body;
  const user = req.user._id;

  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }

  Message.create({ userId: user, message: userMessage, sender: "user" });

  exec(
    `python "${pythonScriptPath}" "${userMessage}"`,
    async (error, stdout, stderr) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Failed to execute Python script", error, stderr });
      }

      const response = stdout.trim();
      try {
        const message = await Message.create({
          userId: user,
          message: response,
          sender: "bot",
        });
        res.status(200).json({ message });
      } catch (err) {
        res.status(500).json({ error: "Failed to save message", err });
      }
    }
  );
});

const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ userId: req.user._id });
  res.json(messages);
});

module.exports = { handleQuery, getMessages };
