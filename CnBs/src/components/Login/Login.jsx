import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://creamnbeans-repo-server.vercel.app/login", {username, password}).then(result=>{
        if(result.data.Status){
            navigate("/orders")
        }
        else{
            setError(`${result.data.Result}`)
        }
        
    }).catch( error =>{
        console.log(error)
        setError("An error occurred during login.");
    })
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-80 p-6 bg-white rounded shadow">
        <h2 className="text-3xl mb-4 text-center">Login</h2>
        <div className='text-red-500 my-5'>{error}</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded hover:shadow-lg"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;