import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart, decreaseQuantity, deleteFromCart, deleteAllFromCart } from "../../store/slices/cart-slice";
import { cartItemStock } from "../../helpers/product";
import axios from 'axios';
import Axios from 'axios';
import './css/cartCss.css';
import CheckoutForm from './CardForm';
import {  getUserId } from "../../api/user";

var totalCartPrice = 0;
var prdct_count = 0;

const Cart = () => {
  //let cartTotalPrice = 0;

  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  let { pathname } = useLocation();

  //Getting user ID
///////////////////////////////////////////////////////////
  const [apiData, setApiData] = useState([]);
  const[userid, setUserid] = useState('');

  useEffect(() => {

    const token = localStorage.getItem("token");
       const fetchUser = async (token) => {
         try {
           if (token) {
             console.log(token)
             const userID = await getUserId(token);
             console.log(userID)
             Axios.get(`http://localhost:8000/cart/get/${userID.id}`)
        .then((getData) => {
            setApiData(getData.data);


        })
        setUserid(userID)

            // if (!userID) {              
            // } else {
            //                  
            // }
           } else {            
           }
         } catch (error) {
           console.error(error);
         }
       };
   
       fetchUser(token);
       
    
    
})
console.log(apiData)

//Delete from cart
const onDelete = (id) => {
  axios.delete(`http://localhost:8000/cart/delete/${id}/${userid.id}`)
    .then(() => {
      console.log("Deleted")
    })
}



return (
  <Fragment>
    <SEO
      titleTemplate="Cart"
      description="Cart page of flone react minimalist eCommerce template."
    />

    <LayoutOne headerTop="visible">
      {/* breadcrumb */}
      <Breadcrumb 
        pages={[
          {label: "Home", path: process.env.PUBLIC_URL + "/" },
          {label: "Cart", path: process.env.PUBLIC_URL + pathname }
        ]} 
      />
      <div className="cart-main-area pt-90 pb-100">
        <div className="container">
          {apiData && apiData.length >= 1 ? (
            <Fragment>
              <h3 className="cart-page-title">Your cart items</h3>
              <div className="row">
                <div className="col-12">
                  <div className="table-content table-responsive cart-table-content">
                    <table>
                      <thead>
                        <tr>
                          
                          <th>Product Name</th>
                          <th>Unit Price</th>
                          <th>Qty</th>
                          <th>Subtotal</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {totalCartPrice = 0}
                      {prdct_count = 0}
                        {apiData.map((data, key) => {
                          totalCartPrice = totalCartPrice + (data.unitPrice * data.quantity);
                          localStorage.setItem("total", totalCartPrice)
                          prdct_count ++;
                          localStorage.setItem("pCount", prdct_count)
                          return (
                            <tr key={key}>
                              
                              <td>
                              {data.Item_number}
                            </td>
                            <td>
                              {data.unitPrice}
                            </td>
                            <td>
                              {data.quantity}
                            </td>
                            <td>
                              {data.quantity * data.unitPrice}
                            </td>
                            <td>
                              <button type="button" class = "button" onClick={() => onDelete(data._id)}>Delete</button>
                            </td>
                              

                              

                              
                              

                              
                            </tr>
                          );
                        })}
                        

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
             

              <div className="row">
                <div className="col-lg-4 col-md-6">
                  
                </div>

                

                <div className="col-lg-4 col-md-12">
                  <div className="grand-totall" >
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        Cart Total
                      </h4>
                    </div>
                    <h5>
                      Total products{" "}
                      <span>
                        
                      </span>
                    </h5>

                    <h4 className="grand-totall-title">
                      Grand Total{" "}
                      <span>
                        {totalCartPrice}
                      </span>
                    </h4>
                    <Link to={process.env.PUBLIC_URL + "/shipto"}>
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon mb-30">
                    <i className="pe-7s-cart"></i>
                  </div>
                  <div className="item-empty-area__text">
                    No items found in cart <br />{" "}
                    <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutOne>
  </Fragment>
);
};



export default Cart;


