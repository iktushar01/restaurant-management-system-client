import React from 'react';
import { FaClipboardList, FaUtensils, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

const RestaurantDashboard = () => {
    return (
        <div className="bg-gray-50 p-4">
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500'>
               <div className='flex justify-between items-center'>
                <div>
                 <p className="text-3xl font-bold text-gray-800">12</p>
                 <p className="text-gray-600">In Order</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                    <FaClipboardList className="text-blue-500 text-xl" />
                </div>
               </div>
            </div>
            
            <div className='bg-white p-5 rounded-xl shadow-md border-l-4 border-green-500'>
               <div className='flex justify-between items-center'>
                <div>
                 <p className="text-3xl font-bold text-gray-800">8</p>
                 <p className="text-gray-600">Currently Served</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                    <FaUtensils className="text-green-500 text-xl" />
                </div>
               </div>
            </div>
            
            <div className='bg-white p-5 rounded-xl shadow-md border-l-4 border-red-500'>
               <div className='flex justify-between items-center'>
                <div>
                 <p className="text-3xl font-bold text-gray-800">3</p>
                 <p className="text-gray-600">Cancelled</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                    <FaTimesCircle className="text-red-500 text-xl" />
                </div>
               </div>
            </div>
            
            <div className='bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-500'>
               <div className='flex justify-between items-center'>
                <div>
                 <p className="text-3xl font-bold text-gray-800">15</p>
                 <p className="text-gray-600">Completed</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                    <FaCheckCircle className="text-purple-500 text-xl" />
                </div>
               </div>
            </div>
           </div>
        </div>
    );
};

export default RestaurantDashboard;