"use client"
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams, useRouter } from 'next/navigation';

const PaymentPage = ({ username }) => {
  const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_KEY_ID;
  const CALLBACK_URL = process.env.NEXT_PUBLIC_SITE_URL + '/api/razorpay';

  const [currentUser, setcurrentUser] = useState({})
  const [payments, setPayments] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()

  const [paymentform, setPaymentform] = useState({
    name: '',
    message: '',
    amount: ''
  });

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    // const query = new URLSearchParams(window.location.search);
    // const paymentDone = query.get("paymentdone");
    // console.log("paymentdone param:", paymentDone);

    if(searchParams.get("paymentdone") == "true") {
      console.log("Showing toast...");
      toast('Thanks for your donation!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    router.push(`/${username}`)

  }, [])

  const getData = async () => {
    let u = await fetchuser(username)
    setcurrentUser(u)
    let dbpayments = await fetchpayments(username)
    setPayments(dbpayments)
    console.log(u, dbpayments)
  }

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const pay = async (amount) => {
    if (typeof window === 'undefined' || !window.Razorpay) {
      alert('Razorpay SDK Failed to load');
      return;
    }

    try {
      const a = await initiate(amount, username, paymentform);
      const orderId = a.id;

      const options = {
        key: currentUser.razorpayID,
        amount: amount,
        currency: "INR",
        name: "Get Me a Chai",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId,
        callback_url: CALLBACK_URL,
        prefill: {
          name: paymentform.name || "Anonymous",
          email: "example@example.com",
          contact: "+919876543210",
          method: "upi", // optional: hint to Razorpay
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Error initiating payment:", err);
      alert("Payment failed to initiate.");
    }
  };

  const handleCustomPay = () => {
    const rupees = parseFloat(paymentform.amount);
    if (!isNaN(rupees) && rupees > 0) {
      pay(rupees * 100); // convert to paise
    } else {
      alert("Please enter a valid amount.");
    }
  };


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => console.log("Razorpay SDK Loaded")}
      />

      {/* <div className='cover relative'>
        <img className='min-w-full' src={currentUser.coverpic} alt="bg-img" />
        <div className='absolute -bottom-12 right-[46.5%] border-2 border-white rounded-full'>
          <img height={100} width={100} src={currentUser.profilepic} alt="profile" className='rounded-full' />
        </div>
      </div> */}

      <div className='cover relative h-[60vh] w-full'>
        <img
          className='w-full h-full object-cover'
          src={currentUser?.coverpic || "https://media.tenor.com/Rj42JLYjq0MAAAAM/photo.gif"}
          alt="bg-img"
        />
        <div className='absolute -bottom-12 left-1/2 transform -translate-x-1/2 border-2 border-white rounded-full'>
          <img
            height={100}
            width={100}
            src={currentUser?.profilepic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTus2JHCKdsCbJ51iKunVvLTulmexPckb-LR3ppfCQ4_WxiXyVa4KGyBM0ublRjY5qBl5c&usqp=CAU}"}
            alt="profile"
            className='rounded-full'
          />
        </div>
      </div>


      <div className='info flex flex-col items-center justify-center my-14 gap-2'>
        <div className='font-bold text-lg'>
          @{username || 'anonymous'}
        </div>
        <div className='text-slate-400'>
          let's help {username} get a Chai
        </div>
        <div className='text-slate-400'>
          {payments.length} Payments. ₹{payments.reduce((a,b)=>a + b.amount, 0)} raised.
        </div>

        <div className='payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row'>
          <div className="supporters h-[55vh] w-full md:w-1/2 bg-slate-900 rounded-lg p-10 overflow-y-auto">
            <h2 className='font-bold text-2xl pb-4'>Top 5 Supporters</h2>
            <ul className='mx-5 pb-5'>
              {payments.length == 0 && <li className='my-4'>No payments yet</li>}
              {payments.map((p, idx) => (
                <li key={idx} className='my-2 flex gap-2 items-center'>
                  <img width={33} src="/avatar.gif" alt="user avatar" />
                  <span>
                    {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message &quot;{p.message}&quot;
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="makepayment h-[55vh] w-full md:w-1/2 bg-slate-900 rounded-lg p-10">
            <h2 className='text-2xl font-bold mb-5'>Make a Payment</h2>
            <div className="flex flex-col gap-2">
              <input type="text" onChange={handleChange} value={paymentform.name} name='name' placeholder='Enter Name' className='w-full p-3 rounded-lg bg-slate-700' />
              <input type="text" onChange={handleChange} value={paymentform.message} name='message' placeholder='Enter Message' className='w-full p-3 rounded-lg bg-slate-700' />
              <input type="text" onChange={handleChange} value={paymentform.amount} name='amount' placeholder='Enter Amount' className='w-full p-3 rounded-lg bg-slate-700' />
              <button type="button" onClick={handleCustomPay} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:from-green-100 disabled:to-blue-900 " disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length<1}>
                Pay
              </button>
            </div>

            <div className="flex gap-2 mt-5">
              <button className='bg-slate-800 p-3 rounded-lg cursor-pointer' onClick={() => pay(1000)}>Pay ₹10</button>
              <button className='bg-slate-800 p-3 rounded-lg cursor-pointer' onClick={() => pay(2000)}>Pay ₹20</button>
              <button className='bg-slate-800 p-3 rounded-lg cursor-pointer' onClick={() => pay(3000)}>Pay ₹30</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
