// The data model for an item is as follows
/*
addOne(
  "John Smith",
  "Great session on React components!",
  5,
  "mobile"
);
*/

let feedbackArray = [];

let nextId = 1;

function getAll() {
  return feedbackArray;
}

function addOne(sender, message, rating, platform) {
  // Check if any parameter is empty or undefined
  if (!sender || !message || !rating || rating < 1 || rating > 5 || !platform) {
    return false; // Return false if any parameter is invalid
  }

  const newFeedback = {
    id: nextId++,
    sender,
    message,
    rating,
    platform,
  };

  feedbackArray.push(newFeedback);
  return newFeedback;
}

function findById(id) {
	const numericId = Number(id);
	const feedback = feedbackArray.find((item) => item.id === numericId);
	if (feedback) {
		return feedback;
	} else {
		return false;
	}
}

const update = (id, updatedData) => {
  const feedback = findById(id);

  if (feedback) {
    if (updatedData.sender) {
      feedback.sender = updatedData.sender;
    }
    if (updatedData.message) {
      feedback.message = updatedData.message;
    }
    if (updatedData.rating) {
      feedback.rating = updatedData.rating;
    }
    if (updatedData.platform) {
      feedback.platform = updatedData.platform;
    }
    return feedback;
  }

  return false;
};

function deleteOne(id) {
  const feedback = findById(id);
  if (feedback) {
    const initialLength = feedbackArray.length;
    feedbackArray = feedbackArray.filter((feedback) => feedback.id !== Number(id));
    return feedbackArray.length < initialLength; // Indicate successful deletion if the length has decreased
  }
  return false; // Return false if the item was not found
}


const Feedback = {
  addOne,
  getAll,
  findById,
  update,
  deleteOne,
};

module.exports = Feedback;
