import React from 'react'
import { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: 'M.Hunais Abbasi',
    image:assets.profile_pic,
    email: 'MhunaisAbbasi55@gmail.com',
    phone: "0111122223444",
    address:{
      line1: 'H#112 st#44 bl#2-D',
      line2: 'Nniefoutus Inisiam Bulgaria',
    },
    gender: 'Male',
    DOB: "2000-10-06",

  });

  const [isedit, setEdit] = useState(false);
 
  return (
    <>
      <img src={userData.image} alt="" />

{
  isedit ? <input type="text" value={userData.name} onChange={e => setUserData (prev => ({...prev,name:e.target.value}) ) } /> : <p>{userData.name}</p>
}

<hr />
<div className=''>
<p>CONTACT INFORMATION</p>
<div>
  <p>Email id:</p>
  <p>{userData.email}</p>
  <p>Phone:</p>
  {
  isedit ? <input type="text" value={userData.phone} onChange={e => setUserData (prev => ({...prev,phone:e.target.value}) ) } /> : <p>{userData.phone}</p>
}
<p>Address:</p>
{
   isedit 
   ? 
   <p>
    <input value={userData.address.line1} onChange={e => setUserData (prev => ({...prev,address:{ ...prev,address, line1:e.target.value}}))} type="text" />
    <br/>
    <input  value={userData.address.line2} onChange={e => setUserData (prev => ({...prev,address:{ ...prev,address,  line1:e.target.value}}))} type="text" />
   </p>
   :
   <p>
    {userData.address.line1}
    <br/>
    {userData.address.line2}
   </p>
  
}
</div>
<div>
  <p>
    BASIC INFORMATION
  </p>
  <div>
    <p>Gender:</p>
    {
  isedit ? 
  <select value={gender} onChange={(e) => setUserData(prev => ({...prev,gender:e.target.value}))}> 
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Custom">Custom</option>
    <option value="Rether not to say">Rether not to say</option>
  </select>
  : 
  <p>{userData.gender}</p>
}
<p></p>
  </div>
</div>

</div>

    </>
  )
}

export default MyProfile
