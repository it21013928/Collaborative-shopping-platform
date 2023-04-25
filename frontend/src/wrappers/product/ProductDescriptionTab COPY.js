import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import review from "../../api/review";
import { useParams } from "react-router-dom";

const ProductDescriptionTab = ({ spaceBottomClass, productFullDesc }) => {
  //const service = new review();

  // useEffect(() => {
  //   service.getAllReviews().then((Reviewdetails) => {
  //     setReviews(Reviewdetails.data);
  //     console.log(Reviewdetails.data);
  //   });
  // }, []);

  // useEffect( async () => {
  //   await service.getAllProducts().then((Productdetails) => {
  //   setProducts(Productdetails.data);
  //   console.log(Productdetails.data);
  //   });
  // }, []);

  ///////////////////////////////////////////////////////
  // const { id } = useParams();
  // console.log(id);

  // const [reviews, setReviews] = useState(null);

  // const [userName, setUserName] = useState("");
  // const [message, setMessage] = useState("");
  // const [userId] = useState();
  // const [productId] = useState(id);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     const response = await fetch(`http://localhost:8002/review/${id}`);
  //     const json = await response.json();
  //     console.log(json);
  //     console.log(json[0]);
  //     if (response.ok) {
  //       setReviews(json);
  //     }
  //   };

  //   fetchReviews();
  // }, []);

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();

  //   const review = { userName, message, userId, productId };
  //   console.log(review);

  //   fetch("http://localhost:8002/review/create", {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify(review),
  //   }).then(() => {
  //     console.log("new review added");
  //     // window.location.reload();
  //   });
  // };

  // const handleDeleteSubmit = async (e) => {
  //   e.preventDefault();

  //   const response = await fetch("http://localhost:8002/review/" + userName, {
  //     method: "DELETE",
  //   });
  //   const json = await response.json();

  //   if (!response.ok) {
  //     console.log(json.error);
  //   }

  //   if (response.ok) {
  //     console.log("Review deleted successfully.", json);
  //     // window.location.reload();
  //   }
  // };

  return (
    <div className={clsx("description-review-area", spaceBottomClass)}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">Reviews(2)</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
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
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {productFullDesc}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="review-wrapper">
                      <div className="single-review">
                        <div className="review-content">
                          <div className="review-top-wrap">
                            <div className="review-left">
                              <div className="review-name">
                                {/* {review &&
                                  review.map((review) => (
                                    <div>
                                      <h4>{review.userName}</h4>

                                      <div className="review-left">
                                        <button onClick={{}}>Delete</button>
                                      </div>

                                      <div className="review-bottom">
                                        <p>{review.message}</p>
                                      </div>
                                    </div>
                                  ))} */}

                                <h4>White Lewis</h4>
                              </div>
                            </div>
                            <div className="review-left">
                              <button onClick={{}}>Delete</button>
                            </div>
                          </div>
                          <div className="review-bottom">
                            <p>
                              Vestibulum ante ipsum primis aucibus orci
                              luctustrices posuere cubilia Curae Suspendisse
                              viverra ed viverra. Mauris ullarper euismod
                              vehicula. Phasellus quam nisi, congue id nulla.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="single-review child-review"></div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Add a Review</h3>
                      <br />
                      <div className="ratting-form">
                        <form action={{}}>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="rating-form-style mb-10">
                                <input
                                  placeholder="Name"
                                  type="text"
                                  // onChange={(e) => setUserName(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="rating-form-style form-submit">
                                <textarea
                                  name="Your Review"
                                  placeholder="Message"
                                  defaultValue={""}
                                  // onChange={(e) => setMessage(e.target.value)}
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
