# The Journey - Personal Portfolio & Admin CMS

A production-ready full-stack portfolio application. It features a premium, editorial-style public frontend and a secure, private Admin CMS for managing all portfolio content.

## Architecture
- **Frontend**: React, Vite, Tailwind CSS v4, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **Image Storage**: Cloudinary

## Setup Instructions

### 1. MongoDB Setup
You need a MongoDB connection string (local or MongoDB Atlas).

### 2. Cloudinary Setup
1. Create a free Cloudinary account.
2. Get your `Cloud Name`, `API Key`, and `API Secret`.

### 3. Backend Setup
1. \`cd backend\`
2. \`npm install\`
3. Create a \`.env\` file in the \`backend\` directory (copy from \`.env.example\`) and fill in your MongoDB URI, JWT Secret, and Cloudinary credentials.
4. Run \`npm run dev\`

### 4. Frontend Setup
1. \`cd frontend\`
2. \`npm install\`
3. Run \`npm run dev\`

### 5. Initial Admin Setup
Before you can log in, you must create the initial admin user.
Use an API client like Postman or Curl to send a POST request:

\`\`\`bash
curl -X POST http://localhost:5000/api/auth/setup \
-H "Content-Type: application/json" \
-d '{"email": "admin@example.com", "password": "yourpassword"}'
\`\`\`
*(This route is protected to only allow ONE admin user. Once created, this route cannot create more admins.)*

### 6. Deployment
- **Frontend**: Can be easily deployed to Vercel. (Make sure to set VITE_API_URL if needed, though Vercel rewrites can also be used).
- **Backend**: Deploy to any Node.js hosting provider (Render, Railway, DigitalOcean). Set the corresponding ENV variables.
