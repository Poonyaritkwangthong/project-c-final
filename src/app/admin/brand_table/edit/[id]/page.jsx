
'use client';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import LayoutApp from '@/layouts/LayoutApp';
import { Button } from '@/app/components/button';
import { IoSaveOutline } from "react-icons/io5";


export default function EditCarPage() {
    const { id } = useParams();
    console.log(id);

    const router = useRouter();
    const [brandField, setBrandField] = useState({
        b_name: '',
        b_img: '',
        b_location: '',
        founded_year: '',
    });
    console.log(id)
    console.log(brandField.b_name)
    console.log(brandField.b_img)
    console.log(brandField.b_location)
    console.log(brandField.founded_year)


    useEffect(() => {
        fetchBrand();
    }, [id]);

    const fetchBrand = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/brands/${id}`);
            const data = await response.json();
            if (response.ok) {
                console.log(data.brands);
                setBrandField(data.brands);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something Wrong!"
            });
        }
    }

    const [newImage, setNewImage] = useState(null);

    const changeBrandFieldHandler = (e) => {
        setBrandField({
            ...brandField,
            [e.target.name]: e.target.value
        });
    }

    const ImageUpload = () => {
        document.getElementById('image').click();
    };

    const onfilechangeimage = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
        setBrandField(prev => (
            {
                ...prev,
                b_img: file,
            }
        ));
    }

    const [error, setError] = useState([]);
    
    const onSubmitChange = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('b_name', brandField.b_name);
        formData.append('b_img', brandField.b_img); // รูปภาพจะถูกส่งใน FormData
        formData.append('b_location', brandField.b_location);
        formData.append('founded_year', brandField.founded_year);

        try {
            const response = await fetch(`http://localhost:8000/api/brands/${id}`, {
                method: 'POST',
                body: formData // แปลงข้อมูล roleField ให้เป็น JSON
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    text: data.message,
                });
                router.push('/admin/brand_table/index')
            } else if (data.stetus === 422) {
                setError(data.errors);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error,
            });
        }
    }

    return (
        <div className="w-[30%] mx-auto p-4 border my-4 rounded-lg">
            <h1 className="text-2xl my-8">Edit Brand</h1>
            <form>
                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="b_name" className="block text-sm font-medium text-white">
                            Brand Name
                        </label>
                        <input
                            type="text"
                            name="b_name"
                            id="b_name"
                            value={brandField.b_name}
                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]"
                            placeholder="Car Name..."
                            onChange={e => changeBrandFieldHandler(e)}
                        />
                    </div>

                    <div className="mb-5 flex justify-center flex-col gap-2">
                        <label htmlFor="b_img" className="block text-sm font-medium text-white">
                            Brand Image
                        </label>
                        <div className='relative overflow-hidden mx-auto h-[14rem]' onClick={ImageUpload}>
                            {newImage ? (
                                <img className=' w-full h-full object-cover' src={URL.createObjectURL(newImage)} alt="" />
                            ) : brandField.b_img ? (
                                <img className=' w-full h-full object-cover' src={`http://localhost:8000/images/brand/${brandField.b_img}`} alt="" />
                            ) : (
                                <img className=' w-full h-full object-cover' src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' alt='No Image' />
                            )}
                        </div>
                        <button type="button" className="border rounded py-2 hover:underline" onClick={ImageUpload}>Upload Image</button>
                        <input
                            name='b_img'
                            id='image'
                            hidden
                            type="file"
                            className="input input-bordered input-primary w-full max-w- text-black p-2"
                            placeholder="Brand Image"
                            onChange={onfilechangeimage}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="b_location" className="block text-sm font-medium text-white">
                            Brand Location
                        </label>
                        <input
                            type="text"
                            name="b_location"
                            id="b_location"
                            value={brandField.b_location}
                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]"
                            placeholder="Brand Location"
                            onChange={e => changeBrandFieldHandler(e)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="founded_year" className="block text-sm font-medium text-white">
                            Founded Year
                        </label>
                        <input
                            type="date"
                            name="founded_year"
                            id="founded_year"
                            value={brandField.founded_year}
                            className="dark:[color-scheme:dark] text-center text-white mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]"
                            placeholder="Founded Year"
                            onChange={e => changeBrandFieldHandler(e)}
                        />
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
