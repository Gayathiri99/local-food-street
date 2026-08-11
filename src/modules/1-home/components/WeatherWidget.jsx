import { useNavigate } from "react-router-dom";
import { useAuth } from "../../6-user/AuthContext";
import "../Home.css";

function WeatherWidget() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section className="weather-section">

      <div className="weather-header">
        <span>☀️ TODAY'S WEATHER</span>
        <h2>Weather & Daily Special</h2>
        <p>Plan your food street visit with today's weather</p>
      </div>

      <div className="weather-container">

        {/* Weather Card */}
        <div className="weather-card">

          <div className="weather-top">
            <div>
              <p className="weather-location">📍 Your Location</p>
              <h3>Sunny</h3>
              <p className="weather-date">Today's Weather</p>
            </div>

            <div className="weather-icon">
              ☀️
            </div>
          </div>

          <div className="temperature">
            30°C
          </div>

          <div className="weather-details">

            <div>
              <span>💧</span>
              <p>Humidity</p>
              <strong>65%</strong>
            </div>

            <div>
              <span>💨</span>
              <p>Wind</p>
              <strong>12 km/h</strong>
            </div>

            <div>
              <span>🌡️</span>
              <p>Feels Like</p>
              <strong>32°C</strong>
            </div>

          </div>

        </div>


        {/* Daily Special */}
        <div className="daily-special">

          <span className="special-tag">
            ⭐ TODAY'S SPECIAL
          </span>

          <div className="special-icon">
            🍛
          </div>

          <h3>South Indian Veg Meals</h3>

          <p>
            Enjoy a delicious traditional vegetarian meal
            perfect for today's weather.
          </p>

          <button onClick={() => navigate(isAuthenticated ? "/listing" : "/login")}>
            Explore Today's Special →
          </button>

        </div>

      </div>

    </section>
  );
}

export default WeatherWidget;