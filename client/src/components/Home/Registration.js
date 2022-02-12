import React from "react";

const Registration = () => {
    return (
        <>
<div class="center">
        <h1>Login</h1>
        <form method="post">
          <div class="txt_field">
            <input type="text" required />
            <span></span>
            <label>Fullname</label>
          </div>
          <div class="txt_field">
            <input type="text" required />
            <span></span>
            <label>Email</label>
          </div>
          <div class="txt_field">
            <input type="tel" required />
            <span></span>
            <label>Mobile number</label>
          </div>
          <div class="txt_field">
            <input type="password" required />
            <span></span>
            <label>Password</label>
          </div>
          <input type="submit" value="Register" />
          
         
        </form>
      </div>
    













        </>
    );
};
export default Registration;