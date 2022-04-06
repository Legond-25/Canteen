import React from "react";

export default function Navbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </nav>

      <h1>Meals for you</h1>

      <nav className="navigation">
        <div className="navigation__logo">
          <div className="navigation__img" alt="logo"></div>
        </div>

        <div className="navigation__name">Canteen</div>

        <div className="navigation__feature">
          <ul className="navigation__ulist">
            <li className="navigation__ulist--item">
              &nbsp;&nbsp;&nbsp; |&nbsp;
              <a href="#1" className="navigation__link">
                Feature 1
              </a>
            </li>
            <li className="navigation__ulist--item">
              &nbsp;&nbsp;&nbsp; |&nbsp;
              <a href="#2" className="navigation__link">
                Feature 2
              </a>
            </li>
            <li className="navigation__ulist--item">
              &nbsp;&nbsp;&nbsp; |&nbsp;
              <a href="#3" className="navigation__link">
                Feature 3
              </a>
            </li>
            <li className="navigation__ulist--item">
              &nbsp;&nbsp;&nbsp; |&nbsp;
              <a href="#4" className="navigation__link">
                Feature 4
              </a>
            </li>
            <li className="navigation__ulist--item">
              &nbsp;&nbsp;&nbsp; |&nbsp;
              <a href="#5" className="navigation__link">
                Feature 5
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
