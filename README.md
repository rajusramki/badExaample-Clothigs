# Bad Example Clothing - Advanced E-commerce Platform

A modern, full-stack e-commerce application built with React.js, TypeScript, Node.js, Express, and MongoDB. Features advanced functionality similar to major e-commerce platforms like Amazon and Flipkart.

## 🚀 Features

### Frontend (React.js + TypeScript)
- **Modern UI/UX**: Beautiful, responsive design with Material-UI components
- **Redux Toolkit**: State management for cart, wishlist, authentication, and products
- **Advanced Navigation**: Multi-level navigation with search functionality
- **Product Catalog**: Grid/list view, filtering, sorting, and pagination
- **Shopping Cart**: Advanced cart with quantity management and persistence
- **Wishlist**: Save favorite items for later
- **User Authentication**: Login, register, and protected routes
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Theme System**: Customizable Material-UI theme with dark/light mode support

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Well-structured API endpoints with proper HTTP methods
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Database Models**: Comprehensive Mongoose schemas for users, products, orders, etc.
- **Security**: Helmet, CORS, rate limiting, and input validation
- **File Upload**: Multer integration for product images
- **Error Handling**: Global error handling middleware
- **API Documentation**: Structured endpoint documentation

### E-commerce Features
- **Product Management**: CRUD operations for products with categories and variants
- **User Management**: User profiles, addresses, and preferences
- **Order Management**: Complete order lifecycle with tracking
- **Payment Integration**: Stripe integration for secure payments
- **Inventory Management**: Stock tracking and low stock alerts
- **Reviews & Ratings**: Product reviews with rating system
- **Admin Dashboard**: Administrative interface for managing the platform

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Axios** for API calls
- **React Hook Form** for form handling
- **Framer Motion** for animations
- **React Toastify** for notifications

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads
- **Stripe** for payment processing
- **Nodemailer** for email services
- **Helmet** for security
- **CORS** for cross-origin requests
- **Express Rate Limit** for API protection

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bad-example-clothing
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d
   STRIPE_SECRET_KEY=your-stripe-secret-key
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   CLIENT_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the project root:
   ```bash
   cd ..
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## 🏗 Project Structure

```
bad-example-clothing/
├── backend/                  # Backend API server
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── controllers/         # Route controllers
│   ├── utils/               # Utility functions
│   └── server.js            # Main server file
├── src/                     # React frontend
│   ├── components/          # Reusable components
│   │   ├── common/          # Common components
│   │   ├── auth/            # Authentication components
│   │   ├── product/         # Product-related components
│   │   └── cart/            # Cart components
│   ├── pages/               # Page components
│   ├── store/               # Redux store and slices
│   ├── services/            # API services
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   ├── theme/               # Material-UI theme
│   └── utils/               # Utility functions
└── public/                  # Static assets
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:slug` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/addresses` - Add user address

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get single order

### Cart & Wishlist
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

## 🎨 Features in Detail

### Advanced Product Catalog
- Multi-level category navigation
- Advanced filtering (price, brand, rating, availability)
- Product variants (size, color, etc.)
- High-quality image galleries
- Product recommendations
- Recently viewed products

### Shopping Experience
- Persistent shopping cart
- Guest checkout option
- Multiple payment methods
- Real-time inventory updates
- Product comparison
- Quick view functionality

### User Experience
- Fast search with autocomplete
- Responsive mobile design
- Loading states and animations
- Error handling and notifications
- Accessibility features
- SEO optimization

### Admin Features
- Product management dashboard
- Order management system
- User management
- Analytics and reporting
- Inventory tracking
- Content management

## 🔐 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting
- SQL injection prevention
- XSS protection with Helmet

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Configure MongoDB Atlas
3. Deploy to platform of choice

### Frontend Deployment (Vercel/Netlify)
1. Build the application: `npm run build`
2. Deploy to static hosting platform
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- [ ] Real-time chat support
- [ ] Progressive Web App (PWA)
- [ ] Social media integration
- [ ] AI-powered recommendations
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app with React Native
- [ ] Marketplace functionality

## 📞 Support

For support, email support@badexample.com or create an issue in the repository.

---

**Bad Example Clothing** - Fashion that breaks the rules and sets new standards.