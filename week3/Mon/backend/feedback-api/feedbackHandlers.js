const feedback = require('./feedbackLib');

//GET 
const getAllFeedbacks = (req,res) => {
    const feedbacks = feedback.getAll();
    res.json(feedbacks)
}

//Post
const createFeedback = (req,res) => {
    const { sender, message, rating, platform } = req.body ?? {};

    const newFeedback = feedback.addOne(sender, message, rating, platform);

    if (newFeedback) {
        res.status(201).json(newFeedback);
    } else {
        res.status(400).json({ message: "Failed to create feedback" });
    }
}

//Get by Id
const getFeedbackById = (req,res) => {
    const FeedbackID = req.params.feedbackId;
    const foundFeedback = feedback.findById(FeedbackID);

    if (foundFeedback) {
        res.json(foundFeedback);
    } else {
        res.status(404).json({ message: "Failed to find feedback with this ID" });
    }
}

//Update by Id
const updateFeedback = (req,res) => {
    const FeedbackID = req.params.feedbackId;
    const updatedData = req.body;

    const updatedFeedback = feedback.update(FeedbackID, updatedData);

    if (updatedFeedback) {
        res.json(updatedFeedback);
    } else {
        res.status(404).json({ message: "Feedback not found" });
    }
}

//Delete by Id
const deleteFeedback = (req,res) => {
    const FeedbackID = req.params.feedbackId;

    const isDeleted = feedback.deleteOne(FeedbackID);

    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).json({message: "Feedback not found"});
    }
};

module.exports = {
    getAllFeedbacks,
    createFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
};
