import React from "react";
import img1 from "";

function AvailableMeals(props) {
  return (
    <div classname="card-container">
      <div classname="card">
        <div classname="card__body">
          <img src={props.imgsrc} alt="food-item" />
          <h2 classname="card__title">{props.title} </h2>
          <h2 classname="card__price">`$₹{props.price.toFixed(2)}`</h2>
        </div>
        <button classname="card__btn">Add to Cart</button>
      </div>
    </div>
  );
}

export default AvailableMeals;
