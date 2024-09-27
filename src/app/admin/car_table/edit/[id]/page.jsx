
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import LayoutApp from '@/layouts/LayoutApp';
import { Button } from '@/app/components/button';

export default function EditCarPage() {
    const { id } = useParams();
    console.log(id);

    const router = useRouter();
    const [carField, setCarField] = useState({
        c_name: "",
        c_img: "",
        c_detail: "",
        c_engine_id: "",
        c_brand_id: "",
    });
    console.log(id)
    console.log(carField.c_name)
    console.log(carField.c_img)
    console.log(carField.c_detail)
    console.log(carField.c_engine_id)
    console.log(carField.c_brand_id)

    useEffect(() => {
        fetchCar();
        fetchBrand();
        fetchEngine();
    }, [id]);

    const fetchCar = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/cars/${id}`);
            const data = await response.json();
            if (response.ok) {
                console.log(data.cars);
                setCarField(data.cars);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something Wrong!"
            });
        }
    }

    const [engineData, setEngineData] = useState([]);
    const fetchEngine = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/engines`);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setEngineData(data.engines);
                console.log(data.engines);
            }
            console.log(response.engines);
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error,
            });

        }
    }

    const [brandData, setBrandData] = useState([]);
    console.log(brandData)


    const fetchBrand = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/brands`);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setBrandData(data.brands);
                console.log(data.brands);
            }
            console.log(response.brands);
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error,
            });
        }
    }

    const [newImage, setNewImage] = useState(null);

    const changeCarFieldHandler = (e) => {
        setCarField({
            ...carField,
            [e.target.name]: e.target.value
        });
    }

    const ImageUpload = () => {
        document.getElementById('image').click();
    };

    const onfilechangeimage = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
        setCarField(prev => (
            {
                ...prev,
                c_img: file,
            }
        ));
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('c_name', carField.c_name);
        if (carField.c_img) {
            formData.append('c_img', carField.c_img); // รูปภาพจะถูกส่งใน FormData
        }
        formData.append('c_detail', carField.c_detail);
        formData.append('c_engine_id', carField.c_engine_id);
        formData.append('c_brand_id', carField.c_brand_id);

        try {
            const response = await fetch(`http://localhost:8000/api/cars/${id}`, {
                method: 'POST',
                body: formData // แปลงข้อมูล roleField ให้เป็น JSON
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    text: data.message,
                }, 200);
                router.push('/admin/car_table/index')
            } else if (data.stetus === 422) {
                setError(data.errors);
                console.log(data.errors)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something Wrong!"
            }, 500);
        }
    }

    const [error, setError] = useState([]);

    return (
        <div className="w-[30%] mx-auto p-4 border my-4 rounded-lg">
            <h1 className="text-2xl my-8">Edit Car Car</h1>
            <form>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="c_name" className="block text-sm font-medium text-white">
                            Car Name
                        </label>
                        <input
                            type="text"
                            name="c_name"
                            id="c_name"
                            value={carField.c_name}
                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]"
                            placeholder="Car Name..."
                            onChange={e => changeCarFieldHandler(e)}
                        />
                        {error && error.c_name && (
                            <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                                {error.c_name}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center flex-col gap-2">
                        <label htmlFor="c_img" className="block text-sm font-medium text-white">
                            Car Image
                        </label>
                        <div className='relative overflow-hidden mx-auto h-[14rem] rounded-lg' onClick={ImageUpload}>
                            <div className="absolute inset-0 hover:bg/black/40" />
                            {newImage ? (
                                <img className=' w-full h-full object-cover' src={URL.createObjectURL(newImage)} alt="" />
                            ) : carField.c_img ? (
                                <img className=" w-full h-full object-cover" src={`http://localhost:8000/images/car/${carField.c_img}`} alt="" />
                            ) : (
                                <img className=" w-full h-full object-cover" src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' alt='No Image' />
                            )}
                        </div>
                        <button type="button" className="border rounded py-2 hover:underline" onClick={ImageUpload}>Upload Image</button>
                        <input
                            name='c_img'
                            id='image'
                            hidden
                            type="file"
                            className="input input-bordered input-primary w-full max-w- text-black p-2"
                            placeholder="Car Image"
                            onChange={onfilechangeimage}
                        />
                        {error && error.c_img && (
                            <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                                {error.c_img}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="c_detail" className="block text-sm font-medium text-white">
                            Car detail
                        </label>
                        <textarea
                            type="text"
                            name="c_detail"
                            id="c_detail"
                            value={carField.c_detail}
                            className="mr-2.5 mb-2 h-[10rem] min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]"
                            placeholder="Car detail"
                            onChange={e => changeCarFieldHandler(e)}
                        />
                        {error && error.c_detail && (
                            <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                                {error.c_detail}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="c_engine_id" className="block text-sm font-medium text-white">
                            Engine type
                        </label>
                        <select name="c_engine_id" className='text-black min-h-[30px] text-center' onChange={e => changeCarFieldHandler(e)}>
                            <option> --เลือกเครื่องยนต์-- </option>
                            {engineData.length > 0 ? (
                                engineData.map((engine) => (
                                    <option key={engine.id} value={engine.id} selected={Number(engine.id) === Number(carField.c_engine_id)}>{engine.e_type}</option>
                                ))
                            ) : (
                                <option>--ไม่มีเครื่องยนต์--</option>
                            )}
                        </select>
                        {error && error.c_engine_id && (
                            <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                                {error.c_engine_id}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="c_brand_id" className="block text-sm font-medium text-white">
                            Car Brand Id
                        </label>
                        <select name="c_brand_id" className='text-black min-h-[30px] text-center' onChange={e => changeCarFieldHandler(e)}>
                            <option> --เลือกเเบรนด์-- </option>
                            {brandData.length > 0 ? (
                                brandData.map((brand) => (
                                    <option key={brand.id} value={brand.id} selected={Number(brand.id) === Number(carField.c_brand_id)}>{brand.b_name}</option>
                                ))
                            ) : (
                                <option>--ไม่มีเเบรนด์--</option>
                            )}
                        </select>
                        {error && error.c_brand_id && (
                            <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                                {error.c_brand_id}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="flex items-center justify-center gap-4 border py-2 rounded" onClick={e => onSubmitChange(e)}>
                        บันทึก
                        <IoSaveOutline size={30} />
                    </button>
                </div>

            </form>
        </div>
    );
}
