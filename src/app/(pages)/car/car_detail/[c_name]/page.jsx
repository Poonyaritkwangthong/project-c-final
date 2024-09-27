"use client";
import { UserContext } from '@/app/context/UserContext';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import Link from 'next/link';
import Image from 'next/image'
import Layouts from '@/layouts/LayoutApp';

export default function ViewCarPage() {
  const { user, setUser, token, setToken } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const { c_name } = useParams();


  const [car, setCar,] = useState({}); // เปลี่ยนจาก [] เป็น {}


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (token) {
          await fetchLiked();
        }
        await fetchCar();
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error,
          color: "white",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#005e95",
          background: "rgba(0,0,0,0) linear-gradient(rgba(0, 54, 104, 0.5), rgba(0, 94, 149, 0.5)) repeat scroll 0 0",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [c_name, token]);


  const fetchCar = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cardetail/${c_name}`);
      const data = await response.json();
      if (response.ok) {
        console.log(data.cars);
        setCar(data.cars);
        setLoading(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Something Wrong!"
      });
    }
  }

  const [liked, setLiked] = useState([]);
  const isLiked = liked.some(like => like.user_id === user?.id && like.car_id === car?.id);
  console.log(liked);
  const fetchLiked = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/liked`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLiked(data.liked);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Something Wrong!"
      });
    }
  }



  const Like = async (e, car_id) => {
    e.preventDefault();
    console.log('car_id', car_id);

    try {
      const response = await fetch(`http://localhost:8000/api/likes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ car_id })
      });
      const data = await response.json();
      console.log(user);
      console.log(response);
      console.log(token);
      console.log(data);
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          text: data.message,
        })
        fetchLiked();
      } else if (response.status === 400) {
        Swal.fire({
          icon: 'warning',
          text: data.message,
        })
      } else if (response.status === 500) {
        Swal.fire({
          icon: 'error',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error,
      })
    }
  }

  const unlike = liked.find(like => like.user_id === user?.id && like.car_id === car?.id);
  const deleteLike = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/unlike/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          text: data.message,
        })
        fetchLiked();
      } else if (response.status === 400) {
        Swal.fire({
          icon: 'warning',
          text: data.message,
        })
      } else if (response.status === 500) {
        Swal.fire({
          icon: 'error',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error,
      })
    }
  }

  if (loading) {
    return <div className="relative min-h-dvh">
      <div className="absolute inset-0">
        <Image quality="100"
          layout="fill" src="/image/bmw-m3-e30-by-1920x1080-v0-qfveoku8xez81.jpg" alt="" />
        <img src="https://cdn.dribbble.com/users/3337638/screenshots/9905944/media/377357f6d30eaf173a57290fbb8c25d8.gif" alt="" />
      </div>
    </div>
  }

  return (
    <Layouts>
      <h1 className="text-center text-5xl font-semibold py-8">Car Detail</h1>
      <div className='mt-4'>
        <Link className='flex items-center text-2xl' href="/car"><IoMdArrowBack />Back</Link>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-[6rem] mt-4 border-b-2 border-white bg-cover bg-[url('https://steamcommunity.com/economy/profilebackground/items/1222680/0a4f6b7378b1e0d635158fb9cfd3cc3bde601920.jpg')]">
          <div className="overflow-hidden p-5 flex flex-col gap-4 border border-white">
            <h1 className='text-4xl font-bold'>{car?.c_name}</h1>

            <div className='mt-4 '>
              <h1 className='font-bold text-3xl'>Car Detail </h1>
              <p className="text-2xl text-justify">{car?.c_detail}</p>
            </div>
            {isLiked ? (
              <button onClick={(e) => deleteLike(e, unlike?.id)}><IoMdHeart className='text-red-500 text-4xl mt-2' /></button>
            ) : (
              <button onClick={(e) => Like(e, car?.id)}><CiHeart className='text-red-500 text-4xl mt-2' /></button>
            )}
          </div>

          <div className="overflow-hidden shadow-2xl">
            {car?.c_img ? (
              <img className="objcet-cover h-full w-full drop-shadow-" src={`http://localhost:8000/images/car/${car.c_img}`} alt="" />
            ) : (
              <img className="drop-shadow-md" src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" alt="" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-[6rem] border-b-2 border-white ">
          <div className="overflow-hidden">
            <img className="w-full h-full obeject-cover" src={`http://localhost:8000/images/brand/${car.brand?.b_img}`} alt="" />
          </div>
          <div className='mt-[4rem]'>
            <h1 className='text-4xl'>Brand name : {car?.brand?.b_name}</h1>
            <h1 className='text-3xl'>Brand location : {car?.brand?.b_location}</h1>
            <h1 className='text-2xl'>Founded year : {car?.brand?.founded_year}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-[6rem] border-b-2 border-white bg-cover bg-[url('https://media.contentapi.ea.com/content/dam/need-for-speed/nfs-heat/common/nsfh-section-bg-brand-purple-xl.png.adapt.1920w.png')]">
            <div className='mx-auto mt-[4rem]'>
              <h1 className='text-3xl'>Engine type :{car?.engine?.e_type}</h1>
              <h1 className='text-3xl'>Engine detail</h1>
              <p className='text-3xl'>{car?.engine?.e_detail}</p>
              <h1 className='text-3xl'>Engine HP : {car?.engine?.e_hp}</h1>
            </div>
            <div className='w-[60%]'>
              <img className="w-full " src={`http://localhost:8000/images/engine/${car.engine?.e_img}`} alt="" />
            </div>
        </div>
      </div>
    </Layouts>
  );
}
