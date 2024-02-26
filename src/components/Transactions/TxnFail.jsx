import React from 'react'
import './TxnFail.css'
const TxnFail = (props) => {
  return (
    <div className="txn-fail-container">
    
      <div className="txn-fail-frame332">
        <div className="txn-fail-frame383">
          <div className="txn-fail-frame413">
            <div className="txn-fail-interface-essential-delete-disabled">
              <div className="txn-fail-group">
                <div className="txn-fail-group1">
                  <img
                    alt="PathI318"
                    src="https://play.teleporthq.io/static/svg/default-img.svg"
                    className="txn-fail-path"
                  />
                  <img
                    alt="PathI318"
                    src="https://play.teleporthq.io/static/svg/default-img.svg"
                    className="txn-fail-path1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="txn-fail-frame407">
            <span className="txn-fail-text 14Medium">
              <span>Transaction failed</span>
            </span>
            <span className="txn-fail-text2 14Regular">
              <span>
                There was an error and your transaction did not go through!
              </span>
            </span>
          </div>
          <div className="txn-fail-frame12">
            <span className="txn-fail-text4 16Medium">
              <span>Retry payment</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TxnFail
