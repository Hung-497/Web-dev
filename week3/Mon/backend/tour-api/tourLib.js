let tourArray = [];

let nextId = 1;

const getAll = () => {
  return tourArray;
};

const addOne = (name, info, image, price, location) => {
  const numericPrice = Number(String(price).replaceAll(",", ""));
  // Check if any parameter is empty or undefined
  if (!name ||
    !info ||
    !image ||
    !price ||
    !location ||
    !Number.isFinite(numericPrice) ||
    numericPrice <= 0) {
    return false; // Return false if any parameter is invalid
  }

  const newTour = {
    id: nextId++,
    name, info, image, price, location
  };

  tourArray.push(newTour);
  return newTour;
}

const findById = (id) => {
	const numericId = Number(id);
	const tour = tourArray.find((item) => item.id === numericId);
	if (tour) {
		return tour;
	} else {
		return false;
	}
}

const update = (id, updatedData) => {
  const tour = findById(id);

  if (tour) {
    if (updatedData.name) {
      tour.name = updatedData.name;
    }
    if (updatedData.info) {
      tour.info = updatedData.info;
    }
    if (updatedData.image) {
      tour.image = updatedData.image;
    }
    if (updatedData.price) {
      tour.price = updatedData.price;
    }
    if (updatedData.location) {
      tour.location = updatedData.location;
    }
    return tour;
  }

  return false;
};

const deleteOne = (id) => {
  const tour = findById(id);
  if (tour) {
    const initialLength = tourArray.length;
    tourArray = tourArray.filter((tour) => tour.id !== Number(id));
    return tourArray.length < initialLength; // Indicate successful deletion if the length has decreased
  }
  return false; // Return false if the item was not found
};


module.exports = {
  addOne,
  getAll,
  findById,
  update,
  deleteOne,
};

if (require.main === module) {
  const result = addOne(
    "7 Days Tour",
    "Join us for the Best of Helsinki!",
    "https://www.course-api.com/images/tours/tour-x.jpeg",
    "1,495",
    "Helsinki, Finland"
  );

  console.log(result);
}