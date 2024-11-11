import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-100">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col items-center justify-center">
        <img src={assets.header_img} alt="Team Photo" className="rounded-full w-64 h-64 mb-4"/>
        <p className="text-lg text-gray-700">
          We are dedicated to providing exceptional healthcare services to our patients. Our team of experienced professionals is committed to your well-being.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
        <p className="text-lg text-gray-700">
          To provide compassionate, high-quality healthcare to our community.
        </p>

        <h3 className="text-2xl font-bold mb-4">Our Values</h3>
        <ul className="list-disc list-inside">
          <li>Compassion</li>
          <li>Integrity</li>
          <li>Innovation</li>
        </ul>
      </div>
    </div>
  </div>
</section>
  )
}

export default About
