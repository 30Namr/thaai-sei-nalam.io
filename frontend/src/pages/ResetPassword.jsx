import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams(); // token from URL
  const navigate = useNavigate();
  const { backendUrl } = useContext(ShopContext);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
       const res = await axios.post(`${backendUrl}/api/user/reset-password/${token}`, { password });

      if (res.data.success) {
        toast.success("Password has been reset successfully");
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed");
    }
  };
w
  return (
    <form
      onSubmit={handleReset}
      className='w-[90%] sm:max-w-96 m-auto mt-20 flex flex-col gap-4 text-gray-800'
    >
      <h2 className='text-2xl font-medium'>Reset Password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-3 py-2 border border-gray-800"
        placeholder="Enter new password"
        required
      />
      <button className='bg-black text-white py-2'>Reset Password</button>
    </form>
  );
};

export default ResetPassword;
