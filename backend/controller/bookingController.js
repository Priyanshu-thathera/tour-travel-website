
import Booking from "../models/BookingSchema.js";

// create new booking
export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);
    
    try {
      const savedbooking = await newBooking.save();
  
      res.status(200).json({
        success: true,
        message: "Your tour Booked successfully",
        data: savedbooking,
      });
    } catch (err) {
      console.log(err)
      res.status(500).json({ success: false, message: "Failed to Book tour, internal server error." });
    }
  };

// get user bookings
  export const getBooking = async (req, res) => {
    const id = req.body._id;
    try {
      const book = await Booking.find({userId : id});
  
      res.status(200).json({
        success: true,
        message: "successful",
        data: book,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "not found" });
    }
  };

  // delete User booking
export const deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    if(id){
    await Booking.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully Cancelled",
    });
  }
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to Cancel" });
  }
};

  // get All booking
  export const getAllBooking = async (req, res) => {

    try {
      const books = await Booking.find({});
  
      res.status(200).json({
        success: true,
        message: "successful",
        data: books,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };