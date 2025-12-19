# 🛠️ CodeConnect – Backend

CodeConnect Backend is the **server-side application** that powers the CodeConnect platform.  
It handles  logic, API requests, authentication, and database management.

---

## 🚀 Features

- 🔐 User authentication & authorization  
- 📡 RESTful API endpoints  
- 🗄️ MongoDB database integration  
- 🔄 CRUD operations  
- 🧠 Server-side validation  
- 🌐 CORS-enabled API for frontend integration  

---

## 🛠️ Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB  
- **ODM:** Mongoose  
- **Authentication:** JWT (JSON Web Tokens)  
- **API Style:** REST  
- **Language:** JavaScript (ES6+)  

---

## 🧠 Key Concepts Used

- RESTful API design  
- MVC architecture  
- Middleware usage  
- Authentication & authorization  
- Error handling  
- Environment variables  

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Madhuharika756/CodeConnect_Backend.git

# Navigate to project folder
cd CodeConnect_Backend

# Install dependencies
npm install

# Create a .env file in the root directory and add:
PORT=1399
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Start the backend server
npm start
