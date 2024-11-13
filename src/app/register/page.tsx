"use client"

import React from "react";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../services/auth';

const RegisterPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await registerUser({ name, email, password });
      router.push('/login'); // Redireciona para a página de login
    } catch (err) {
      setError('Erro ao registrar usuário');
    }
  };

  return (
    <div className="w-full bg-gray-100 flex items-center p-20">
    <div className="w-full flex justify-center rounded-sm bg-white min-h-10 overflow-hidden">
      <div className="flex flex-1 flex-col gap-20 p-10 bg-gradient-to-b from-red-50/50 to-red-200/50">
        <h1 className="text-red-800 text-3xl">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-16">
        <input
            className="rounded-none border-b border-gray-300 p-5 lg:w-1/2"
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="rounded-none border-b border-gray-300 p-5 lg:w-1/2"
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="rounded-none border-b border-gray-300 p-5 lg:w-1/2"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="p-2 rounded-sm bg-red-800 text-white lg:w-1/4 md:w-1/3 sm:w-1/3">Register</button>
          <span className="text-red-800">Do you have an account?</span>
          <button className="w-1/2 text-red-800 p-2 rounded-sm bg-white lg:w-1/4 md:w-1/3 sm:w-1/3"><Link href="/login">Sign In</Link></button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default RegisterPage;