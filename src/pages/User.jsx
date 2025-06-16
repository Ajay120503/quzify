import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import p1 from "../assets/images/p1.png";
import toast from 'react-hot-toast';

const User = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const categoryName = location.state?.categoryName;

  const isValidName = /^[a-zA-Z\s]+$/.test(name.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && isValidName) {
      localStorage.setItem('quiz-user-name', name);
      navigate('/Quiz', { state: { name, categoryName } });
      toast.success(`Welcome ${name}! Starting your ${categoryName} quiz...`);
    } else {
      toast.error('Please enter a valid name (letters and spaces only)');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="bg-base-100 p-6 rounded-2xl shadow-xl w-full max-w-3xl flex flex-col md:flex-row gap-6 border border-base-300">
        <div className="relative flex flex-col items-center justify-center gap-2 md:flex-1">
          <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-base-300 flex items-center justify-center">
            <img src={p1} alt="Illustration" className="object-cover w-full h-full" />
            <h1 className="absolute text-2xl md:text-3xl font-bold text-base-content drop-shadow-lg text-center">{categoryName}</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 justify-center">
          <input type="text" placeholder="Enter your name" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit" className={`btn w-full ${isValidName ? 'btn-primary' : 'btn-warning'}`}>
            Start Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default User;
