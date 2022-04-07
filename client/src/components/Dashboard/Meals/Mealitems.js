import React from "react";
import AvailableMeals from "./AvailableMeals";
//import img1 from " ";

const MealItems = (props) => {
  return (
    <>
      <div classname="">
        <div className="row">
          <div className="">
            <div className="col-md-4">
              <AvailableMeals
                imgsrc={img1}
                title="Paneer Masala"
                price="20.00"
              />
              <AvailableMeals imgsrc={img2} title="Dosa" />
              <AvailableMeals></AvailableMeals>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MealItems;
