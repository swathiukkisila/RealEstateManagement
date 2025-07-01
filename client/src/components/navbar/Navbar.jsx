import { useContext, useState, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  useEffect(() => {
    if (currentUser) {
      fetch();
    }
  }, [currentUser, fetch]);

  return (
    <nav>
      <div className="left">
        <span className="logo">
          <img src="/homelogo4.jpg" alt="logo" />
          <span>RealEstate</span>
        </span>

        <div className="linkWrapper">
          <Link to="/home">Home</Link>
          <div className="hoverBar"></div>
        </div>

        <div className="linkWrapper">
          <Link to="/about">About</Link>
          <div className="hoverBar"></div>
        </div>

        <div className="linkWrapper">
          <Link to="/list">Properties</Link>
          <div className="hoverBar"></div>
        </div>
      </div>

      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="user" />
            <span>{currentUser.username}</span>
            <div className="profile-container">
              <Link to="/profile" className="profile">
                {number > 0 && <div className="notification">{number}</div>}
                <span>Profile</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="register">Sign Up</Link>
          </>
        )}

        <div className="menuIcon">
          <img src="/menu.png" alt="menu" onClick={() => setOpen((prev) => !prev)} />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/list">Properties</Link>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
