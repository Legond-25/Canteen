import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import Footer from './Footer';


function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState({
    data: false,
    loading: true,
  });

  const loginHandler = useCallback(async () => {
    const values = {
      email: 'user1@gmail.com',
      password: 'test12345',
    };

    await axios
      .post('http://127.0.0.1:5000/api/v1/users/login', values)
      .then((res) => {
        if (res.data.status === 'success') {
          setIsLoggedIn({
            data: true,
            loading: false,
          });
        } else {
          setIsLoggedIn({ data: false, loading: false });
        }
      });
  }, []);

  useEffect(() => {
    loginHandler();
  }, [loginHandler]);

  const paymentHandler = useCallback(async () => {
    const values = {
      amount: 50000,
      currency: 'INR',
      notes: {
        notes_key_1: 'Tea, Earl Grey, Hot',
        notes_key_2: 'Tea, Earl Grey… decaf.',
      },
    };

    if (isLoggedIn) {
      await axios
        .post('http://127.0.0.1:5000/api/v1/orders', values)
        .then((res) => {
          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            name: 'Atharva',
            description: 'Test Transaction',
            order_id: res.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: '/is-order-complete',
            theme: {
              color: '#3399cc',
            },
          };

          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    paymentHandler();
  }, [paymentHandler]);

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navigation />
        <button className="btn-login" onClick={loginHandler}>
          Login
        </button>
        <button className="btn" onClick={paymentHandler}>
          Pay Now
        </button>
      </div>

      <Footer />
    </div>
  );
}
export default Home;
