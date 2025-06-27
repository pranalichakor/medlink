
## 🩺 Medlink – Medical Appointment and Health Record System

Medlink is a full-stack medical web application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It allows patients to book appointments, doctors to manage their schedules, and admins to oversee operations.

---

### 🚀 Features

#### 👨‍⚕️ Doctor

* Secure login and dashboard
* Manage appointments (view, complete)
* Update profile and availability
* Upload doctor profile image

#### 👤 Admin

* Secure login and admin panel
* Add new doctors with full details
* View all doctors and appointments

#### 🧑‍💻 Patient (User - future scope)

* Browse available doctors
* Book appointments
* Payment integration via Stripe/Razorpay (optional)

---

### 🛠 Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **Image Upload:** Cloudinary
* **Payment Gateway:** Stripe / Razorpay (optional)
* **Deployment:** (You can add Netlify/Render/Vercel when deployed)

---

### 📁 Project Structure

```
Medlink/
├── backend/
│   └── ... Node.js + Express API, MongoDB models
├── frontend/
│   └── ... React.js user and doctor-facing website
├── admin/
│   └── ... React.js admin dashboard
```

---

### 🔐 Environment Variables

Create `.env` files in both `backend/` and root:

#### backend/.env

```
PORT=4000
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 🧪 Run Locally

1. Clone the repository:

```bash
git clone https://github.com/pranalichakor/medlink.git
cd medlink
```

2. Install dependencies:

```bash
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

3. Run servers:

```bash
# Terminal 1: Backend
cd backend
npm run server

# Terminal 2: Frontend
cd ../frontend
npm run dev

# Terminal 3: Admin
cd ../admin
npm run dev
```

---

### 🧾 License

This project is for educational/demo purposes. Feel free to modify and use.

 thankyou!!!!!!!!

