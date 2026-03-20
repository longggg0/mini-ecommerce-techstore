import { Navbar } from '@/components/Navbar'
import { ProductCard } from '@/components/ProductCard'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayouts() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      {/* <ProductCard/> */}
    </div>
  )
}
