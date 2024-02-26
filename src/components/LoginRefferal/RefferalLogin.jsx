import React, { useState } from 'react'
import './RefferalLogin.css'
import { useNavigate } from 'react-router-dom';

const RefferaLogin = (props) => {

  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
const navigate=useNavigate();
  const handleInputChange = (event) => {
    setReferralCode(event.target.value);
    // Reset error when the user starts typing
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the input is empty or contains only white space
    if (!referralCode.trim()) {
      setError('Referral code is required.');
      return;
    }
    else{
      // verify refferal code from backend
      localStorage.setItem('LoggedInViaReferral',referralCode);
      navigate('/');
    }
    // Submit logic here
    console.log('Submitted with code:', referralCode);
  };

  const handleSkip = () => {
    navigate('/');
        console.log('Skipped');
  };

  return (
    <div className="refferal-login-container">
     
      <div className="refferal-login-refferal-login">
        <div className="refferal-login-refferal8">
          <div className="refferal-login-refferal150">
            <img
              alt="Rectangle67051"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/9383e622-5575-4fcc-ac5d-da465fed460b/30fab043-b0ed-4734-8c50-0c12137c377c?org_if_sml=1173&amp;force_format=original"
              className="refferal-login-rectangle6"
            />
            <img
              alt="Rectangle57051"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/9383e622-5575-4fcc-ac5d-da465fed460b/499b31c3-22c6-42cc-aa99-e12ecb875b23?org_if_sml=1189&amp;force_format=original"
              className="refferal-login-rectangle5"
            />
            <img
              alt="Rectangle77051"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/9383e622-5575-4fcc-ac5d-da465fed460b/83f2a6dc-3025-4d36-aa94-d07e4ae70e05?org_if_sml=1173&amp;force_format=original"
              className="refferal-login-rectangle7"
            />
            <img
              alt="Rectangle87051"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/9383e622-5575-4fcc-ac5d-da465fed460b/9fadd3bd-d96b-4523-9f90-aafa7d6d6c9c?org_if_sml=1173&amp;force_format=original"
              className="refferal-login-rectangle8"
            />
            <img
              alt="Rectangle97051"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/9383e622-5575-4fcc-ac5d-da465fed460b/932d489a-d880-4a2c-a741-cce6f4f67848?org_if_sml=1173&amp;force_format=original"
              className="refferal-login-rectangle9"
            />
          </div>
          <div className="refferal-login-refferal151">
            <span className="refferal-login-text 16Medium">
              <span>Secure Transactions</span>
            </span>
            <span className="refferal-login-text02 14Regular">
              <span>
                Your safety is paramount to us. We ensure secure and encrypted
                transactions to safeguard your personal and financial
                information.
              </span>
            </span>
          </div>
          <div className="refferal-login-securedatabro">
            <div className="refferal-login-shield">
              <img
                alt="Vector7051"
                src="/external/vector7051-tjxom.svg"
                className="refferal-login-vector"
              />
              <img
                alt="Vector7051"
                src="/external/vector7051-a5ow.svg"
                className="refferal-login-vector1"
              />
              <img
                alt="Vector7051"
                src="/external/vector7051-mf1.svg"
                className="refferal-login-vector2"
              />
              <img
                alt="Vector7051"
                src="/external/vector7051-znrh.svg"
                className="refferal-login-vector3"
              />
              <img
                alt="Vector7051"
                src="/external/vector7051-h0lf.svg"
                className="refferal-login-vector4"
              />
              <img
                alt="Vector7051"
                src="/external/vector7051-cfur.svg"
                className="refferal-login-vector5"
              />
              <img
                alt="Vector7051"
                src="/external/vector7051-6fz.svg"
                className="refferal-login-vector6"
              />
            </div>
          </div>
        </div>
        <div className="refferal-login-refferal11">
          <div className="refferal-login-refferal259">
            <div className="refferal-login-refferal107">
              <span className="refferal-login-text04 24Medium">
                <span>Enter a referral code</span>
              </span>
              <span className="refferal-login-text06 16Light">
                <span>This step is optional</span>
              </span>
            </div>
            <div className="refferal-login-refferal106">
              <div className="refferal-login-refferal10">
                <span className="refferal-login-text08 14Medium">
                <input
                  type="text"
                  className="refferal-login-refferal10 "
                  value={referralCode}
                  onChange={handleInputChange}
                  placeholder="XX-XXXXXXXX"
                />
                {error && <div className="refferal-login-error">{error}</div>}    
                            </span>
                            <div className={`refferal-login-buttons ${error ? 'mb-3' : 'mt-2'}`} style={{display: "flex", justifyContent: "space-between"}}>
                  <button className="xl:block hidden bg-[green] text-white font-HelveticaNeueMedium ${  py-2 px-4 rounded"onClick={handleSubmit}>Submit </button>
                  <button className="xl:block hidden ml-2 bg-[#7487FF] text-white font-HelveticaNeueMedium ${  py-2 px-4 rounded"onClick={handleSkip}>Skip </button>
            </div>
              </div>
            </div>
           
          </div>
          <span className="refferal-login-text10 12Medium">
            <span className="refferal-login-text11">Need help?</span>
            <span> Contact Us</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default RefferaLogin
