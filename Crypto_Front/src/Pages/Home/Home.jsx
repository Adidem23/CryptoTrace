import Partners from "../../components/CustomComponents/Partners/Partners";
import Features from "../../components/CustomComponents/Features/Features";
import Hero1 from "../../components/CustomComponents/Hero1/Hero1";
import React from "react";
import Navbar from "../../components/CustomComponents/Navbar/Navbar";
import Price from "../../components/CustomComponents/Pricing/Price";
import { Waitlist } from "../../components/CustomComponents/Waitlist/Waitlist";
import Footer from "../../components/CustomComponents/Footer/Footer";
import Testimonial from "../../components/CustomComponents/Testomonials/Testimonial";
import Showcase from "../../components/CustomComponents/Showcase/Showcase";
import { Signup } from "../../components/CustomComponents/Forms/Signup";
import Button from "../../components/CustomComponents/Button/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
      const handleButtonClick = () => {
       navigate("/dashboard");

  };
 

  return (
    <div>
      <Navbar/>
      <Hero1 />
      {/* <Features/> */}
      {/* <Testimonial/> */}
      {/* <Price/> */}
      {/* <Showcase/> */}

      {/* <Waitlist/> */}
         <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Button text="Connect wallet" onClick={handleButtonClick} />
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
