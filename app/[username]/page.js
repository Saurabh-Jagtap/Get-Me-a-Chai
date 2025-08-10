import React from 'react';
import PaymentPage from '@/components/PaymentPage';
import connectDB from '@/db/connectDB';
import User from '@/models/User';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
    const { username } = await params;

    // If the username is not present in the database, show a 404 page.
    const checkUser = async ()=>{
        await connectDB()
        let u = await User.findOne({username})
        if(!u){
            return notFound()
        }
    }
    await checkUser()
    return (
        <>
            <PaymentPage username={username} />
        </>
    );
}

export async function generateMetadata({params}){
    const username = await params.username
    return{
        title: `${username} - Get Me a Chai`
    }
}
