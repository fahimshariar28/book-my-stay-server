import Hotel from "../models/Hotel.js";

// create a hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const hotel = await newHotel.save();
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// update a hotel
export const updateHotel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// delete a hotel
export const deleteHotel = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Hotel.findByIdAndDelete(id);
    res.status(200).json(`${id} Hotel has been deleted`);
  } catch (error) {
    next(error);
  }
};

// get a hotel
export const getHotel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// get all hotels
export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
