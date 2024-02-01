import React, { useState, useEffect } from 'react';

const SubscriptionOption = ({ description, originalPrice, discountedPrice, discountPercentage, selected, onSelect }) => (
  <div className="justify-start items-start gap-1 inline-flex">
    <input
      type="radio"
      className="w-6 h-6 relative bg-slate-50 rounded-[46px] shadow-inner border border-slate-100"
      checked={selected}
      onChange={() => onSelect(description)} // Call onSelect when the input is clicked
    />
    <div className="flex-col justify-center items-start gap-1 inline-flex">
      <div className="text-slate-800 text-sm font-medium font-['Helvetica Neue'] leading-[17.50px]">{description}</div>
      <div className="flex-col justify-center items-start flex">
        <div className="justify-start items-center gap-1 inline-flex">
          <div className="text-slate-500 text-xs font-normal font-['Helvetica Neue'] line-through leading-[17.50px]">Rs {originalPrice}</div>
          <div className="text-slate-900 text-sm font-medium font-['Helvetica Neue'] leading-[17.50px]">Rs {discountedPrice}</div>
        </div>
        <div className="text-lime-600 text-xs font-light font-['Helvetica Neue'] leading-[15px]">(save {discountPercentage}%)</div>
      </div>
    </div>
  </div>
);

const SubscriptionCard = () => {
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Placeholder for API call
    const fetchSubscriptionOptions = async () => {
      // Example data structure
      const data = [
        { description: "Monthly - every 30 days", originalPrice: 134, discountedPrice: 100, discountPercentage: 5 },
        { description: "Quarterly - every 90 days", originalPrice: 134, discountedPrice: 100, discountPercentage: 5 },
        // ... other subscription options
      ];
      setSubscriptionOptions(data);
    };

    fetchSubscriptionOptions();
  }, []);

  const handleOptionSelect = (description) => {
    setSelectedOption(description);
  };

  const handleSubscribeClick = () => {
    if (selectedOption) {
      console.log("Selected Subscription Option:", selectedOption);
      // You can perform further actions here, such as making an API call to subscribe the user.
    } else {
      console.log("Please select a subscription option before subscribing.");
    }
  };

  return (
<div className="w-[615px] h-[261px] px-3 py-5 bg-white rounded shadow border border-slate-100 flex-col justify-center items-start gap-3 inline-flex">
      <div className="self-stretch h-[23px] flex-col justify-center items-start gap-1 flex">
        <div className="w-[501px] h-[23px] text-slate-900 text-lg font-medium font-['Helvetica Neue'] leading-snug">Subscribe and Save :</div>
      </div>
      {subscriptionOptions.map((option, index) => (
        <SubscriptionOption
          key={index}
          {...option}
          selected={selectedOption === option.description}
          onSelect={handleOptionSelect}
        />
      ))}
      <div className="self-stretch p-4 rounded border border-blue-900 justify-center items-start gap-2 inline-flex cursor-pointer"
       // Add hover effect here
          style={{
            transition: 'background-color 0.3s ease',
            ':hover': {
              backgroundColor: 'lightblue', // Change to your desired hover background color
            },
          }}  onClick={handleSubscribeClick} >
        <div
          className="text-blue-900 text-base font-medium font-['Helvetica Neue'] leading-tight "
         
         
        >
          Subscribe
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
