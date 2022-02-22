import { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

function Home() {
  const doPayment = (props) => {};

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navigation />
        <button className="btn" onClick={doPayment}>
          Pay Now
        </button>
      </div>

      <Footer />
    </div>
  );
}
export default Home;
