// Blog.js
import React from "react";
import FeaturedIcon from "../assets/Group.svg";
import BlogImage from "../assets/backimag.jpeg";
import drySkin from "../assets/Dry_Skin.png";
import fattyLiver from "../assets/Fatty_Liver.png";
import acidity from "../assets/Acidity.png";
import moringaLeaves from "../assets/Moringa_leaves.png";
import moringaDrink from "../assets/Morning_Drink.png";

import { Link } from "react-router-dom";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Blog() {
  return (
    <>
      <div className="w-full  px-[100px] py-12 bg-neutral-50 flex-col justify-start items-start gap-5 inline-flex">
        <div className="text-slate-900 text-[32px] font-bold font-['Helvetica Neue'] leading-10">
          Blogs
        </div>
        <div className="self-stretch justify-start items-start gap-5 inline-flex">
          <div className="flex-col justify-start items-start gap-2 inline-flex">
            <div className="w-full h-[467px] p-6 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 flex">
              <Link
                to="/blogDetails/dry-skin-in-summer"
                className="w-full h-[344px] relative rounded-lg"
              >
                <img
                  src={drySkin}
                  alt="Blog"
                  className="w-full h-[344px] relative rounded-lg"
                />

                <div className="px-2 py-1 right-[4%] top-[26px] absolute bg-teal-100 rounded justify-center items-center gap-1 inline-flex">
                  <div className="w-6 h-6 relative">
                    <div className="w-6 h-6 left-[-0px] top-[-0px] absolute">
                      <img
                        src={FeaturedIcon}
                        alt="Featured"
                        className="w-6 h-6"
                      />
                    </div>
                  </div>
                  <div className="text-slate-900 text-sm font-medium font-['Helvetica Neue'] leading-[17.50px]">
                    Featured
                  </div>
                </div>
              </Link>
              <div className="self-stretch h-[59px] flex-col justify-start items-start gap-1 flex">
                <div className="text-slate-900 text-base font-bold font-['Helvetica Neue'] leading-tight">
                  Dry Skin in Summer? Beat the Heat with These Expert Tips, Home Remedies, & a 7-Step Regimen for Radiant Skin
                </div>
                <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
                  Summer is all about sunshine and outdoor fun, but it can wreak havoc on your skin, leaving it dry, itchy, and flaky. If you're battling dry skin this summer, you're not alone. In this guide, we'll delve into the causes of dry skin in summer, share effective home remedies, and outline a 7-step regimen to restore your skin's natural glow.
                </div>
              </div>
            </div>
            <div className="flex-grow: 1 justify-start items-start gap-2 inline-flex">
              <div className="grow shrink basis-0 p-6 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 inline-flex">
                <Link
                  to="/blogDetails/reverse-fatty-liver"
                  className="w-full h-[344px] relative rounded-lg"
                >
                  <img
                    src={fattyLiver}
                    alt="Blog"
                    className="w-full h-[344px] relative rounded-lg"
                  />
                </Link>
                <div className="self-stretch h-[94px] flex-col justify-start items-start gap-1 flex">
                  <div className="text-slate-900 text-base font-bold font-['Helvetica Neue'] leading-tight">
                    5 Powerful Home Remedies to Reverse Fatty Liver and Boost Liver Health Naturally
                  </div>
                  <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
                    Fatty liver disease, a condition where excess fat accumulates in the liver, is a growing concern worldwide.
                  </div>
                </div>
              </div>
              <div className="grow shrink basis-0 p-6 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 inline-flex">
                <Link
                  to="/blogDetails/summer-energy-drinks"
                  className="w-full h-[344px] relative rounded-lg"
                >
                  <img
                    src={moringaDrink}
                    alt="Blog"
                    className="w-full h-[344px] relative rounded-lg"
                  />
                </Link>
                <div className="self-stretch h-[94px] flex-col justify-start items-start gap-1 flex">
                  <div className="text-slate-900 text-base font-bold font-['Helvetica Neue'] leading-tight">
                    Beat the Heat and Fatigue: 5 Refreshing Morning Drinks for Summer Energy
                  </div>
                  <div className="self-stretch text-slate-900 mb-3 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
                    Summer's heat and humidity can leave you feeling sluggish and drained. But don't let fatigue hold you back from enjoying the sunny season!
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grow shrink  flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch h-[486px] p-4 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 flex">
              <Link
                to="/blogDetails/acidity-relief"
                className="w-full h-[344px] relative rounded-lg"
              >
                <img
                  src={acidity}
                  alt="Blog"
                  className="w-[789px] h-[344px] relative rounded-lg"
                />
              </Link>
              <div className="self-stretch h-[94px] flex-col justify-start items-start gap-1 flex">
                <div className="text-slate-900 text-base font-bold font-['Helvetica Neue'] leading-tight">
                  Heartburn No More: 14 Effective Home Remedies for Acidity Relief
                </div>
                <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
                  That burning sensation in your chest, the sour taste in your mouth—acidity, also known as heartburn or acid reflux, is a common digestive issue that can be both uncomfortable and disruptive. While antacids offer temporary relief, there are many natural home remedies that can provide effective and lasting relief.
                </div>
              </div>
            </div>
            <div className="self-stretch h-[486px] p-4 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 flex">
              <Link
                to="/blogDetails/moringa-health-benefits"
                className="w-full h-[344px] relative rounded-lg"
              >
                <img
                  src={moringaLeaves}
                  alt="Blog"
                  className="w-[789px] h-[344px] relative rounded-lg"
                />
              </Link>
              <div className="self-stretch h-[94px] flex-col justify-start items-start gap-1 flex">
                <div className="text-slate-900 text-base font-bold font-['Helvetica Neue'] leading-tight">
                  Moringa Leaves: The Nutrient-Packed Superfood with 16 Amazing Health Benefits
                </div>
                <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
                  Moringa oleifera, often called the "miracle tree," has been used for centuries in traditional medicine for its incredible nutritional and therapeutic properties. The leaves of this versatile plant are particularly noteworthy, packed with vitamins, minerals, antioxidants, and other essential nutrients that offer a wide range of health benefits.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhyChooseUs />
    </>
  );
}