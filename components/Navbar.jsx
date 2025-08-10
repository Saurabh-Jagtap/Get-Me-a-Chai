"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { HiMenu, HiX } from "react-icons/hi"

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className='bg-indigo-700 text-white px-4'>
      <div className="flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link className="flex font-extrabold text-xl items-center cursor-pointer" href={'/'}>
          <img src="/transparent_cup.gif" alt="TEA" width={60} />
          <span className='ml-2 transition duration-200 hover:scale-110'>Get Me a Chai</span>
        </Link>

        {/* Desktop menu */}
        <div className='hidden md:flex items-center gap-4'>
          {session && (
            <>
              {/* Dropdown */}
              <div className='relative'>
                <button 
                  onClick={() => setShowdropdown(!showdropdown)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 inline-flex items-center"
                >
                  Welcome {session.user.email}
                  <svg className="w-2.5 h-2.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                <div className={`absolute top-12 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 ${showdropdown ? "" : "hidden"}`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link href={"/dashboard"} onClick={() => setShowdropdown(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Dashboard</Link>
                    </li>
                    <li>
                      <Link href={`/${session.user.name}`} onClick={() => setShowdropdown(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Your page</Link>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => signOut()}>Sign out</button>
                    </li>
                  </ul>
                </div>
              </div>

              <button 
                className='bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5'
                onClick={() => signOut()}
              >
                Logout
              </button>
            </>
          )}

          {!session && (
            <Link href={"/login"}>
              <button className='bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5'>Login</button>
            </Link>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button 
          className="block md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className='md:hidden flex flex-col gap-3 pb-4'>
          {session && (
            <>
              <Link href={"/dashboard"} onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <Link href={`/${session.user.name}`} onClick={() => setMobileMenuOpen(false)}>Your page</Link>
              <button onClick={() => { setMobileMenuOpen(false); signOut(); }}>Logout</button>
            </>
          )}
          {!session && (
            <Link href={"/login"} onClick={() => setMobileMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
