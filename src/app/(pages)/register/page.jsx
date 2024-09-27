'use client';
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/context/UserContext';
import Link from "next/link";

export default function Register() {
    const { setUser, setToken } = useContext(UserContext);
    const router = useRouter();
    const [field, setField] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const changeFieldHandler = (e) => {
        setField({
            ...field,
            [e.target.name]: e.target.value
        });
    }
    console.log(field);

    const [error, setError] = useState([]);
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/register`, {
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

    return (
        <div className="bg-[url('https://i.redd.it/0uermbt9q8b61.jpg')] min-h-dvh bg-cover flex items-center justify-center">
        <div className='w-[30rem] p-4  bg-[#493240]/50'>
          <h1 className='text-center text-3xl mt-[2rem] text-white'>Register</h1>
          <form action="">

            <div className="flex flex-col gap-4 w-[20rem] mx-auto">
              <div>
                <label htmlFor="name" className="mt-2 block text-sm font-medium leading-6 text-white ">Name</label>
                <input className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]"
                  id="name" placeholder="name" type="name" autocapitalize="none"
                  autocomplete="name" autocorrect="off" name="name"
                  onChange={e => changeFieldHandler(e)}
                />
                {error && error.name && (
                  <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                    {error.name}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="mt-2 block text-sm font-medium leading-6 text-white ">Email</label>
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
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white ">Password</label>
                <div className="relative">
                  <input className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]"
                    id="email" placeholder="password" type="password" autocapitalize="none"
                    autocomplete="password" autocorrect="off" name="password"
                    onChange={e => changeFieldHandler(e)}
                  />
                </div>
                {error && error.password && (
                  <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                    {error.password}
                  </div>
                )}
              </div>
  
              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-white ">Password Confirmation</label>
                <div className="relative">
                  <input className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]"
                    id="email" placeholder="Confirmation Password" type="password" autocapitalize="none"
                    autocomplete="password_confirmation" autocorrect="off" name="password_confirmation"
                    onChange={e => changeFieldHandler(e)}
                  />
                </div>
                {error && error.password_confirmation && (
                  <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                    {error.password_confirmation}
                  </div>
                )}
              </div>
  
              <div className='flex justify-end text-white'>
                <button className='hover:text-[#ff3baa]' type='submit' onClick={e => onSubmitChange(e)}>Register</button>
              </div>
  
            </div>
          </form>
        </div>
      </div>
    )
}
