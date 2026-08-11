import HeroBanner from "./components/HeroBanner";
import QuickCategories from "./components/QuickCategories";
import WeatherWidget from "./components/WeatherWidget";

import "./Home.css";

function HomePage() {

  return (
    <main>

      <HeroBanner />

      <QuickCategories />

      <WeatherWidget />

    </main>
  );
}

export default HomePage;
