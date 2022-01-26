const Home = () => {
  return (
    <>
      <nav className="navigation">
        <div className="navigation__logo">
          <div className="img" alt="logo"></div>
        </div>

        <div className="navigation__name">Canteen</div>

        <div className="navigation__feature">
          <ul className="navigation__ulist">
            <li className="navigation__ulist--item">
              01
              <a href="#1" className="navigation__link">
                Feature 1
              </a>
            </li>
            <li className="navigation__ulist--item">
              02
              <a href="#2" className="navigation__link">
                Feature 2
              </a>
            </li>
            <li className="navigation__ulist--item">
              03
              <a href="#3" className="navigation__link">
                Feature 3
              </a>
            </li>
            <li className="navigation__ulist--item">
              04
              <a href="#4" className="navigation__link">
                Feature 4
              </a>
            </li>
            <li className="navigation__ulist--item">
              05
              <a href="#5" className="navigation__link">
                Feature 5
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Home;
