import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./css/index.css";
import './form.css';
import {  getUserId } from "../../api/user";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
const totalCartPrice = require('./Cart')

export default function AddCustomerPayment() {

  const cartTotalPrice = localStorage.getItem("total")
  const adresssssss = localStorage.getItem("addr")
  const phoneNo = localStorage.getItem("mobilee")
  const namee = localStorage.getItem("name")
  
  const productCount = localStorage.getItem("pCount")


  const[userID, setUserID] = useState('');
   useEffect(() => {
       const token = localStorage.getItem("token");
       const fetchUser = async (token) => {
         try {
           if (token) {
             console.log(token)
             const userID = await getUserId(token);
             console.log(userID)
             if (!userID) {
               
             } else {
               await setUserID(userID);
               
             }
           } else {
             
           }
         } catch (error) {
           console.error(error);
         }
       };
   
       fetchUser(token);
     }, []);
     console.log(userID)

      //////////////////////////////////////////
      
      


  
  

  

  
  



  const [number, setCardNumber] = useState("");
  const [name, setHolderName] = useState();
  const [expiry, setExpiryDate] = useState("");
  const [cvc, setCVC] = useState("");
  const [focus, setFocus] = useState("");
  const [cusID, setCusID] = useState("ABC");

  const [userNameERR, setuserNameERR] = useState({});
  const [cardNumberERR, setCardNumberERR] = useState({});
  const [cvcNumberERR, setCvcNumberERR] = useState({});
  const [expireDateERR, setExpireERR] = useState({});
  const [expireDateERR2, setExpireERR2] = useState({});

  function isEmpty(txt) {
    if (txt.length == 0) {
      return true;
    } else {
      return false;
    }
  }
  //setCusID(user.id);
  //form validation
  const formValidation = () => {
    const cardNumberERR = {};
    const cvcNumberERR = {};
    const expireDateERR = {};
    const expireDateERR2 = {};
    const userNameERR = {};
    let isValid = true;
    var userName = name;
    if (cvc.trim().length < 3) {
      cvcNumberERR.cvcShort = "Invalid CVC Number!";
      isValid = false;
    }
    if (cvc.trim().length > 3) {
      cvcNumberERR.cvcShort = "Invalid CVC Number!";
      isValid = false;
    }

    if (isNaN(cvc)) {
      cvcNumberERR.cvcShort = "Invalid CVC Number!";
      isValid = false;
    }

    if (cvc.trim().length == 0) {
      cvcNumberERR.cvcShort = "Please Enter the CVC number!";
      isValid = false;
    }

    if (number.toString().length < 16) {
      cardNumberERR.numberShort = "Invalid Card Number!";
      isValid = false;
    }

    if (isNaN(number)) {
      cardNumberERR.numberShort = "Invalid Card Number!";
      isValid = false;
    }

    if (number.toString().length == 0) {
      cardNumberERR.numberShort = "Please Enter Card Number!";
      isValid = false;
    }

    if (isEmpty(name)) {
      userNameERR.numberShort = "Please Enter User Name!";
      isValid = false;
    }

    const ex1 = String(expiry).slice(0, 2);
    const ex2 = String(expiry).slice(3, 6);
    const ex3 = String(expiry).slice(2, 3);
    const month = Number(ex1);
    const year = Number(ex2);
    const currentYear = String(new Date().getFullYear()).slice(2, 4);
    const currentMonth = parseInt(new Date().getMonth() + 1);
    const chkYR = parseInt(currentYear);

    if (month > 12) {
      expireDateERR.expireShort = "Invalid Expire Date!";
      isValid = false;
    }

    if (ex3 != "/") {
      expireDateERR.expireShort = "Invalid Expire Date!";
      isValid = false;
    }

    if (isEmpty(expiry)) {
      expireDateERR.expireShort = "Please Enter the expire date!";
      isValid = false;
    }
    if (expiry.length != 0) {
      if (month <= 12) {
        if (ex3 == "/") {
          if (year < chkYR) {
            expireDateERR2.expireShort =
              "Card is Expired! please check your card";
            isValid = false;
          }
          if (year == chkYR) {
            if (month <= currentMonth) {
              expireDateERR2.expireShort =
                "Card is Expired! please check your card";
              isValid = false;
            }
          }
        }
      }
    }

    console.log();

    setCvcNumberERR(cvcNumberERR);
    setCardNumberERR(cardNumberERR);
    setExpireERR(expireDateERR);
    setExpireERR2(expireDateERR2);
    setuserNameERR(userNameERR); //
    return isValid;
  };
 
  async function sendDataToAPI(e, _id) {
    e.preventDefault();
    //
    //setPaying(true);
    //const { client_secret } = await fetch("http://localhost:8083/create-payment", {
    //    method: "POST",
    //    headers: {
    //        "Content-Type": "application/json",
    //        "Authorization": "Bearer sk_test_51MyIpIFhTFEnkTy8M6XsRARLa2TrpDNlQ0J7obv3NOavVWAbboqCd4WzMefYGusWrQTDDQrV7NUarwl2zIehBfGX00WkMx1zfD",
    //    },
    //    //Retreving the user cart total
    //    body: JSON.stringify({ amount: cartTotalPrice*10 }),
    //})
    var cartTotalPricee = 150
    console.log("dddddddddddddddddddddddddddddddddddddddddddddddddd")
    console.log(cartTotalPrice)
    await axios.post('http://localhost:8083/create-payment', {amount: cartTotalPricee}).then (async () => {

    console.log(_id)
    console.log(namee)
    console.log(adresssssss)
    console.log(phoneNo)

    

    await axios.post('http://localhost:8000/orders/', {
      cus_id: userID.id,
      status: "Confirmed",
      recieverName: namee,
      productCount:productCount,
      address: adresssssss,
      phoneNumber: phoneNo

  }).then (async () => {
    deleteCart()
  }) 

    })
     
}

async function deleteCart(){

  await axios.delete(`http://localhost:8000/cart/deleteFullCart/${userID.id}`)
  .then(() => {
    console.log("Deleted")
  })
}







  return (
    
    <section style={{ marginTop: "2%", marginLeft: "0%", marginBottom: "10%" }}>
      <ToastContainer />
      <div style={{ marginBottom: "-45%" }}>
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={name}
          number={number}
        />
      </div>
      <div className="formContent">
        <h2
          style={{ marginTop: "50%", marginBottom: "4%", marginLeft: "-10%" }}
        >
          Card details
        </h2>
        <form>
          <div>
            <div>
              <label>Enter the Card Number</label>
              <input
                type="tel"
                val={number}
                onChange={(e) => setCardNumber(e.target.value)}
                maxlength="16"
                onFocus={(e) => setFocus(e.target.name)}
                name="number"
                placeholder=""
              />
              <label>
                {Object.keys(cardNumberERR).map((key) => {
                  return (
                    <div style={{ color: "red" }}>{cardNumberERR[key]}</div>
                  );
                })}{" "}
              </label>
            </div>
          </div>
          <div>
            <div>
              <label>Enter the Card Holder's Name</label>
              <input
                type="tel"
                val={name}
                onChange={(e) => setHolderName(e.target.value)}
                maxlength="17"
                name="name"
                onFocus={(e) => setFocus(e.target.name)}
              />
              <label>
                {Object.keys(userNameERR).map((key) => {
                  return <div style={{ color: "red" }}>{userNameERR[key]}</div>;
                })}
              </label>
            </div>
          </div>
          <div>
            <div>
              <label>Enter the Expire Data (MM/YY)</label>
              <input
                type="tel"
                val={expiry}
                onChange={(e) => setExpiryDate(e.target.value)}
                maxlength="5"
                name="expiry"
                onFocus={(e) => setFocus(e.target.name)}
                style={{ width: "20%" }}
              />
            </div>
          </div>{" "}
          <label>
            {Object.keys(expireDateERR).map((key) => {
              return <div style={{ color: "red" }}>{expireDateERR[key]}</div>;
            })}
            {Object.keys(expireDateERR2).map((key) => {
              return <div style={{ color: "red" }}>{expireDateERR2[key]}</div>;
            })}{" "}
          </label>
          <div></div>
          <div>
            <div>
              <label>Enter the CVV </label>
              <input
                type="tel"
                val={cvc}
                onChange={(e) => setCVC(e.target.value)}
                maxlength="3"
                name="cvc"
                onFocus={(e) => setFocus(e.target.name)}
                style={{ width: "8%" }}
              />
              <br />
            </div>
          </div>{" "}
          <label>
            {Object.keys(cvcNumberERR).map((key) => {
              return <div style={{ color: "red" }}>{cvcNumberERR[key]}</div>;
            })}{" "}
          </label>
          <div style={{ marginLeft: "34%" }}>
          

            <button className="submit" type="submit" onClick={(e) => sendDataToAPI(e)}>
                            SEND!
                            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
