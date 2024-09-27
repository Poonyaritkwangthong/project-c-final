'use client';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Appbar from '../../components/appbar';
import Link from "next/link";
import Image from 'next/image'
import LayoutApp from '@/layouts/LayoutApp';

export default function page() {

    const [carData, setCarData] = useState([]);

    const [loading, setLoading] = useState(true);

    console.log(carData)
    useEffect(() => {
        fetchCar();
    }, []);

    const fetchCar = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/carall`);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setCarData(data.cars);
                console.log(data.cars);
                setLoading(false);
            }
            console.log(response.cars);
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error,
            }, 500);
        }
    }

    if (loading) {
        return <div className="relative min-h-dvh">
            <div className="absolute inset-0">
                <Image quality="100"
                    layout="fill" src="/image/bmw-m3-e30-by-1920x1080-v0-qfveoku8xez81.jpg" alt="" />
                <span>กำลังโหลด...</span>
            </div>
        </div>
    }

    return (
        <LayoutApp>
            <Appbar />
            <div>
                <h1 className='mt-4 text-6xl text-center font-semibold '>Car</h1>
            </div>
            <div className="grid grid-cols-4 gap-6 p-4">
                {carData.map((car, index) => (
                    <div key={car.id} className='border p-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mt-6 overflow-hidden '>
                        <div className='h-[15rem]'>
                            <img className='w-full  object-cover h-full' src={`http://localhost:8000/images/car/${car.c_img}`} alt="" />
                        </div>
                        <div className='mt-2 text-white overflow-hidden'>
                            <p className=' font-bold'>{car.c_name}</p>
                            <p className=' text-wrap'>{car.brand.b_name}</p>
                            <p className=''>{car.engine.e_hp}</p>
                            <div className=' text-white  flex justify-end mt-2'>
                                <Link className='font-bold  hover:bg-[#FF0080] hover:bg-transparent flex p-2 transition delay-150 ease-in-outhover:-translate-y-1 hover:scale-110 duration-300 border border-white' href={`/car/car_detail/${car.c_name}`}>read more<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </LayoutApp>
    )
}
