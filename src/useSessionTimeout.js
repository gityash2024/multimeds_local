import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSessionTimeout = (timeout) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const checkTimeout = () => {
      if (Date.now() - lastActivity > timeout) {
        // Clear the token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        
        // Redirect the user to the login page
        navigate('/');
        window.location.reload();
      }
    };

    const timer = setInterval(checkTimeout, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [lastActivity, timeout, navigate]);

  const updateLastActivity = () => {
    setLastActivity(Date.now());
  };

  return { updateLastActivity };
};

export default useSessionTimeout;