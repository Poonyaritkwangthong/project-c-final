'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FcCamera } from "react-icons/fc";
import { PiTrashThin } from "react-icons/pi";
import LayoutApp from '@/layouts/LayoutApp';

export default function Car() {

  const [carData, setCarData] = useState([]);
  console.log(carData)
  useEffect(() => {
    fetchCar();
  }, []);

  const fetchCar = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cars`);
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

  const [deleting, setDeleting] = useState(null);
  const handleDelete = async (e, id) => {
    e.preventDefault();
    setDeleting(id);

    try {
      const response = await fetch(`http://localhost:8000/api/cars/` + id, {
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
        setCarData(prev => prev.filter(car => car.id !== id));
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
      
      <div>
        <Link href="/admin">Back</Link>
      </div>
      <Link
        href="/admin/car_table/create"
        className="btn btn-primary">
        Create
      </Link>
      <div className="w-full overflow-x-scroll no-scroll-bar border p-4">
        <table className="w-full">
          <thead className="text-sm text-white uppercase">
            <tr className="text-left border-b ">
              <th >id</th>
              <th >Name</th>
              <th>image</th>
              <th >detail</th>
              <th >brand name</th>
              <th >engine type</th>
              <th className="pl-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {carData.map((car, index) => (
              <tr key={car.id} className="border-b">
                <td>{car.id}</td>
                <td>{car.c_name}</td>
                <td className=""><img className=" w-[22rem] " src={`http://localhost:8000/images/car/${car.c_img}`} alt="" /></td>
                <td className=""><p className=" w-[10rem] truncate">{car.c_detail}</p></td>
                <td>{car.brand.b_name}</td>
                <td>{car.engine.e_type}</td>
                <td className="pl-4">
                  <div className="flex gap-2 items-center">
                    <Link
                      href={`/admin/car_table/edit/${car.id}`}
                      className="btn btn-primary hover:text-[#ff3baa]">
                      Edit
                    </Link>
                    <button onClick={(e) => handleDelete(e, car.id)} className="text-[#FF0080] border-[#FF0080] border bg-white hover:border-white hover:bg-transparent hover:bg-[#FF0080] hover:text-white rounded-full w-[2rem] h-[2rem] flex items-center justify-center">
                      {deleting === car.id ? "กำลังลบ..." : <PiTrashThin size={25} />}
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
