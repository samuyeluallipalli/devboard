const cron = require("node-cron");
const Task = require("../models/Task");
const transporter = require("../config/mailer");

cron.schedule("0 8 * * *", async () => {
  try {
    const tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    const tasks = await Task.find({
      dueDate: {
        $lte: tomorrow,
      },
      status: {
        $ne: "Done",
      },
    }).populate("assignedTo");

    for (const task of tasks) {
      if (task.assignedTo?.email) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: task.assignedTo.email,
          subject: "Task Reminder",
          text: `Reminder: "${task.title}" is due soon.`,
        });
      }
    }

    console.log("Reminder job executed");
  } catch (error) {
    console.log(error);
  }
});