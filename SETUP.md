# Student Platform Frontend - Setup Guide

## 🚀 Authentication Flow

The application implements a complete OTP-based authentication flow:

```
1. Enter Phone/Email
   ↓
2. Send OTP
   ↓
3. Verify OTP → Receive Tokens
   ↓
4. Check First Time User?
   ↓
   Yes → Onboarding Form
   No  → Dashboard
```

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8000` (or your configured URL)

## 🔧 Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```
   
   **Note**: Replace `http://localhost:8000` with your actual backend URL if different.

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔐 API Endpoints Integrated

### 1. Send OTP
- **Endpoint**: `POST /api/v1/auth/send-otp`
- **Payload**:
  ```json
  {
    "identifier": "+919876543210",
    "provider": "auto"
  }
  ```

### 2. Verify OTP
- **Endpoint**: `POST /api/v1/auth/verify-otp`
- **Payload**:
  ```json
  {
    "identifier": "+919876543210",
    "otp": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "access_token": "...",
    "refresh_token": "...",
    "student_id": "...",
    "is_first_time_user": true
  }
  ```

### 3. Verify JWT Token
- **Endpoint**: `GET /api/v1/auth/verify-token`
- **Headers**: `Authorization: Bearer <access_token>`

### 4. Add/Update User Info (Onboarding)
- **Endpoint**: `POST /api/v1/auth/addUserInfo`
- **Headers**: `Authorization: Bearer <access_token>`
- **Payload**:
  ```json
  {
    "name": "Rahul Sharma",
    "school": "Delhi Public School",
    "class_name": "10",
    "age": "15",
    "location": "Delhi",
    "contact": "+919876543210"
  }
  ```

### 5. Get User by Student ID
- **Endpoint**: `GET /api/v1/auth/user/{student_id}`
- **Headers**: `Authorization: Bearer <access_token>`

### 6. Check First-Time User
- **Endpoint**: `GET /api/v1/auth/check-first-time-user`
- **Headers**: `Authorization: Bearer <access_token>`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthCard.tsx
│   ├── TextField.tsx
│   ├── OtpInput.tsx
│   ├── PrimaryButton.tsx
│   ├── TabSwitcher.tsx
│   └── ProtectedRoute.tsx
├── context/             # React Context for state management
│   └── AuthContext.tsx
├── pages/               # Page components
│   ├── LoginPage.tsx
│   ├── OnboardingPage.tsx
│   └── DashboardPage.tsx
├── services/            # API service layer
│   ├── api.ts          # Axios instance with interceptors
│   └── authService.ts  # Authentication API calls
├── App.tsx             # Main app with routing
├── main.tsx            # Entry point
└── App.css             # Styles
```

## 🎨 Features Implemented

### ✅ Authentication Flow
- Email/Phone login with tab switcher
- OTP input with auto-focus
- OTP resend with countdown timer
- Automatic token storage in localStorage
- Token verification on app load
- Protected routes with authentication guard

### ✅ Token Management
- Automatic inclusion of JWT in API requests
- Token refresh on 401 errors
- Logout functionality with token cleanup

### ✅ Onboarding
- Complete user profile form
- Form validation
- Automatic redirect to dashboard after completion

### ✅ Dashboard
- User profile display
- Logout functionality
- Protected route (requires authentication)

### ✅ Error Handling
- API error messages displayed to user
- Network error handling
- Invalid OTP feedback

## 🔒 Security Features

1. **Token Storage**: Tokens stored in localStorage
2. **Protected Routes**: Unauthenticated users redirected to login
3. **Token Verification**: Token validity checked on app load
4. **Auto Logout**: Invalid tokens trigger automatic logout

## 🎯 Usage Flow

### For New Users:
1. Enter phone number or email
2. Click "Get OTP"
3. Enter the 6-digit OTP received
4. Click "Continue"
5. Fill out the onboarding form
6. Access the dashboard

### For Returning Users:
1. Enter phone number or email
2. Click "Get OTP"
3. Enter the 6-digit OTP received
4. Click "Continue"
5. Directly access the dashboard

## 🐛 Troubleshooting

### "Failed to send OTP"
- Check if backend is running
- Verify `VITE_API_BASE_URL` in `.env.local`
- Check network connection

### "Invalid OTP"
- Ensure OTP is correct
- Check if OTP has expired (usually valid for a few minutes)
- Try resending the OTP

### "Token verification failed"
- Clear localStorage and try logging in again
- Check if backend is running
- Verify token expiration settings on backend

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Tablet (768px - 1919px)
- Mobile (320px - 767px)

## 🔄 State Management

Authentication state is managed using React Context (`AuthContext`):
- `isAuthenticated`: Boolean indicating if user is logged in
- `user`: Current user information
- `loading`: Loading state during authentication check
- `login()`: Function to log in user
- `logout()`: Function to log out user
- `updateUser()`: Function to update user information
- `checkAuth()`: Function to verify authentication status

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api/v1` |

## 🚨 Important Notes

1. **CORS**: Ensure your backend has CORS configured to accept requests from the frontend origin
2. **Token Expiration**: Implement token refresh logic if your tokens have short expiration times
3. **Production**: Use HTTPS in production for secure token transmission
4. **Environment Files**: Never commit `.env.local` to version control

## 📚 Technologies Used

- **React 19**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **React Router DOM**: Routing
- **Axios**: HTTP client
- **React Context API**: State management

## 🤝 Support

For issues or questions, please check:
1. Backend API is running correctly
2. Environment variables are configured
3. Network connectivity
4. Browser console for error messages

