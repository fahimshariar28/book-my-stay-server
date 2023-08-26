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
    const { min, max, featured, limit, city } = req.query;
    if (!limit) {
      const hotels = await Hotel.find({});
      return res.status(200).json(hotels);
    } else {
      const hotels = await Hotel.find({
        city: { $regex: city, $options: "i" },
        cheapestPrice: { $gte: min || 0, $lte: max || 999 },
        featured: featured || false,
      }).limit(parseInt(limit));
      res.status(200).json(hotels);
    }
  } catch (error) {
    next(error);
  }
};

// count by city
export const countByCities = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map(async (city) => {
        return Hotel.countDocuments({ city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

// count by type
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({
      type: { $regex: "Hotel", $options: "i" },
    });
    const resortCount = await Hotel.countDocuments({
      type: { $regex: "resort", $options: "i" },
    });
    const apartmentCount = await Hotel.countDocuments({
      type: { $regex: "apartment", $options: "i" },
    });
    const villaCount = await Hotel.countDocuments({
      type: { $regex: "villa", $options: "i" },
    });
    const cabinCount = await Hotel.countDocuments({
      type: { $regex: "cabin", $options: "i" },
    });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "resort", count: resortCount },
      { type: "apartment", count: apartmentCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
