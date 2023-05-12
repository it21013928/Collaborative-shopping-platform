import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Typography, Grid } from "@mui/material";
import { getUserId } from "../../api/user";

const ProductDescriptionTab = ({ spaceBottomClass, productFullDesc }) => {
  const { id } = useParams();
  console.log(id);

  const [review, setReviews] = useState(null);

  const [reviewId, setReviewId] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  //const [userId] = useState();
  const [productId] = useState(id);

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const userId = user.id;

  //const rId = review.userId;

  //fetch user ID
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async (token) => {
      try {
        if (token) {
          const userData = await getUserId(token);
          if (!userData) {
            navigate("/login-register");
          } else {
            await setUser(userData);
          }
        } else {
          navigate("/login-register");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser(token);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`http://localhost:8002/review/${id}`);
      const json = await response.json();
      console.log(json);
      console.log(json[0]);
      if (response.ok) {
        setReviews(json);
      }
    };

    fetchReviews();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const review = { userName, message, userId, productId };
    console.log(review);

    fetch("http://localhost:8002/review/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(review),
    }).then(() => {
      console.log("new review added");
      toast.success(`Review added successfully `, {
        position: "bottom-left",
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  };

  async function handleDeleteSubmit(e, ID) {
    e.preventDefault();

    const response = await fetch("http://localhost:8002/review/" + ID, {
      method: "DELETE",
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      console.log("Review deleted successfully.", json);
      toast.success(`Review deleted successfully`, {
        position: "bottom-left",
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  return (
    <div className={clsx("description-review-area", spaceBottomClass)}>
      <ToastContainer />
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              {/* <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item> */}
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">Reviews</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              {/* <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Weight</span> 400 g
                    </li>
                    <li>
                      <span>Dimensions</span>10 x 10 x 15 cm{" "}
                    </li>
                    <li>
                      <span>Materials</span> 60% cotton, 40% polyester
                    </li>
                    <li>
                      <span>Other Info</span> American heirloom jean shorts pug
                      seitan letterpress
                    </li>
                  </ul>
                </div>
              </Tab.Pane> */}
              <Tab.Pane eventKey="productDescription">
                {productFullDesc}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="review-wrapper">
                      <div className="single-review">
                        <Grid container spacing={2}>
                          {/*------------------------------------ review start */}
                          {review &&
                            review.map((review) => (
                              <Grid item xs={8}>
                                <div className="review-content">
                                  <div className="review-top-wrap">
                                    <div className="review-left">
                                      <div className="review-name">
                                        <h4>{review.userName} </h4>
                                      </div>
                                    </div>
                                    <div className="review-left">
                                      {userId === review.userId ? (
                                        <button
                                          style={{
                                            align: "right",
                                            float: "right",
                                          }}
                                          onClick={(e) =>
                                            handleDeleteSubmit(e, review._id)
                                          }
                                          // disabled={userId !== review.userId}
                                        >
                                          Delete
                                        </button>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                  <div className="review-bottom">
                                    <p>{review.message}</p>
                                  </div>
                                </div>
                              </Grid>
                            ))}

                          {/*------------------------------------------- end */}
                        </Grid>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Add a Review</h3>
                      <div className="ratting-form">
                        <form onSubmit={handleFormSubmit}>
                          <div className="star-box"></div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="rating-form-style mb-10">
                                <input
                                  placeholder="Name"
                                  type="text"
                                  onChange={(e) => setUserName(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="rating-form-style form-submit">
                                <textarea
                                  name="Your Review"
                                  placeholder="Message"
                                  defaultValue={""}
                                  onChange={(e) => setMessage(e.target.value)}
                                />
                                <input type="submit" defaultValue="Submit" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;
