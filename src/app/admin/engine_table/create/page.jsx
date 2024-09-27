'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import LayoutApp from '@/layouts/LayoutApp';
import { Button } from '@/app/components/button';
import { IoSaveOutline } from "react-icons/io5";

export default function CreateCarPage() {
  const [engineField, setEngineField] = useState({
    e_type: '',
    e_detail: '',
    e_hp: '',
    e_img: '',
  });

  const [engineImage, setEngineImage] = useState(null);

  const [error, setError] = useState([]);
  const router = useRouter();

  const changeEngineFieldHandler = (e) => {
    setEngineField({
      ...engineField,
      [e.target.name]: e.target.value
    });
  }
  console.log(engineField.e_type)
  console.log(engineField.e_detail)
  console.log(engineField.e_hp)
  console.log(engineField.e_img)
  console.log(engineImage)

  const ImageUpload = () => {
    document.getElementById('image').click();
  };

  const onfilechangeimage = (e) => {
    const file = e.target.files[0];
    setEngineField(prev => (
      {
        ...prev,
        e_img: file,
      }
    ));
  }

  const onSubmitChange = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('e_type', engineField.e_type);
    formData.append('e_detail', engineField.e_detail); // รูปภาพจะถูกส่งใน FormData
    formData.append('e_hp', engineField.e_hp);
    formData.append('e_img', engineField.e_img);

    try {
      const response = await fetch(`http://localhost:8000/api/engines`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        router.push('/admin/engine_table/index');
      } else if (data.status === 422) {
        setError(data.errors);
        console.log(data.errors);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Something went wrong!"
      });
    }
  }

  return (
    <div className="w-[30%] mx-auto p-4 border my-4 rounded-lg">
      <h1 className="text-2xl my-8">Add New Engine</h1>
      <div>
        <form>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-white"> Engine Type:</label>
              <input type="text" className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]" placeholder="Enter Engine Type" name="e_type"
                value={engineField.e_type} onChange={e => changeEngineFieldHandler(e)} />
              {error && error.e_type && (
                <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                  {error.e_type}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-white"> Engine Detail:</label>
              <input type="text" className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]" placeholder="Enter EngEngine HP" name="e_detail"
                value={engineField.e_detail} onChange={e => changeEngineFieldHandler(e)} />
              {error && error.e_detail && (
                <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                  {error.e_detail}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-white"> Engine HP:</label>
              <input type="text" className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg bg-transparent px-4 py-3 text-sm font-medium border-2 placeholder-white focus:outline-none focus:border-[#ff3baa] focus:ring-1 focus:ring-[#ff3baa]" placeholder="Enter Engine HP" name="e_hp"
                onChange={e => changeEngineFieldHandler(e)} />
            </div>

            <div className="mb-5 flex justify-center flex-col">
              <label htmlFor="e_img" className="block text-sm font-medium text-white">
                Brand Image
              </label>
              <div className='w-full h-full object-cover' onClick={ImageUpload}>
                {engineField.e_img ? (
                  <img className="w-full h-full object-cover" src={URL.createObjectURL(engineField.e_img)} alt="" />
                ) : (
                  <img className="w-full h-full object-cover" src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' alt='No Image' />
                )}
              </div>
              <button type="button" className="border rounded py-2 hover:underline" onClick={ImageUpload}>Upload Image</button>
              <input
                name='e_img'
                id='image'
                hidden
                type="file"
                className="input input-bordered input-primary w-full max-w- text-black p-2"
                placeholder="Brand Image"
                onChange={onfilechangeimage}
              />
              {error && error.e_img && (
                <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#ff3baa] outline outline-offset-2 outline-1 outline-[#ff3baa] px-2 text-sm`}>
                  {error.e_emg}
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
    </div>
  );
};


