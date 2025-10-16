import logoApp from "../images/logo_app.png";
import { Link } from "react-router-dom";

// Reused from my personal dev guide
function LandingPage() {
  return (
    <div>
      <header className="hero">
        <section className="hero__content">
          <img
            className="content__logo"
            src={logoApp}
            alt="Logo Dragon Ball Finder"
          />
          <p className="content__slogan">
            Every character has a story. Find yours.
          </p>
          <div className="content__button">
            <Link to="/finder" className="button__cta">
              A new adventure awaits!
            </Link>
          </div>
        </section>
      </header>
    </div>
  );
}

export default LandingPage;
