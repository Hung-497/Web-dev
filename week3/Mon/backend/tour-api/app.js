const express = require("express");
const app = express();

const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("./tourHandlers");

app.use(express.json());

app.get("/tours", getAllTours);
app.post("/tours", createTour);
app.get("/tours/:tourId", getTourById);
app.patch("/tours/:tourId", updateTour);
app.delete("/tours/:tourId", deleteTour);

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});