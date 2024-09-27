"use client";

import React, { useEffect, useState } from 'react'

export default function Content() {
    const [carData, setCarData] = useState([]);
    console.log(carData)
    useEffect(() => {
        fetchCar();
    }, []);
    useEffect(() => {
        fetchCar();
    },);

    const fetchCar = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/carshow`);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setCarData(data.cars);
                console.log(data.cars);
            }
            console.log(response.cars);
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error,
            }, 500);
        }
    }
    return (
        <div>
            <div>
                <h1 className='mt-4 text-4xl text-center font-semibold overline'>Car Is Beautiful</h1>
            </div>
            <div className=''>
                <div className='grid grid-cols-4 gap-6 p-4'>
                    {carData.map((car, index) => (
                        <div key={car.id} className='border p-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mt-6 overflow-hidden '>
                            <div className='h-[15rem]'>
                                <img className='w-full border-2 border-black object-cover h-full' src={`http://localhost:8000/images/car/${car.c_img}`} alt="" />
                            </div>
                            <div className='mt-2 text-white overflow-hidden'>
                                <p className=' font-bold'>{car.c_name}</p>
                                <p className=' text-wrap'>{car.brand.b_name}</p>
                                <p className=''>{car.engine.e_hp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
