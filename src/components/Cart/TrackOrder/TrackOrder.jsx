import React from 'react'
import './TrackOrder.css'
import { useNavigate } from 'react-router-dom'

const TrackOrder = (props) => {
  const navigate=useNavigate()
  return (
    <div className="track-order-container">
     
      <div className="track-order-frame215">
        <div className="track-order-frame424">
          <div className="track-order-frame510">
            <span className="track-order-text 24Bold">
              <span>Track your order</span>
            </span>
          </div>
          <div className="track-order-frame259">
            <div className="track-order-frame107">
              <span className="track-order-text02 20Medium">
                <span>Enter your Order ID</span>
              </span>
              <span className="track-order-text04 16Light">
                <span>You can track your order by entering your order ID</span>
              </span>
            </div>
            <div className="track-order-frame106">
              <div className="track-order-frame10">
                <span className="track-order-text06 14Medium">
                  <span>XX-XXXXXXXX</span>
                </span>
              </div>
              <div  onClick={()=>{navigate("/track-order/details/hiwdjo")}} style={{cursor:"pointer"}} className="track-order-frame12">
                <span className="track-order-text08 16Medium" >
                  <span>TRACK ORDER</span>
                </span>
              </div>
              <span className="track-order-text10 14Medium">
                <span className="track-order-text11">Need help?</span>
                <span> Contact Us</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackOrder
