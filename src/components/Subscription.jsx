import React, { useState, useEffect, useContext } from 'react';
import Loader from './loader';
import { toast } from 'react-toastify';
import { gql, useMutation, useQuery } from '@apollo/client';
import Context from '../context/AppContext';

// Define your GraphQL mutations and queries here
const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation CreateSubscription($input: SubscriptionInput!) {
    createSubscription(input: $input) {
      status
      message
    }
  }
`;

const GET_MY_ADDRESSES = gql`
  query getMyAddresses {
    getMyAddresses {
      status
      message
      addresses {
        id
        houseNumber
        aptOrBuildingName
        streetOrAreaName
        city
        pincode
        state 
        label 
      }
    }
  }
`;

const GET_USER_SUBSCRIPTIONS_QUERY = gql`
  query GetUserSubscriptions {
    getUserSubscriptions {
      status
      message
      subscriptions {
        id
        productId
        addressId
        deliveryInDays
        status
        userId
      }
    }
  }
`;

const EDIT_SUBSCRIPTION_MUTATION = gql`
  mutation EditSubscription($input: SubscriptionInput!) {
    editSubscription(input: $input) {
      status
      message
    }
  }
`;

const SubscriptionOption = ({ description, originalPrice, discountedPrice, discountPercentage, selected, onSelect }) => (
  <div className="justify-start items-start gap-1 inline-flex">
    <input
      type="radio"
      style={{cursor:'pointer'}}
      className="w-6 h-6 relative bg-slate-50 rounded-[46px] shadow-inner border border-slate-100"
      checked={selected}
      onChange={() => onSelect(description)}
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

const SubscriptionCard = ({ handleRefetch }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { selectedProduct } = useContext(Context);
  const [subscriptionOptions] = useState( [
    { description: "Monthly - every 30 days", originalPrice: selectedProduct?.maxRetailPrice, discountedPrice: (Number(selectedProduct?.maxRetailPrice) * Number(selectedProduct?.discount))/100, discountPercentage: selectedProduct?.discount },
    { description: "Quarterly - every 90 days", originalPrice: selectedProduct?.maxRetailPrice, discountedPrice: (selectedProduct?.maxRetailPrice * selectedProduct?.discount)/100, discountPercentage: selectedProduct?.discount },
  ]); 
  const { loading: addressesLoading, error: addressesError, data: addressesData } = useQuery(GET_MY_ADDRESSES);
  const [createSubscription] = useMutation(CREATE_SUBSCRIPTION_MUTATION);
  const [editSubscription] = useMutation(EDIT_SUBSCRIPTION_MUTATION);

  useEffect(() => {
    if (!addressesLoading && !addressesError && addressesData?.getMyAddresses?.addresses?.length > 0) {
      setSelectedAddressId(addressesData.getMyAddresses.addresses[0].id); // Select the first address by default
    }
  }, [addressesData, addressesLoading, addressesError]);

  const handleOptionSelect = (description) => {
    setSelectedOption(description);
  };

  const handleSubscribeClick = async () => {
    if (selectedOption && selectedAddressId) {
      setLoading(true);
      try {
        const { data } = await createSubscription({
          variables: {
            input: {
              productId: selectedProduct.id,
              addressId: selectedAddressId,
              deliveryInDays: selectedOption === "Monthly - every 30 days" ? "30" : "90", // Assuming different delivery days based on subscription option
            },
          },
        });
        if (data?.createSubscription?.status === 'success') {
          toast.success("Subscription successful!");
          handleRefetch();
        } else {
          throw new Error(data?.createSubscription?.message || 'Failed to subscribe');
        }
      } catch (error) {
        toast.error(error.message || 'Failed to subscribe. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please select a subscription option and an address before subscribing.");
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
        onClick={handleSubscribeClick}
      >
        <div className="text-blue-900 text-base font-medium font-['Helvetica Neue'] leading-tight">
          Subscribe
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
  
};

export default SubscriptionCard;
