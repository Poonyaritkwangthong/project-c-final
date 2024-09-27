'use client';
import React, { useState, useContext } from 'react'
import Link from "next/link";
import Swal from 'sweetalert2';
import { IconBase } from 'react-icons';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/context/UserContext';
import { PiArrowFatLinesRightThin, PiEyeSlashThin, PiEyeThin } from "react-icons/pi";


export default function Login() {
  const { setUser, setToken } = useContext(UserContext);
  const router = useRouter();
  const [error, setError] = useState([]);
  const [field, setField] = useState({
    email: "",
    password: "",
  });

  const changeFieldHandler = (e) => {
    setField({
      ...field,
      [e.target.name]: e.target.value
    });
  }
  console.log(field);
  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(field),
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          text: data.message,
        });
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user_name', data.user.name);
        setUser(data.user);
        setToken(data.token);
        router.push('/');
      } else if (response.status === 422) {
        setError(data.errors);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error
      });
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="bg-[url('https://i.redd.it/0uermbt9q8b61.jpg')] min-h-dvh bg-cover flex items-center justify-center">
      <div className='w-[30rem] p-4  bg-[#493240]/50'>
        <h1 className='text-center text-3xl mt-[2rem] text-white'>Login</h1>
        <form action="">
          <div className="flex flex-col gap-4 w-[20rem] mx-auto">
            <div>
              <label htmlFor="email" className="mt-2 block text-sm font-medium leading-6 text-white ">email</label>
              <input className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]"
                id="email" placeholder="email" type="email" autocapitalize="none"
                autocomplete="email" autocorrect="off" name="email"
                onChange={e => changeFieldHandler(e)}
              />
              {error && error.email && (
                <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                  {error.email}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white ">password</label>
              <div className="relative">
                <input className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]"
                  id="email" placeholder="password" type={showPassword ? "text" : "password"} autocapitalize="none"
                  autocomplete="password" autocorrect="off" name="password"
                  onChange={e => changeFieldHandler(e)}
                />
                <button type="button" onClick={toggleShowPassword} className="absolute top-3 right-3">
                  {showPassword ? <PiEyeThin size={20} /> : <PiEyeSlashThin size={20} />}
                </button>
              </div>
              {error && error.password && (
                <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                  {error.password}
                </div>
              )}
            </div>

            <div className='flex justify-between text-white'>
              <Link className='hover:text-[#ff3baa]' href="/register">register</Link>
              <button className='hover:text-[#ff3baa]' type='submit' onClick={e => onSubmitChange(e)}>login</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
