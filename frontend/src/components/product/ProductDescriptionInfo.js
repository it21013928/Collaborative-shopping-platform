import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserId } from "../../api/user";
import axios from "axios";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
}) => {
  const dispatch = useDispatch();
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  const { id } = useParams();

  const [qty, setQty] = useState(0);

  const navigate = useNavigate();
  const [user, setUser] = useState("");
  console.log(user.id);
  //const userId = user.id;

  const [productId, setProductId] = useState(id);
  //const [customerId, setUserId] = useState(userId);
  //const [price, setPrice] = useState(product.price);
  //const [quantity, setQuantity] = useState(product.quantity);
  const [sellerId, setSellerId] = useState(product.userId);

  useEffect(() => {
    axios.get(`http://localhost:8000/product/${id}`).then(() => {});
  }, []);

  console.log(product);

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

  function increaseQty(e) {
    e.preventDefault();
    setQty(qty + 1);
  }

  function decreaseQty(e) {
    e.preventDefault();
    if (qty > 0) {
      setQty(qty - 1);
    }
  }

  console.log(qty);

  function handleAddToCart(e) {
    e.preventDefault();

    axios.get(`http://localhost:8000/product/${id}`).then((res) => {
      const productCart = {
        ProductID: id,
        sellerID: res.data.userId,
        Item_number: product.name,
        unitPrice: product.price,
        quantity: qty,
        customer_id: user.id,
      };

      console.log(productCart);

      fetch("http://localhost:8006/insert/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(productCart),
      }).then(() => {
        console.log("product added to cart");
        toast.success(`Product was added to Cart `, {
          position: "bottom-left",
        });
        setTimeout(() => {}, 2000);
      });
    });
  }

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
            <span className="old">
              {currency.currencySymbol + finalProductPrice}
            </span>
          </Fragment>
        ) : (
          <span>{currency.currencySymbol + finalProductPrice} </span>
        )}
      </div>
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-list">
        <p>{product.shortDescription}</p>
      </div>

      {product.variation ? (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variation.map((single, key) => {
                return (
                  <label
                    className={`pro-details-color-content--single ${single.color}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      checked={
                        single.color === selectedProductColor ? "checked" : ""
                      }
                      onChange={() => {
                        setSelectedProductColor(single.color);
                        setSelectedProductSize(single.size[0].name);
                        setProductStock(single.size[0].stock);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map((single) => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                        return (
                          <label
                            className={`pro-details-size-content--single`}
                            key={key}
                          >
                            <input
                              type="radio"
                              value={singleSize.name}
                              checked={
                                singleSize.name === selectedProductSize
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductSize(singleSize.name);
                                setProductStock(singleSize.stock);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="size-name">{singleSize.name}</span>
                          </label>
                        );
                      })
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button onClick={decreaseQty} className="dec qtybutton">
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={qty}
              readOnly
            />
            {/* <p className="cart-plus-minus-box">{quantity}</p> */}
            <button onClick={increaseQty} className="inc qtybutton">
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {product.quantity >= qty ? (
              <button
                onClick={handleAddToCart}
                disabled={product.quantity <= 0}
              >
                {" "}
                Add To Cart{" "}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
          <div className="pro-details-wishlist"></div>
          <div className="pro-details-compare"></div>
        </div>
      )}
      {product.category ? (
        <div className="pro-details-meta">
          <span>Category :</span>
          <ul>{product.category}</ul>
        </div>
      ) : (
        ""
      )}

      {product.quantity ? (
        <div className="pro-details-meta">
          <span>Available Quantity :</span>
          <ul>{product.quantity}</ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
