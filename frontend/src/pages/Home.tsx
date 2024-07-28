import React from 'react'
import AppBar from '../components/AppBar'
import Banner from '../components/Banner'
import SearchBar from '../components/SearchBar'
 

const Home = () => {

   
  return (
    <div className='bg-[#F8F8FA]'>
      <div>
     <div className='mb-16 '> <AppBar/> </div>
      <Banner/>
      {/* <div><SearchBar/></div> */}
    </div>
    </div>
  )
}

export default Home
