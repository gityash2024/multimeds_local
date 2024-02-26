import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { gql, useMutation } from "@apollo/client";
import 'react-toastify/dist/ReactToastify.css';
import LoginCarousel from "./LoginCarousel";
import PrimaryButton from "./PrimaryButton";
import Google from "../assets/login/googleLogo.svg";
import Edit from "../assets/login/editIcon.svg";
import Check from "../assets/login/checkIcon.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./loader";
const SENDOTP = gql`
  mutation sendOTP($input: OTPInput!) {
    sendOTP(input: $input) {
      status
      message
    }
  }
`;

const SENDEMAILOTP = gql`
  mutation sendEmailOTP($input: EmailOTPInput!) {
    sendEmailOTP(input: $input) {
      status
      message
    }
  }
`;

const VERIFYOTP = gql`
  mutation verifyOTP($input: OTPVerifyInput!) {
    verifyOTP(input: $input) {
      status
      message
      token
      isNewUser
      userDetails {
        id
        contactNumber
      }
    }
  }
`;

const Login = ({ ref, isLogin, setIsLogin, setUserDetails }) => {
  const loginRef = useRef();
  const navigate=useNavigate();
  const [errorMessage, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isOtpWindow, setIsOtpWindow] = useState(false);
  const [loginMethod, setLoginMethod] = useState('phone number');
  const [loginId, setLoginId] = useState("");
  const [otp, setOtp] = useState("");

  const [sendOTP, { loading: otpLoading }] = useMutation(SENDOTP);
  const [sendEmailOTP, { loading: emailLoading }] = useMutation(SENDEMAILOTP);
  const [verifyOTP, { loading: verifyLoading }] = useMutation(VERIFYOTP);

  useEffect(() => {
    const handler = (e) => {
      if (!loginRef.current.contains(e.target)) {
        setIsLogin(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const openOtpWindow = async (e) => {
    e.preventDefault();
    // setInputValue('');
    setError('');

    toast.success('Otp Sent Succesfully');
    setLoading(true);

    try {
      let method, mutation;
      if (loginMethod !== "email") {
        method = "sendOTP";
        mutation = sendOTP;
      } else {
        method = "sendEmailOTP";
        mutation = sendEmailOTP;
      }

      const input = loginMethod !== "email" ? { countryCode: '+91', phoneNumber: inputValue } : { email: inputValue };

      const { data } = await mutation({ variables: { input } });

      setLoading(false);

      if (data[method].status === "SUCCESS") { 
        setIsOtpWindow(true);
      } else {
        toast.error(`Error: ${data[method].message}`);              
      }
    } catch (error) {
      console.error("Error in sending OTP:", error);
      setLoading(false);
      toast.error(`Otp not sent, server error.`);
    }
  };

  const closeOtpWindow = () => {
    setIsOtpWindow(false);
  };

  const handleSubmit = async () => {
    setError('');
    toast.info(`Verifying OTP`);
    const variObj = {
      countryCode: '+91',
      phoneNumber: inputValue,
      otp: otp,
    };
  
    // Set loading to true here to show the loader during verification
    setLoading(true);
  
    try {
      const res = await verifyOTP({ variables: { input: variObj } });
      
      // Process the response
      console.log('verify otp res is', res);
      if (res.data.verifyOTP.status === "SUCCESS") {
        localStorage.setItem('token', res.data.verifyOTP.token);
        setUserDetails(res.data.verifyOTP.token);
        localStorage.setItem('userInfo', JSON.stringify(res.data.verifyOTP.userDetails));
        navigate('/refferal-login');
      } else {
        toast.error(`Otp not verified!`);
      }
    } catch (err) {
      console.error("Error in verifying OTP:", err);
      toast.error(`Otp not verified!!`);
    } finally {
      // Ensure loading is set to false after the operation is complete
      setLoading(false);
    }
  
    setIsLogin(false);
  };
  

  const handleClick = () => {
    // setInputValue('');
    setError('');
    setLoginMethod(loginMethod === "phone number" ? "email" : "phone number");
  };

  const validateInput = (value) => {
    if (loginMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError('Please enter a valid email address');
        return false;
      }
    } else {
      const numberRegex = /^\d{10}$/;
      if (!numberRegex.test(value)) {
        setError('Please enter a valid 10-digit number');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    validateInput(value);
    setLoginId(loginMethod === "email" ? `${value.slice(0, 4)}xxxxxx.${value.slice(-4)}` : `XXXXX${value.slice(-4)}x`);
  };

  return (
    <div>
    <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div
        ref={ref}
        className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-40"
      >
        <div
          ref={loginRef}
          className="w-[54.5rem] flex justify-center items-center max-w-[54.5rem] rounded-xl p-6 gap-6 bg-white shadow-login"
        >
          <LoginCarousel />
          {loading && <Loader />}
          {!isOtpWindow ? (
            <div className="w-full flex flex-col gap-8 ">
              <div className="flex gap-4 flex-col">
                <div className="flex gap-1 flex-col">
                  <h1 className="text-[1.5rem] font-HelveticaNeueMedium text-[#0F172A]">
                    Login/Signup to Multimeds
                  </h1>
                  <h2 className="font-HelveticaNeueLight text-[#475569]">
                    Enter your {loginMethod} to receive an OTP
                  </h2>
                </div>
                <form className="flex flex-col gap-2">
                  <input
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={loginMethod === 'email' ? 'Enter email' : 'Enter mobile number'}
                    className="min-h-10 rounded border border-[#CBD5E1] focus:outline-none text-[0.875rem] py-[0.813rem] px-4 placeholder:text-[#E2E8F0] font-medium placeholder:text-[0.875rem] placeholder:font-medium"
                  />
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  <PrimaryButton disable={(errorMessage || !inputValue)?true:false}  handleClick={openOtpWindow} title="LOGIN" />
                  <p className="text-[0.75rem] text-[#475569]">
                    By logging in, you have agreed to our{" "}
                    <Link to="/legal" className="text-[#FBA79B]" href="">
                      terms and conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacypolicy" className="text-[#FBA79B]" href="">
                      privacy policy
                    </Link>
                  </p>
                </form>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-center text-[0.75rem] font-InterMedium text-[#94A3B8]">
                  or login with
                </h1>
                <div className="flex items-center gap-2">
                  <button className="w-full flex justify-center rounded p-4 gap-2 border border-[#CBD5E1]">
                    <img src={Google} />
                  </button>
                  <button
                    onClick={handleClick}
                    className="w-full h-full  rounded p-4 gap-2 border border-[#CBD5E1]"
                  >
                    <h1 className=" uppercase h-full flex justify-center items-center min-h-[1.563rem] font-HelveticaNeueMedium text-[#031B89]">
                      {loginMethod === "phone number" ? "email" : "phone number"}
                    </h1>
                  </button>
                </div>
              </div>
              <p className="text-[#0F172A]  text-[0.75rem] font-HelveticaNeueMedium">
                Need help?{" "}
                <Link className="text-[#7487FF]" href="">
                  Contact Us
                </Link>
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-6">
              <div className="flex gap-1 flex-col">
                <h1 className="text-[1.5rem] font-HelveticaNeueMedium text-[#0F172A]">
                  Enter your OTP
                </h1>
                <div className="flex gap-2">
                  <h2 className="font-HelveticaNeueLight text-[#475569]">
                    Enter the OTP received on {loginId}
                  </h2>
                  <button onClick={closeOtpWindow}>
                    <img src={Edit} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={false}
                    renderInput={(props) => <input {...props} />}
                    containerStyle={"flex gap-2"}
                    inputStyle={`min-w-[2.25rem] h-[2.5rem] py-[0.813rem] px-3 ${
                      otp === "" ? "border border-[#CBD5E1]" : null
                    } ${
                      otp !== ""
                        ? "border border-[#CBD5E1]"
                        : null
                    } rounded`}
                
                  />
              
                </div>
              
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#0F172A] text-[0.75rem]">
                  Didn’t get an OTP?{" "}
                  <button onClick={openOtpWindow}
                    className="text-[#7487FF]  font-HelveticaNeueMedium"
                  >
                    Resend Code
                  </button>
                </p>
                <Link >
                  <PrimaryButton  disable={( !otp )?true:false}  handleClick={()=>{setLoading(true);handleSubmit()}} title="SUBMIT" />
                </Link>
              </div>
              <p className="text-[#0F172A]  text-[0.75rem] font-HelveticaNeueMedium">
                Need help?{" "}
                <Link className="text-[#7487FF]" href="">
                  Contact Us
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
