import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faFacebook,
faTwitter,
faInstagram
}from "@fortawesome/free-brands-svg-icons";

 const  Footer = () =>{
  return(
<div className="main-footer">
<div className="container">
<div className="row">
{/* column 1*/}
<div className="col">
  <h4>Contact Us</h4>
  <ul className="list-unstyled">
  <li>9373583910</li>
  <li>Lakshmi nagar,ravet,pune</li>
  <li>canteen@gmail.com</li>

  </ul>
</div>
{/* column 2*/}
<div className="col">
  <h4>About our Site</h4>
  <ul className="list-unstyled">
    <li> college canteen website</li>
    <li>online food ordering</li>
    <li>Our Blog</li>
  </ul>
</div>

{/* column 3*/}
<div className="col">
  <h4> social media</h4>
  <ul className="list-unstyled">
  <a href=" " className="Facebook social"><FontAwesomeIcon icon={ faFacebook } size="2x"/></a>
  <a href=" " className="Twitter social"><FontAwesomeIcon icon={ faTwitter } size="2x"/></a>
  <a href=" " className="Instagram social"><FontAwesomeIcon icon={ faInstagram} size="2x"/></a>
  </ul>
</div>

<hr/>
</div>
<div className="row">
  <p className="col-sm">
   &copy;{new Date().getFullYear()}CANTEEN|All right reserved| Terms of service|Privacy

  </p>
</div>
</div>
</div>
  )
}
export default Footer;