import React from 'react'

const BanckDetails = () => {
  return (
      <div className=" rounded-md w-full lg:max-w-[900x]p lg:ml-1 mr-0 mb-5 overflow-hidden">
      <div className="flex w-[600px]  justify-start  ">
     
        <div className="py-2 px-7 mr-8 font-bold rounded-2xl bg-emerald-700 text-white">Active</div>
        <div className="py-2 px-10 font-bold ml-2 rounded-2xl bg-white text-black">Deleted</div>

      </div>
      <div className='bg-emerald-700 mt-2 pl-5 text-sm text-white py-2 rounded-xl text-center'>Add New Banck</div>
      <div className='font-normal'>Banck Details</div>
      <div className="mt-8 pl-10 pr-10  text-[12px] text-center">No Bank Details found! Adding Bank Details is mandatory for processing withdrawals</div>
    </div>
  )
}

export default BanckDetails
