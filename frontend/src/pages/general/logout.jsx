import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/style.css';

const Logout = () => {
  const navigate = useNavigate();

   useEffect(() => {
    const logout = async () => {
      await axios.get('http://localhost:3000/api/auth/user/logout', { withCredentials: true });
      localStorage.clear();
      navigate('/register');
    };
    logout();
  }, [navigate]);

  return <div className='logout'>Logging out...</div>;
};

export default Logout;