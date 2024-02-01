import React, { useRef, useState } from "react";

import LeftArrowActive from "../assets/leftArrowActive.svg";
import RightArrowActive from "../assets/rightArrowActive.svg";
import RightArrowInactive from "../assets/rightArrowInactive.svg";
import LeftArrowInactive from "../assets/leftArrowInactive.svg";
// import ProductImage from "../assets/product/productImage.png";
// import DummyImage1 from "../assets/product/dummyImage1.jpeg";
// import DummyImage2 from "../assets/product/dummyImage2.png";

const ProductImageCarousel = (props) => {
  const [slide, setSlide] = useState(0);

  // const imageData = [
  //   {
  //     sno: 1,
  //     // design: Design1,
  //     image: props.image,
  //   },
  //   {
  //     sno: 2,
  //     // design: Design1,
  //     image: DummyImage1,
  //   },
  //   {
  //     sno: 3,
  //     // design: Design1,
  //     image: DummyImage2,
  //   },
  // ];

  const res = props.image.filter((item, index) => {
    return index === slide;
  });

  const ref = useRef(null);

  const [isStart, setIsStart] = useState(true);

  const ScrollToRight = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
    setIsStart(false);
  };

  const ScrollToLeft = (scrollOffset) => {
    ref.current.scrollLeft -= scrollOffset;
    setIsStart(true);
  };

  
  return (
    <div className="flex flex-col items-center bg-[#F8FAFC] w-[35.813rem] ">
      {/* Carousel */}
      <div className="flex mt-[1.125rem] gap-1">
        <button
          onClick={() => setSlide(slide === 0 ? 0 : slide - 1)}
          className="cursor-pointer"
        >
          <img src={isStart ? LeftArrowInactive : LeftArrowActive} />
        </button>
        <div ref={ref} className="flex gap-4">
          {props.image.map((item, index) => {
            return (
              <img
                src={item}
                className={`${
                  index === slide ? "opacity-100" : " opacity-40"
                } w-[4.5rem] h-[4.438rem] object-cover rounded`}
              />
            );
          })}
        </div>
        <button
          onClick={() => setSlide(slide === props.image.length-1 ? 0 : slide + 1)}
          className="cursor-pointer"
        >
          <img src={isStart ? RightArrowActive : RightArrowInactive} />
        </button>
      </div>
      <div className="max-w-[28.813rem] mt-[5.875rem] mb-[9.5rem]">
        {res.map((item, index) => {
          return (
            <img
              src={item}
              alt="Product Image"
              className="object-cover rounded-lg"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
