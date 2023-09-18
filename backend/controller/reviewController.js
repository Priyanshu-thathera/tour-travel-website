import Tour from "../models/TourSchema.js";
import Review from "../models/ReviewSchema.js";

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new Review({ ...req.body });
  try {
    const savedReview = await newReview.save();
    // after creating a new review now update the reviews array of the tour (only pushing the object id)
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({
      success: true,
      message: "Review Submitted successfully",
      data: savedReview,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to submit review " });
  }
};
