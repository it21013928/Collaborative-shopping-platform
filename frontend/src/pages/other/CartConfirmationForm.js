import react ,{useState}from 'react';
import './form.css';
import Payment from './CardForm'
import { getUserId } from "../../api/user";
import { useEffect } from 'react';

const ShippingDetails = () =>{

    const[address,setAddress] = useState('');
    const[mobile, setMobile] = useState('');
    const[name, setName] = useState('');
    const[email, setEmail] = useState('')

    let settingTextAdderess = (e)=>{
        let newText1 = e.target.value;
        setAddress(newText1);
        localStorage.setItem("addr", newText1)       
    }

    let settingTextName = (e)=> {
        let newText3 = e.target.value;
        console.log(newText3)
        setName(newText3);
        localStorage.setItem("name", newText3)
    }

    let settingTextPhone = (e) => {
        let newText2 = e.target.value;
        console.log(newText2)
        setMobile(newText2);
        localStorage.setItem("mobilee", newText2)
    }

    let settingEmail = (e) => {
        let newText4 = e.target.value;
        console.log(newText4)
        setEmail(newText4);
        localStorage.setItem("mail", newText4)
    }




return(

    <div className="form">
        <div className="col-12 col-lg-8 col-md-7">
                    <div className="contact-form">
                    <div className="contact-title mb-30">
                        <h2>Order Details</h2>
                    </div>
                    <form className="contact-form-style">
                        <div className="row">
                        <div >
                            <input  placeholder="Name*" onChange={settingTextName} type="text"  />
                        </div>
                        <div >
                            <input name="email" onChange={settingEmail} placeholder="Email*" type="email" />
                        </div>

                        <div >
                            <input  placeholder="MobileNo*" onChange={settingTextPhone} type="email" />
                        </div>

                        <div >
                            <input
                            
                            placeholder="Shipping Address*"
                            onChange={settingTextAdderess}
                            type="text"
                            />
                        </div>
                        <div className="col-lg-12">
                            <textarea
                            name="message"
                            placeholder="Your Message*"
                            defaultValue={""}
                            />
                            
                        </div>
                        </div>
                    </form>
                    <p className="form-message" />
                    </div>
                </div>
                <Payment />
              </div>
);
}
export default ShippingDetails;