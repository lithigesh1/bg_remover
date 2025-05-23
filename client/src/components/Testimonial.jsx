import { testimonialsData } from '../assets/assets'

function Testimonial() {
  return (
    <div>
        {/* Title */}
        <h1 className='mb-12 sm:mb-20 text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-5'>Customer Testimonial</h1>
    
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8'>
            {testimonialsData.map((item, index) => (
                <div className='bg-white rounded-xl p-6 drop-shadow max-w-lg m-auto hover:scale-105 transition-all duration-500' key={index}>
                    <p className='text-4xl text-gray-500'>”</p>
                    <p className='text-sm text-gray-500'>{item.text}</p>
                    <div className='flex items-center gap-3 mt-5'>
                        <img className='w-9 rounded-full' src={item.image} alt="dp" />
                        <div>
                            <p>{item.author}</p>
                            <p className='text-sm text-gray-600'>{item.jobTitle}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <h1 className='mb-12 sm:mb-20 text-center text-xl sm:text-2xl md:text-4xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-5 mt-10'>See the magic. Try now</h1>
    
    </div>
  )
}

export default Testimonial