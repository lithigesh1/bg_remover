import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import BgSlider from '../components/BgSlider'
import Testimonial from '../components/Testimonial'

function home() {
  return (
    <div>
      <Header/>
      <Steps/>
      <BgSlider/>
      <Testimonial/>
    </div>
  )
}

export default home