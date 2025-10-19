# 🌱 AgroConecta

**AgroConecta** is a simple and efficient application for storing and searching for solutions related to the agricultural sector. With an intuitive interface, users can consult solutions directly in a **MongoDB** database.

## 🚀 Technologies Used

- **Frontend:** React (with Context API and Hooks)
- **Backend:** Fastify (Node.js)
- **Database:** Mongo Atlas
- **Styling:** Tailwind CSS / Material UI
- **Deployment:** Vesel (to be defined)

## 🎯 Features

✅ Registration and search for agricultural solutions 🔍  
✅ Integration with Mongo Atlas for efficient storage 💾  
✅ User-friendly and responsive interface 🌍  
✅ Advanced filters for easy searching 🎯  
✅ Optimized API with Fastify for high performance ⚡  
✅ Security with JWT authentication 🔐  
✅ Easy maintenance and scalability 📈  

## 🛠️ How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/viiiniciiiius/agroconecta.git
cd agroconecta
```

### 2️⃣ Set Up the Backend
```bash
cd backend-api
npm install
npm run dev
```

### 3️⃣ Set Up the Frontend
```bash
cd frontend-web
npm install
npm start
```

### 4️⃣ Configure the Database
Make sure you have **MongoDB** running locally or use a service like **MongoDB Atlas**. Set up the connection string in the `.env` file:
```env
MONGO_HOST=mongodb+srv://your_user:password@cluster.mongodb.net/agroconecta
```

## 🔗 Main Endpoints

| Method | Route              | Description                 |
|--------|------------------|-----------------------------|
| POST   | /api/solutions/create   | Adds a new solution        |
| GET    | /api/solutions   | Lists all solutions        |
| GET    | /api/solutions/:id   | Solution detail           |
| DELETE | /api/solutions/:id | Removes a solution         |

## 📌 Contribution
Feel free to contribute! Just follow these steps:
1. **Fork** the repository 🍴
2. Create a new **branch** (`git checkout -b feature-my-feature`) 🌱
3. Commit your changes (`git commit -m 'Added my feature'`) ✨
4. Push to the branch (`git push origin feature-my-feature`) 🚀
5. Open a **Pull Request** 📬

## 📜 License
This project is licensed under the **MIT** license. Feel free to use and modify it! 📝

---
🚜 **AgroConecta** - Connecting Agriculture to the Future! 🌾


