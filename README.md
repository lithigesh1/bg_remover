# 🪄 AI Background Remover

A full-stack **AI-powered SaaS application** that allows users to upload images, remove their backgrounds using AI, and download transparent PNGs. Built with the MERN stack and integrated with **Clerk** for authentication and **Razorpay** for credit-based payments.

>  Live Demo: [bg-remover-lithi1.vercel.app](https://bg-remover-lithi1.vercel.app/)

---

##  Features

* AI-powered background removal using ClipDrop API
* Upload image & download transparent result
* Credit-based system: 1 credit = 1 image processing
* Purchase credits securely via **Razorpay**
* User authentication and management via **Clerk**
* Fully responsive design with React & TailwindCSS
* Separate backend API (Node.js + Express) with MongoDB

---

##  Tech Stack

### Frontend

* React.js
* React Router DOM
* Clerk Authentication
* Razorpay Integration
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer (for image uploads)
* Razorpay (payments)
* Svix (for Clerk webhook)
* ClipDrop API

---

## 📂 Folder Structure

### `client/` (Frontend)

```
src/
├── assets/
├── components/
│   ├── BgSlider.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── NavBar.jsx
│   ├── Steps.jsx
│   └── Testimonial.jsx
├── context/
│   └── AppContext.jsx
├── pages/
│   ├── BuyCredit.jsx
│   ├── Home.jsx
│   ├── Result.jsx
│   └── App.jsx
├── index.css
└── main.jsx
```

### `server/` (Backend)

```
server/
├── configs/
│   └── mongodb.js
├── controllers/
│   ├── imageController.js
│   └── userController.js
├── middlewares/
│   ├── auth.js
│   └── multer.js
├── models/
│   ├── transactionModel.js
│   └── userModel.js
├── routes/
│   ├── imageRoutes.js
│   └── userRoutes.js
├── server.js
└── .env
```

---

##  Environment Variables

### Frontend (`client/.env`)

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:4000/
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Backend (`server/.env`)

```
MONGODB_URI=your_mongodb_uri
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLIPDROP_API=your_clipdrop_api_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
```

---

##  Scripts

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run server
```

---

## 🛠️ Setup Instructions

1. Clone this repo:

   ```bash
   git clone https://github.com/your-username/ai-background-remover.git
   ```

2. Configure `.env` files in both `client/` and `server/` directories.

3. Run both frontend and backend servers.

4. Visit: [http://localhost:5173](http://localhost:5173)

---

## Payments & Auth

* **Razorpay** is used for securely purchasing credits.
* **Clerk** handles all user authentication and sessions.
* Backend validates purchases and credits per user.

---


