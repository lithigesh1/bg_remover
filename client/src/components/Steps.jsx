import React from 'react'
import {assets} from '../assets/assets'

function Steps() {
const steps = [
    {
        icon: assets.upload_icon,
        title: "Upload Your Image",
        description: "Select an image from your device to quickly start removing the background. Supported formats: JPG, PNG.",
        bg: "from-blue-100 to-blue-50",
        border: "border-blue-200",
        shadow: "shadow-blue-100"
    },
    {
        icon: assets.remove_bg_icon,
        title: "Remove Image Background",
        description: "Our advanced AI instantly removes the background for you. Easily preview the result before downloading.",
        bg: "from-green-100 to-green-50",
        border: "border-green-200",
        shadow: "shadow-green-100"
    },
    {
        icon: assets.download_icon,
        title: "Download Edited Image",
        description: "Download your new image with a transparent background in high quality and use it anywhere.",
        bg: "from-purple-100 to-purple-50",
        border: "border-purple-200",
        shadow: "shadow-purple-100"
    }
];

return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-20 py-10 md:py-20 xl:py-32'>
        <h1 className='text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent leading-snug'>
            Steps to remove background <br className="hidden sm:block" /> image in seconds
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-16 xl:mt-24 place-items-center'>
            {steps.map((step, idx) => (
                <div
                    key={idx}
                    className={`flex flex-col items-center gap-3 sm:gap-4 bg-gradient-to-br ${step.bg} border ${step.border} ${step.shadow} drop-shadow-lg p-6 sm:p-8 pb-10 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-500 w-full max-w-xs`}
                >
                    <div className="bg-white rounded-full p-3 sm:p-4 shadow-md mb-2">
                        <img className='w-8 h-8 sm:w-10 sm:h-10' src={step.icon} alt="" />
                    </div>
                    <p className='text-lg sm:text-xl font-semibold text-gray-800 text-center'>{step.title}</p>
                    <p className='text-sm text-neutral-600 text-center'>{step.description}</p>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Steps