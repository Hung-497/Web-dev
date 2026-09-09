const Tour = require("./tourLib");

const getAllTours = (req, res) => {
  const tours = Tour.getAll();
  res.json(tours);
};

const createTour = (req, res) => {
  const { name, info, image, price, location } = req.body;

  const newTour = Tour.addOne(name, info, image, price, location);

  if (newTour) {
    return res.status(201).json(newTour);
  } else {
    return res.status(400).json({
      message: "Failed to create tour",
    });
  }
};

const getTourById = (req, res) => {
  const tourId = req.params.tourId;
  const tour = Tour.findById(tourId);

  if (tour) {
    res.json(tour);
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

const updateTour = (req, res) => {
  const tourId = req.params.tourId;
  const { name, info, image, price, location } = req.body;

  const updatedTour = Tour.update(tourId, {
    name,
    info,
    image,
    price,
    location,
  });

  if (updatedTour) {
    res.json(updatedTour);
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

const deleteTour = (req, res) => {
  const tourId = req.params.tourId;

  const isDeleted = Tour.deleteOne(tourId);

  if (isDeleted) {
    res.status(204).json({ message: "Tour successfully deleted" });
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

module.exports = {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
};
