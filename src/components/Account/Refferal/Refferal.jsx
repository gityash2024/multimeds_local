import React, { useEffect, useState } from 'react';
import './refferal.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Referrals = () => {

const parseDate = (dateStr) => {
  const [month, day, year] = dateStr.match(/\d+|\D+/g); // This regex splits the string into ['13th', 'October', '2023']
  return new Date(`${day.trim()} ${month} ${year}`); // Create a new date object with format "13 October 2023"
};

  const [referralCode] = useState('FsRIEpwpsLS');
  const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);

  const [referrals, setReferrals] = useState([
    { code: 'FsRIEpwpsLS', expiry: '13th October 2023', status: 'Active' },
    { code: 'FsRIEpwpsLS', expiry: '13th Aug 2023', status: 'Expired' },
  ]);

  const handleCopyLink = (code) => {
    navigator.clipboard.writeText(code).then(
      () => alert('Copied!'),
      () => alert('Failed to copy!')
    );
  };

  const handleRegenerateLink = () => {
    // Logic to regenerate the referral code
    // This should be replaced with actual logic to generate a new referral code
    alert('Link regenerated!');
  };
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const filteredReferrals = referrals.filter(referral => {
    const expiryDate = parseDate(referral.expiry);
    if (startDate && endDate) {
      return expiryDate >= startDate && expiryDate <= endDate;
    }
    return true;
  });

  return (
    <div className="refferal-container">
      <div className="refferal-refferal">
        <div className="refferal-refferal479">
          <div className="refferal-refferal482">
            <span className="refferal-text 18Medium" style={{ fontWeight: "bold" }}>Referral Code</span>
            <span className="refferal-text02 14RegularItalic">Refer a friend and get 20% off on your next order</span>
          </div>
          <div className="refferal-refferal481">
            <div className="refferal-refferal478">
              <div className="refferal-refferal476">
                <span className="refferal-text04 20Medium">{referralCode}</span>
              </div>
              <div style={{ cursor: "pointer" }} className="refferal-refferal477" onClick={() => handleCopyLink(referralCode)}>
                <span className="refferal-text06 16Medium">Copy Link</span>
              </div>
            </div>
            <div style={{ cursor: "pointer" }} className="refferal-refferal480" onClick={handleRegenerateLink}>
              <span className="refferal-text08 14Medium" style={{ color: "blue" }}>Regenerate Link</span>
            </div>
          </div>
        </div>
        <div className="refferal-refferal281">
          <div className="refferal-refferal295">
            <div className="refferal-refferal278">
              <span className="refferal-text11 16Medium">Active Referrals</span>
            </div>
            <div className="refferal-refferal276">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          isClearable={true}
          placeholderText="Select a date range"
        />
        
      </div>            </div>
          </div>
          <div className="refferal-refferal473">
            {filteredReferrals.map((referral, index) => (
              <div key={index} className="refferal-refferal381" style={{ backgroundColor: index % 2 === 0 ? "rgb(238, 245, 253)" : "none" }}>
                <div >
                  <span className="refferal-text21 14Medium">{referral.code}</span>
                  <span style={{ cursor: "pointer",marginLeft:"10px" }} className="refferal-text23 12Medium" onClick={() => handleCopyLink(referral.code)}>Copy Link</span>
                </div>
                <span className="refferal-text25 14Medium">{referral.expiry}</span>
                <span className="refferal-text27 14Medium">{referral.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Referrals;
