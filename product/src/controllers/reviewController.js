const Review = require("../models/reviewModel");

//CREATE a Review
const createReview = async (req, res) => {
  try {
    const { userName, message, userId, productId } = req.body;

    // Check name price quantity is empty
    if (!userName || !message) {
      return res.status(400).json({
        message: "User name, message fields must be filled",
      });
    }

    // Create new user
    const review = new Review({
      userName,
      message,
      userId,
      productId,
    });
    await review.save();

    res.status(201).json({
      userName: userName,
      message: message,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//GET all Reviews by Product ID
const getAllReviews = async (req, res) => {
  try {
    // Find Review
    const review = await Review.find({ productId: req.params.id });

    if (!review) {
      res.status(404).send("reviews not found");
      console.log("No review found");
    } else {
      res.send(review);
      console.log("***All reviews got successfully***");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//GET all Reviews by  ID
const getReviewsByID = async (req, res) => {
  try {
    // Find Review
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404).send("reviews not found");
      console.log("No review found");
    } else {
      res.send(review);
      console.log("***All reviews got successfully***");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete a review
const deleteReview = async (req, res) => {
  try {
    // Find review by ID
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Delete product
    await review.remove();

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewsByID,
};
