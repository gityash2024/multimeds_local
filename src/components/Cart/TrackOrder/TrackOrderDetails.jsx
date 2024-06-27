import React from 'react';
import './TrackOrderDetails.css';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const TrackOrderDetail = () => {
  const { state } = useLocation();
//   const state = {
//     "status": "SUCCESS",
//     "message": "Order fetched successfully",
//     "trackURL": "https://shiprocket.co/tracking/7D103288699",
//     "shipmentActivity": [
//         {
//             "date": "2024-05-13 19:40:58",
//             "status": "DLV",
//             "activity": "Delivered",
//             "location": "MORADABAD BRANCH , MORADABAD"
//         },
//         {
//             "date": "2024-05-13 13:11:49",
//             "status": "OUTDLV",
//             "activity": "Out For Delivery",
//             "location": "MORADABAD BRANCH , MORADABAD"
//         },
//         {
//             "date": "2024-05-13 00:33:49",
//             "status": "PREPERD",
//             "activity": "FDM Prepared",
//             "location": "MORADABAD BRANCH , MORADABAD"
//         },
//         {
//             "date": "2024-05-11 14:16:41",
//             "status": "SVD",
//             "activity": "WRONG PINCODE",
//             "location": ""
//         },
//         {
//             "date": "2024-05-11 09:38:00",
//             "status": "IBMN",
//             "activity": "In Transit",
//             "location": "MORADABAD BRANCH , MORADABAD"
//         },
//         {
//             "date": "2024-05-11 09:38:00",
//             "status": "INSCAN",
//             "activity": "Reached At Destination",
//             "location": "MORADABAD BRANCH , MORADABAD"
//         },
//         {
//             "date": "2024-05-11 07:42:00",
//             "status": "CDIN",
//             "activity": "In Transit",
//             "location": "MORADABAD BRANCH , MORADABAD"
//         },
//         {
//             "date": "2024-05-10 19:23:00",
//             "status": "CDOUT",
//             "activity": "In Transit",
//             "location": "DELHI SAMALKHA APEX , DELHI"
//         },
//         {
//             "date": "2024-05-10 09:44:00",
//             "status": "OBMN",
//             "activity": "In Transit",
//             "location": "DELHI SAMALKHA APEX , DELHI"
//         },
//         {
//             "date": "2024-05-10 08:34:00",
//             "status": "IBMN",
//             "activity": "In Transit",
//             "location": "DELHI SAMALKHA APEX , DELHI"
//         },
//         {
//             "date": "2024-05-10 06:34:00",
//             "status": "CDIN",
//             "activity": "In Transit",
//             "location": "DELHI SAMALKHA APEX , DELHI"
//         },
//         {
//             "date": "2024-05-08 04:51:00",
//             "status": "CDOUT",
//             "activity": "In Transit",
//             "location": "BANGALORE YELAHANKA APEX , BANGALORE"
//         },
//         {
//             "date": "2024-05-07 23:44:00",
//             "status": "CDIN",
//             "activity": "In Transit",
//             "location": "BANGALORE YELAHANKA APEX , BANGALORE"
//         },
//         {
//             "date": "2024-05-07 22:10:00",
//             "status": "CDOUT",
//             "activity": "In Transit",
//             "location": "CHAMRAJPET BRANCH , BANGALORE"
//         },
//         {
//             "date": "2024-05-07 21:55:00",
//             "status": "OBMN",
//             "activity": "In Transit",
//             "location": "CHAMRAJPET BRANCH , BANGALORE"
//         },
//         {
//             "date": "2024-05-07 18:24:57",
//             "status": "BKD",
//             "activity": "Booked",
//             "location": "CHAMRAJPET BRANCH , BANGALORE"
//         },
//         {
//             "date": "2024-05-07 16:53:24",
//             "status": "PCUP",
//             "activity": "Picked Up",
//             "location": "CHAMRAJPET BRANCH , BANGALORE"
//         },
//         {
//             "date": "2024-05-07 10:19:00",
//             "status": "PCRA",
//             "activity": "Pickup Reassigned",
//             "location": "CHAMRAJPET BRANCH , BANGALORE"
//         },
//         {
//             "date": "2024-05-07 09:58:04",
//             "status": "PCAW",
//             "activity": "Pickup Awaited",
//             "location": "CHAMRAJPET BRANCH , BANGALORE"
//         },
//         {
//             "date": "2024-05-07 09:58:04",
//             "status": "PCSC",
//             "activity": "Pickup Scheduled",
//             "location": "CHAMRAJPET BRANCH , BANGALORE"
//         },
//         {
//             "date": "2024-05-07 09:58:03",
//             "status": "SPL",
//             "activity": "Softdata Upload",
//             "location": "CHAMRAJPET BRANCH , BANGALORE"
//         }
//     ]
// };

  const orderDetails = state;

  const downloadInvoice = () => {
    const content = document.getElementById("downloadContent");
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      
      // Add title
      pdf.setFontSize(20);
      pdf.text('Order Invoice', 105, 15, null, null, 'center');
      
      // Add order details
      pdf.setFontSize(12);
      pdf.text(`Shipping Order ID: ${orderDetails.trackURL.split('/').pop()}`, 20, 30);
      pdf.text(`Order Date: 17th September 2023`, 20, 40);
      pdf.text(`Total Items: 59`, 20, 50);
      pdf.text(`Amount Paid: Rs 129`, 20, 60);
      
      // Add tracking URL
      pdf.setTextColor(0, 0, 255);
      pdf.textWithLink('Track Your Order', 20, 70, { url: orderDetails.trackURL });
      pdf.setTextColor(0, 0, 0);
      
      // Add shipment activity
      pdf.setFontSize(14);
      pdf.text('Shipment Activity', 20, 90);
      
      let yPosition = 100;
      orderDetails?.shipmentActivity.slice().reverse().forEach((activity, index) => {
        if (index < 5) { // Limit to last 5 activities to fit on page
          pdf.setFontSize(10);
          pdf.text(`${formatDate(activity.date)} - ${activity.activity}`, 25, yPosition);
          yPosition += 10;
          if (activity.location) {
            pdf.text(`Location: ${activity.location}`, 30, yPosition);
            yPosition += 10;
          }
        }
      });
      
      pdf.save("order-invoice.pdf");
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const today = new Date();

  return (
    <div className="track-detail-container">
      <div id="downloadContent" className="track-detail-frame215">
        <div className="track-detail-header">
          <span className="track-detail-text">Order on the way · Expected to arrive by {formatDate(orderDetails?.shipmentActivity?.[0]?.date)}</span>
          <div className="track-detail-order-info">
            <div className="track-detail-info-item">
              <span className="track-detail-info-label">Shipping Order ID:</span>
              <span className="track-detail-info-value">{orderDetails.trackURL.split('/').pop()}</span>
            </div>
            <div className="track-detail-info-item">
              <span className="track-detail-info-label">Order Date:</span>
              <span className="track-detail-info-value">17th September 2023</span>
            </div>
            <div className="track-detail-info-item">
              <span className="track-detail-info-label">Items:</span>
              <span className="track-detail-info-value">59</span>
            </div>
            <div className="track-detail-info-item">
              <span className="track-detail-info-label">Total:</span>
              <span className="track-detail-info-value">Rs 129 paid</span>
            </div>
          </div>
          <div className="track-detail-actions">
            <button className="track-detail-button" onClick={downloadInvoice}>Download Invoice</button>
            <a href={orderDetails.trackURL} target="_blank" rel="noopener noreferrer" className="track-detail-link">
              Track Your Order
            </a>
          </div>
        </div>
        <div className="track-detail-timeline">
          <h3>Track your order</h3>
          {orderDetails?.shipmentActivity?.slice()?.reverse()?.map((activity, index) => {
            const activityDate = new Date(activity.date);
            const isCompleted = activityDate <= today;
            return (
              <div key={index} className={`track-detail-timeline-item ${isCompleted ? 'completed' : ''}`}>
                <div className="track-detail-timeline-icon">
                  {isCompleted && (
                    <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                </div>
                <div className="track-detail-timeline-content">
                  <h4>{activity?.activity}</h4>
                  <p>{formatDate(activity.date)}</p>
                  {activity?.location && <p>{activity?.location}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TrackOrderDetail;