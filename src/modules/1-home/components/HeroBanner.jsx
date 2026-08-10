import { useNavigate } from "react-router-dom";
import { useAuth } from "../../6-user/AuthContext";
import "../Home.css";

function HeroBanner() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Taste The Real Local Flavours 🍴
        </h1>

        <p>
          Discover delicious foods from local streets
          and enjoy traditional tastes near you.
        </p>

        <button onClick={() => navigate(isAuthenticated ? "/listing" : "/login")}>
          Explore Foods
        </button>

      </div>

    </section>
  );
}

export default HeroBanner;