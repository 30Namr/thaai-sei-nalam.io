import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const ForgetPassword = () => {
  const { backendUrl } = useContext(ShopContext);

  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!email || !securityAnswer || !newPassword || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
    const url = `${backendUrl}/api/user/recover-password`;
    const payload = { email, securityAnswer, newPassword };
    const res = await axios.post(url, payload);

      if (res.data.success) {
        toast.success(res.data.message || 'Password reset successful!');
        setEmail('');
        setSecurityAnswer('');
        setNewPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        toast.error(res.data.message || 'Password reset failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Password reset failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-md shadow-md text-gray-800">
      <h2 className="text-3xl font-semibold mb-6 text-center">Reset Password</h2>

      <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-4 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <input
          type="text"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
          placeholder="What is your favorite food?"
          className="px-4 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="px-4 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="px-4 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;