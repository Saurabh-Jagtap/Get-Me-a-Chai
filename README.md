# ☕ Get Me a Chai

A full-stack web application built with **Next.js** that lets users create their own chai page where others can send them small payments as a token of appreciation — similar to "Buy Me a Coffee" but for chai lovers! 🫖

🔗 **Live Demo:** [https://get-me-a-chai.vercel.app](https://get-me-a-chai.vercel.app)  
📂 **GitHub Repository:** [https://github.com/SaurabhJagtap/get-me-a-chai](https://github.com/SaurabhJagtap/get-me-a-chai)

---

## 🚀 Features
- 🔐 **Authentication** with NextAuth.js
- 💳 **Payments Integration** using Razorpay
- 📄 **User Dashboard** to manage profile and payment links
- 🌐 **Custom User Pages** for receiving chai payments
- 📱 Fully **responsive design** with Tailwind CSS
- ⚡ Built with **Next.js App Router** for fast navigation

---

## 🛠️ Tech Stack
- **Frontend:** Next.js v15.4.3, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Mongoose
- **Auth:** NextAuth.js
- **Payments:** Razorpay API

---

## 📷 Screenshots

| Homepage | User Page | Dashboard |
|----------|-----------|-----------|
| ![Homepage Screenshot](./screenshots/homepage.png) | ![User Page Screenshot](./screenshots/userpage.png) | ![Dashboard Screenshot](./screenshots/dashboard.png) |

_Add your screenshots in a `screenshots` folder in the root project and replace the above file names._

---

## 🏃 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/SaurabhJagtap/get-me-a-chai.git
cd get-me-a-chai

npm install

MONGODB_URI=mongodb://localhost:27017/
NEXTAUTH_SECRET=ABC
KEY_ID=rzp_test_lfyMrQZ1Le86oC
KEY_SECRET=Qirm8nr6u04k2s3TVW8AZ4yc

npm run dev

http://localhost:3000

