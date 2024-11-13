/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../services/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const user = await loginUser({ email, password });

      if (user) {
        router.push('/');
      }
    } catch (err) {
      setError('Credenciais inválidas');
      setEmail('');
      setPassword('');
    }
  };

  const loginHandler = async () => {
    const response = await fetch("/api/login", { 
      method: "POST", 
      body: JSON.stringify({ email, password }) 
    });
  
    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
    }
  };
  
  return (
    <div className="w-full bg-gray-100 flex items-center p-20">
      <div className="w-full flex justify-center rounded-sm bg-white min-h-10 overflow-hidden">
        <div className="flex flex-1 flex-col gap-20 p-10 bg-gradient-to-b from-red-50/50 to-red-200/50">
          <h1 className="text-red-800 text-3xl">Login</h1>
          {error && <p className="text-red-600">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-16">
            <input
              className="rounded-none border-b border-gray-300 p-5 lg:w-1/2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="rounded-none border-b border-gray-300 p-5 lg:w-1/2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="p-2 rounded-sm bg-red-800 text-white lg:w-1/4 md:w-1/3 sm:w-1/3" type="submit" onSubmit={loginHandler}>Login</button>
            <span className="text-red-800">Don’t you have an account?</span>
            <button className="w-1/2 text-red-800 p-2 rounded-sm bg-white lg:w-1/4 md:w-1/3 sm:w-1/3">
              <Link href="/register">Sign Up</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
function setUser(_userData: unknown) {
  throw new Error("Function not implemented.");
}

