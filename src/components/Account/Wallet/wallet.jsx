import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Refresh, WalletOutlined, CancelOutlined } from '@mui/icons-material';

import Loader from '../../loader';
import './wallet.css';

const GET_WALLET_BALANCE = gql`
  query GetWalletBalance {
    getWalletBalance {
      status
      message
      walletBalance
    }
  }
`;

// Dummy transactions data for demonstration
const dummyTransactions = [
  { id: 1, date: '2024-03-01', amount: 100, transactionId: 'xxxxxxxxxxxxxxxxxxx  ', type: 'Deposit' },
  { id: 2, date: '2024-02-28', amount: -50, transactionId: 'xxxxxxxxxxxxxxxxxxx', type: 'Withdrawal' },
];

const Wallet = () => {
  const { loading: balanceLoading, error: balanceError, data: balanceData, refetch: refetchBalance } = useQuery(GET_WALLET_BALANCE);
  const [transactionsData] = useState(dummyTransactions); // Use state with dummy data for now
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState({ startDate: null, endDate: null });

  const walletBalance = balanceData?.getWalletBalance?.walletBalance;
  let transactions = transactionsData;

  const handleRefetchBalance = async () => {
    try {
      setLoading(true);
      await refetchBalance();
      toast.success('Wallet balance updated successfully!');
    } catch (error) {
      toast.error('Failed to update wallet balance!');
    } finally {
      setLoading(false);
    }
  };

  const handleDateFilter = (startDate, endDate) => {
    setDateFilter({ startDate, endDate });
  };

  const resetDateFilter = () => {
    setDateFilter({ startDate: null, endDate: null });
  };

  // Apply local date range filter
  if (dateFilter.startDate && dateFilter.endDate) {
    transactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= dateFilter.startDate && transactionDate <= dateFilter.endDate;
    });
  }

  return (
    <div className="wallet-container">
      <div className="wallet-frame424">
        <span className="wallet-text 18Medium">
          <span></span>
        </span>
        <div className="wallet-frame467">
          <div className="wallet-frame281">
            <div className="wallet-frame474">
              <div className="wallet-money-wallet">
                <div className="wallet-group">
                  <div className="wallet-group1">
                    <WalletOutlined />
                  </div>
                </div>
              </div>
              <span className="wallet-text02 16Medium">
                <span>Wallet Balance</span>
              </span>
              <button onClick={handleRefetchBalance} className="refetch-balance-icon"><Refresh /></button>
            </div>
            <span className="wallet-text04 40Bold">
              <span>Rs. {walletBalance?.toFixed(2)}</span>
            </span>
          </div>
          <div className="wallet-frame2811">
            <div className="wallet-frame295">
              <div className="wallet-frame278">
                <span className="wallet-text06 16Medium">
                  <span>Transaction History</span>
                </span>
              </div>
              <div className="wallet-frame276">
                <span className="wallet-text08 14Regular">
                  <span>Choose Date Range</span>
                </span>
                {/* Date range selector */}
                <input type="date" value={dateFilter.startDate ? dateFilter.startDate.toISOString().split('T')[0] : ''} onChange={(e) => handleDateFilter(new Date(e.target.value), dateFilter.endDate)} />
                <input type="date" value={dateFilter.endDate ? dateFilter.endDate.toISOString().split('T')[0] : ''} onChange={(e) => handleDateFilter(dateFilter.startDate, new Date(e.target.value))} />
                <button onClick={resetDateFilter}><CancelOutlined /></button>
              </div>
            </div>
            <div className="wallet-frame473">
              {transactions?.length > 0 ? (
                transactions.map(transaction => (
                  <div key={transaction.id} className={`wallet-frame380 ${transaction.type === 'Deposit' ? 'green' : 'red'}`}>
                    <span className="wallet-text10 14MediumItalic">{transaction.date}</span>
                    <span className="wallet-text12 14MediumItalic">Rs {transaction.amount}</span>
                    <span className="wallet-text14 14MediumItalic">{transaction.transactionId}</span>
                    <span className="wallet-text16 14MediumItalic">{transaction.type}</span>
                  </div>
                ))
              ) : (
                <div className="wallet-frame380 no-transactions-found" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span className="wallet-text10 14MediumItalic">No Transactions Found</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Wallet;
