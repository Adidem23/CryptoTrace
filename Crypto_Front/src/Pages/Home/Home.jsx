import Features from "../../components/CustomComponents/Features/Features";
import Hero1 from "../../components/CustomComponents/Hero1/Hero1";
import Navbar from "../../components/CustomComponents/Navbar/Navbar";
import Price from "../../components/CustomComponents/Pricing/Price";
import Footer from "../../components/CustomComponents/Footer/Footer";
import Testimonial from "../../components/CustomComponents/Testomonials/Testimonial";

const Home = () => {
 
  return (
    <div>
      <Navbar/>
      <Hero1 />
      <Features/>
      <Testimonial/>
      <Price/>
      <Footer/>
    </div>
  );
};

export default Home;
