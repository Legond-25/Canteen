import React from "react";
import img1 from "";

function AvailableMeals(props) {
  return (
    <div classname="card-container">
      <div classname="grid">
        <div class="grid_item">
          <div class="card">
            <img src={props.imgsrc} alt="food-item" class="card__img" />
            <div class="card__content">
              <h2 class="card__title">{props.title}</h2>
              <p class="card__description">{props.description}</p>
              <div class="card__amount">`$₹{props.price.toFixed(2)}`</div>
              <button class="card__btn">
                Add To Cart <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableMeals;
