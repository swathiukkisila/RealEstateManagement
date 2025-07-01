import { useContext } from "react";
import Slider from "react-slick";
import { FaAward, FaHome, FaUserTie } from "react-icons/fa";
import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";
import "./homePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Herosection from "../../components/herosection/Herosection";
import Footer from "../../components/footer/Footer";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <>
    <div className="homePage">
      {/* Carousel Section */}
      <Slider {...settings} className="carousel-container">
        {[2, 1, 3].map((num) => (
          <div className="slide" key={num}>
            <img src={`/homeimage${num}.jpg`} alt={`Slide ${num}`} />
            <div className="overlay">
              <h1>{num === 1 ? "Find Real Estate & Get Your Dream Place" : num === 2 ? "Best Deals for Your Next Property Investment" : "Connecting You to the Best Real Estate Opportunities"}</h1>
              <SearchBar className="search-bar" />
            </div>
          </div>
        ))}
      </Slider>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-container">
          {[
            { icon: <FaUserTie />, value: "16+", label: "Years of Experience" },
            { icon: <FaAward />, value: "200", label: "Awards Won" },
            { icon: <FaHome />, value: "2000+", label: "Properties Ready" },
          ].map((item, index) => (
            <div className="info-box" key={index}>
              {item.icon}
              <h1>{item.value}</h1>
              <h2>{item.label}</h2>
            </div>
          ))}
        </div>
      </section>
      <Herosection/>
      <Footer/>
    </div>
    
    </> 
  );
}

export default HomePage;