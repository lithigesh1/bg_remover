import React from 'react'
import {assets} from '../assets/assets'

function Header() {
    return (
        <div className='flex flex-col-reverse sm:flex-row items-center justify-between gap-y-10 px-4 sm:px-10 xl:px-44 mt-10 sm:mt-20'>
            {/* -----Left Side----- */}
            <div className='w-full sm:w-1/2 text-center sm:text-left'>
                <h1 className='text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>
                    Remove the <br className='hidden md:block' /> <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>background</span> from <br className='hidden md:block' /> images for free.
                </h1>
                <p className='my-6 text-sm sm:text-[15px] text-gray-500'>
                    Remove backgrounds 100% automatically in <br className='hidden sm:block' />5 seconds with one click
                </p>
                <div>
                    <input type="file" name="" id="upload1" hidden />
                    <label htmlFor="upload1" className='inline-flex gap-3 px-6 sm:px-8 py-3 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700'>
                        <img width={20} src={assets.upload_btn_icon} alt="Upload" />
                        <p className='text-white text-sm'>Upload your image</p>
                    </label>
                </div>
            </div>
            {/* -----Right Side----- */}
            <div className='w-full max-w-md'>
                <img src={assets.header_img} alt="" className='w-full' />
            </div>
        </div>
    )
}

export default Header