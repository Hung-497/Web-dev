const express = require("express");
const app = express();
const {
    getAllFeedbacks,
    createFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
} = require("./feedbackHandlers")

// Middleware to parse JSON
app.use(express.json());

// ROUTES

app.get("/feedback", getAllFeedbacks);
app.post("/feedback", createFeedback);
app.get("/feedback/:feedbackId", getFeedbackById);
app.patch("/feedback/:feedbackId", updateFeedback);
app.delete("/feedback/:feedbackId", deleteFeedback);

const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});