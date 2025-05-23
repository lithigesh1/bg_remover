import {assets, plans} from '../assets/assets'

function BuyCredit() {
  return (
    <div className='min-h-[70vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-xl sm:text-2xl md:text-4xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-6 sm:mb-10'>Choose the plan that's right for you</h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div className='bg-white shadow-lg rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-500' key={index}>
            <img width={40} src={assets.logo_icon} alt="logo" />
            <p className='mt-3 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>${item.price}</span>/{item.credits} credits
            </p>
            <button className='w-full bg-gray-900 text-white mt-8 text-sm rounded-md py-2.5 min-w-[208px]'>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyCredit