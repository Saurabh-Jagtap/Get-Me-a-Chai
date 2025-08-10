"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { updateProfile,fetchuser } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    useEffect(() => {
        console.log(session)

        if (!session) {
            router.push('/login')
        }
        else {
            getData()
        }
    }, [])

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        setform(u)
    }

    // useEffect(() => {
    //     if (session) {
    //         setform({
    //             name: session.user.name,
    //             email: session.user.email,
    //             username: session.user.username,
    //             profilepic: session.user.profilepic,
    //             coverpic: session.user.coverpic,
    //             razorpayID: session.user.razorpayID,
    //             razorpaySecret: session.user.razorpaySecret,
    //         })
    //     }
    // }, [session])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        let a = await updateProfile(e, session.user.name)
        toast('Profile Updated!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     const result = await updateProfile(form, session.user.name)

    //     if (result?.error) {
    //         alert(result.error)
    //     } else {
    //         alert("Profile Updated")

    //         // Update session (so session.user reflects new data)
    //         await update({
    //             name: form.name,
    //             email: form.email,
    //             username: form.username,
    //             profilepic: form.profilepic,
    //             coverpic: form.coverpic,
    //             razorpayID: form.razorpayID,
    //             razorpaySecret: form.razorpaySecret,
    //         })

    //         // Optionally re-set form state (not required unless changed elsewhere)
    //         setform({ ...form })
    //     }
    // }



    return (
        <>
        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
        <div>
            <h1 className='text-center font-bold text-3xl mt-5 mb-2'>Welcome to your Dashboard</h1>
            <form action={handleSubmit}>
                <div className='flex flex-col gap-3 px-6 md:w-[40vw] mx-auto justify-center items-center'>
                    <div className='w-full'>
                        <label htmlFor='name' className='my-2'>Name</label>
                        <input value={form && form.name ? form.name : ""} onChange={handleChange} type="text" id='name' name='name' className='p-1.5 rounded-lg w-full bg-slate-800 ' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor='email' className=' my-2'>Email</label>
                        <input value={form && form.email ? form.email : ""} onChange={handleChange} type="text" id='email' name='email' className='p-1.5 rounded-lg w-full bg-slate-800 ' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor='username' className=' my-2'>Username</label>
                        <input value={form && form.username ? form.username : ""} onChange={handleChange} type="text" id='username' name='username' className='p-1.5 rounded-lg w-full bg-slate-800 ' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="profilepic" className='mb-2'>Profile Picture</label>
                        <input value={form && form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" id='profilepic' name='profilepic' className='p-1.5 rounded-lg w-full bg-slate-800 ' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor='coverpic' className=' my-2'>Cover Picture</label>
                        <input value={form && form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" id='coverpic' name='coverpic' className='p-1.5 rounded-lg w-full bg-slate-800 ' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor='razorpayID' className=' my-2'>Razorpay ID</label>
                        <input value={form && form.razorpayID ? form.razorpayID : ""} onChange={handleChange} type="text" id='razorpayID' name='razorpayID' className='p-1.5 rounded-lg w-full bg-slate-800 ' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor='razorpaySecret' className=' my-2'>Razorpay Secret</label>
                        <input value={form && form.razorpaySecret ? form.razorpaySecret : ""} onChange={handleChange} type="text" id='razorpaySecret' name='razorpaySecret' className='p-1.5 rounded-lg w-full bg-slate-800 ' />
                    </div>
                    <button type='submit' className='w-full bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-3
                '>Save</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Dashboard
