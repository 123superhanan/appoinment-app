import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {


  return (

    <>
      <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        {/* ---------- left side --------------- */}
        <div>
          <img src={assets.logo} alt="" />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
        </div>






        {/* ------------ --------center------- --------------- */}
        <div>
          <p>COMPANY</p>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>







        {/* ------------ right side --------------- */}
        <div>
<p>GET IN TOUCH</p>
<ul>
  <li>+0-000-000-000</li>
  <li>greatstackdev@gmail.com</li>
</ul>
        </div>


        {/* -- end game -- */}
        <div>
          <hr />
          <p>Copyright 2024 @ Greatstack.dev - All Right Reserved.</p>
        </div>

        </div>
      </div>
    </>
  )
}

export default Footer
