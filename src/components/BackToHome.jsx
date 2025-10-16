import { Link } from "react-router-dom";
import kintoApp from "../images/kinto_app.png";

function BackToHome() {
  return (
    <div className="finder__logo-end">
      <Link to="/">
        <img src={kintoApp} alt="back to home" className="finder__logo" />
      </Link>
    </div>
  );
}

export default BackToHome;
