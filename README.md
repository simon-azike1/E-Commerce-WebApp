# ShopFlow - E-commerce Platform

A full-stack e-commerce application built with React, Express, and MongoDB.

## Features

### Frontend (Client)
- **User Storefront**: Browse products, view details, add to cart, and checkout
- **Admin Dashboard**: Manage products, categories, orders, and view analytics
- **Authentication**: Secure login for users and admins
- **Shopping Cart**: Persistent cart with local storage
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Image Uploads**: Product images via Cloudinary

### Backend (Server)
- **RESTful API**: Express.js REST API
- **Authentication**: JWT-based authentication with access and refresh tokens
- **Database**: MongoDB with Mongoose ODM
- **Image Management**: Cloudinary integration for image uploads
- **WhatsApp Notifications**: Order updates sent via WhatsApp

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion (animations)
- React Router DOM
- Axios
- React Hot Toast

### Backend
- Express.js
- MongoDB / Mongoose
- JSON Web Token (JWT)
- Cloudinary
- bcryptjs
- Express Validator

## Project Structure

```
E-commerce/
├── backend/                 # Express.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── services/         # Business logic
│   ├── server.js         # Server entry point
│   └── .env              # Environment variables
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/          # API calls
│   │   ├── assets/       # Static assets
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React context
│   │   ├── pages/        # Page components
│   │   └── App.jsx       # Main app component
│   └── package.json
│
├── render.yaml            # Render deployment config
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/simon-azike1/E-Commerce-WebApp.git
cd E-Commerce-WebApp
```

2. **Setup Backend**
```bash
cd backend
npm install
```

3. **Configure Environment Variables**
Create a `.env` file in the `backend` folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STORE_WHATSAPP_NUMBER=your_whatsapp_number
STORE_NAME=Your Store Name
CLIENT_URL=http://localhost:5173
PAYMENT_ENABLED=false
DELIVERY_ENABLED=false
```

4. **Setup Frontend**
```bash
cd client
npm install
```

### Development

**Start Backend**
```bash
cd backend
npm run dev
```

**Start Frontend**
```bash
cd client
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

## Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. Add environment variables in Render dashboard

### Frontend (Vercel)
1. Import your GitHub repository to Vercel
2. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variable:
   - `VITE_API_URL` = your Render backend URL

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Orders
- `POST /api/orders` - Place order
- `GET /api/orders` - Get orders (admin)
- `PATCH /api/orders/:id/status` - Update order status (admin)

### Auth
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## License

MIT

<img width="1871" height="882" alt="image" src="https://github.com/user-attachments/assets/1435bcc1-5334-45b3-b99c-c330511f4c27" />

