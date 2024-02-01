import React from "react";

import Navbar from "../components/Navbar";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

const ContactUs = () => {
  return (
    <div>
      <div className="flex items-center py-2 sm:py-12 px-4 sm:px-24 bg-white">
        <div className="flex-col flex gap-6 w-full">
          <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-[#CBD5E1] py-4 text-[#0F172A]">
            <h1 className="text-[1.5rem] font-HelveticaNeueMedium">
              Contact Us
            </h1>
            <h2 className="text-[1.125rem] font-HelveticaNeueItalic">
              last updated : 23rd March 2023
            </h2>
          </div>

          <p className="text-[#1E293B] w-full">
            <br/>
            <br/>
            Mail us at: <span className=" font-HelveticaNeueMedium">info@mymultimeds.com</span>
            <br />
            <br />
            Call us at: <span className=" font-HelveticaNeueMedium">8073619792 / 8088810431</span>
            <br/>
            <br/>
            Registered Office: LEVEL 14, CONCORDE TOWERS, UB CITY, NO. 24, 
            <br/>
            VITTAL MALLYA ROAD, Bengaluru, India, 560001

          </p>
        </div>
      </div>

      <WhyChooseUs />
    </div>
  );
};

export default ContactUs;
