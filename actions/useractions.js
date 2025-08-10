"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDB"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();
    let user = await User.findOne({username: to_username})
        const secret = user.razorpaySecret
    
        const instance = new Razorpay({
        key_id: user.razorpayID,         // Replace with your Key ID
        key_secret: secret  // Replace with your Key Secret
    });

    const receiptId = `receipt_${Date.now()}`; // ✅ generate unique receipt

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
        receipt: receiptId
    }

    let order = await instance.orders.create(options)
    console.log("Razorpay Order:", order);

    // create a payment object which shows the pending payment 
    await Payment.create({oid: order.id, amount: amount/100, to_user: to_username, name: paymentform.name, message:paymentform.message})
    return order
}

export const fetchuser = async (username) => {
  await connectDB();
  const u = await User.findOne({ username });

  if (!u) return null;

  const user = u.toObject();
  return {
    ...user,
    _id: user._id.toString(),
    createdAt: user.createdAt?.toISOString(),
    updatedAt: user.updatedAt?.toISOString(),
  };
};



export const fetchpayments = async (username) => {
  await connectDB();
  const p = await Payment.find({to_user:username,done:true}).sort({ amount: -1 }).limit(5).lean();

  return p.map(payment => ({
    ...payment,
    _id: payment._id.toString(),
    oid: payment.oid?.toString(),
    createdAt: payment.createdAt?.toISOString(),
    updatedAt: payment.updatedAt?.toISOString(),
  }));
};


export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username:ndata.username })
        if (u) {
            return { error:"Username already exists"}
        }   
        await User.updateOne({email:ndata.email}, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({to_user:oldusername}, {to_user:ndata.username})
        
    }
    else{
        await User.updateOne({email:ndata.email}, ndata)
    }
}


// export const updateProfile = async (formData, oldUsername) => {
//   await connectDB();

//   // formData is expected to be an object with updated values
//   if (oldUsername !== formData.username) {
//     const existingUser = await User.findOne({ username: formData.username });
//     if (existingUser) {
//       return { error: "Username already exists" };
//     }
//   }

//   const result = await User.updateOne({ username: oldUsername }, formData);
  
//   if (result.modifiedCount === 0) {
//     return { error: "No changes made or user not found" };
//   }

//   return { success: true };
// };
