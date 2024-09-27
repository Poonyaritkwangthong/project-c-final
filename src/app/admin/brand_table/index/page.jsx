'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { PiTrashThin } from "react-icons/pi";
import LayoutApp from '@/layouts/LayoutApp';
import { Button } from '@/app/components/button';

export default function Brand() {

  const [brandData, setBrandData] = useState([]);
  console.log(brandData)
  useEffect(() => {
    fetchBrand();
  }, []);

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

  const [deleting, setDeleting] = useState(null);
  const handleDelete = async (e, id) => {
    e.preventDefault();
    setDeleting(id);

    try {
      const response = await fetch(`http://localhost:8000/api/brands/` + id, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: data.message,
          color: "white",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#005e95",
          background: "rgba(0,0,0,0) linear-gradient(rgba(0, 54, 104, 0.5), rgba(0, 94, 149, 0.5)) repeat scroll 0 0",
        });
        setBrandData(prev => prev.filter(brand => brand.id !== id));
        setDeleting(null);
      } else if (data.status === 400) {
        Swal.fire({
          icon: "warning",
          text: data.message,
          color: "white",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#005e95",
          background: "rgba(0,0,0,0) linear-gradient(rgba(0, 54, 104, 0.5), rgba(0, 94, 149, 0.5)) repeat scroll 0 0",
        });
        setDeleting(null);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "มีข้อผิดพลาดกับดึงข้อมูล",
        color: "white",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#005e95",
        background: "rgba(0,0,0,0) linear-gradient(rgba(0, 54, 104, 0.5), rgba(0, 94, 149, 0.5)) repeat scroll 0 0",
      });
    }
  }

  return (
    <div className="w-[80%] mx-auto">
      <div className="mb-4">
        <Link href="/admin">
          <Button name="Back" />
        </Link>
      </div>
      <Link href="/admin/brand_table/create" className="btn btn-primary"><Button name="Create" /></Link>
      <div className="w-full overflow-x-scroll no-scroll-bar border p-4">
        <table className="w-full">
          <thead className="text-sm text-white uppercase">
            <tr className="text-left border-b">
              <th className="">id</th>
              <th className="">brand name</th>
              <th className="">brand image</th>
              <th className="">brand location</th>
              <th className="">founded year</th>
              <th className="pl-4">action</th>
            </tr>
          </thead>
          <tbody>
            {brandData.map((brand, index) => (
              <tr key={brand.id} className='border-b'>
                <td className="">{brand.id}</td>
                <td className="">{brand.b_name}</td>
                <td className=""><img className="w-[10rem] " src={`http://localhost:8000/images/brand/${brand.b_img}`} alt="" /></td>
                <td className="">{brand.b_location}</td>
                <td className="">{brand.founded_year}</td>
                <td className="pl-4">
                  <div className="flex  gap-1 items-center ">
                    <Link
                      href={`/admin/brand_table/edit/${brand.id}`}
                      className="btn btn-primary hover:text-[#ff3baa]">
                      Edit
                    </Link>
                    <button onClick={(e) => handleDelete(e, brand.id)} className="text-[#FF0080] border-[#FF0080] border bg-white hover:border-white hover:bg-transparent hover:bg-[#FF0080] hover:text-white rounded-full w-[2rem] h-[2rem] flex items-center justify-center">
                      {deleting === brand.id ? "กำลังลบ..." : <PiTrashThin size={25} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
