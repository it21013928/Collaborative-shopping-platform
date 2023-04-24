const express = require("express");

const {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewsByID,
} = require("../controllers/reviewController");

const router = express.Router();

//CREATE a new Review
router.post("/review/create", createReview);

//GET all Reviews by Product ID
router.get("/review/:id", getAllReviews);

//GET all Reviews by ID
router.get("/review/getById/:id", getReviewsByID);

// DELETE a Review
router.delete("/review/:id", deleteReview);

module.exports = router;
