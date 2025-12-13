# API Integration Documentation

This document provides details on how the frontend integrates with the backend API endpoints.

## Base URL Configuration

The base URL is configured via environment variable:
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Authentication Flow

### 1. Send OTP

**Endpoint**: `POST /api/v1/auth/send-otp`

**Request Body**:
```json
{
  "identifier": "+919876543210",  // Phone number or email
  "provider": "auto"               // "sms", "email", or "auto"
}
```

**Frontend Implementation**:
```typescript
// File: src/services/authService.ts
await authService.sendOtp({
  identifier: "+919876543210",
  provider: "auto"
});
```

**Success Response**:
```json
{
  "message": "OTP sent successfully",
  "success": true
}
```

---

### 2. Verify OTP

**Endpoint**: `POST /api/v1/auth/verify-otp`

**Request Body**:
```json
{
  "identifier": "+919876543210",
  "otp": "123456"
}
```

**Frontend Implementation**:
```typescript
const response = await authService.verifyOtp({
  identifier: "+919876543210",
  otp: "123456"
});
```

**Success Response**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student_id": "STU123456",
  "is_first_time_user": true
}
```

**Token Storage**:
The frontend automatically stores tokens in localStorage:
- `access_token`
- `refresh_token`
- `student_id`

---

### 3. Verify JWT Token

**Endpoint**: `GET /api/v1/auth/verify-token`

**Headers**:
```
Authorization: Bearer <access_token>
```

**Frontend Implementation**:
```typescript
await authService.verifyToken();
```

**Success Response**:
```json
{
  "valid": true,
  "student_id": "STU123456"
}
```

**Note**: This endpoint is called automatically on app load to verify if the stored token is still valid.

---

### 4. Add/Update User Info (Onboarding)

**Endpoint**: `POST /api/v1/auth/addUserInfo`

**Headers**:
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body**:
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

**Frontend Implementation**:
```typescript
await authService.addUserInfo({
  name: "Rahul Sharma",
  school: "Delhi Public School",
  class_name: "10",
  age: "15",
  location: "Delhi",
  contact: "+919876543210"
});
```

**Success Response**:
```json
{
  "message": "User information updated successfully",
  "success": true,
  "student_id": "STU123456"
}
```

---

### 5. Get User by Student ID

**Endpoint**: `GET /api/v1/auth/user/{student_id}`

**Headers**:
```
Authorization: Bearer <access_token>
```

**Frontend Implementation**:
```typescript
const user = await authService.getUserById("STU123456");
```

**Success Response**:
```json
{
  "student_id": "STU123456",
  "name": "Rahul Sharma",
  "school": "Delhi Public School",
  "class_name": "10",
  "age": "15",
  "location": "Delhi",
  "contact": "+919876543210",
  "email": "rahul@example.com",
  "phone": "+919876543210",
  "is_first_time_user": false
}
```

---

### 6. Check First-Time User

**Endpoint**: `GET /api/v1/auth/check-first-time-user`

**Headers**:
```
Authorization: Bearer <access_token>
```

**Frontend Implementation**:
```typescript
const result = await authService.checkFirstTimeUser();
```

**Success Response**:
```json
{
  "is_first_time_user": false,
  "student_id": "STU123456"
}
```

---

## Axios Interceptors

### Request Interceptor
Automatically adds the JWT token to all requests:

```typescript
// File: src/services/api.ts
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Response Interceptor
Handles 401 errors (unauthorized) by clearing tokens and redirecting to login:

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('student_id');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
```

---

## Error Handling

All API calls are wrapped in try-catch blocks with user-friendly error messages:

```typescript
try {
  await authService.sendOtp({ identifier, provider: "auto" });
} catch (err: any) {
  const errorMessage = err.response?.data?.message || 
                       'Failed to send OTP. Please try again.';
  // Display error to user
}
```

---

## Authentication Context

The `AuthContext` manages authentication state across the application:

```typescript
// File: src/context/AuthContext.tsx

interface AuthContextType {
  isAuthenticated: boolean;      // Is user logged in?
  user: UserInfo | null;         // Current user data
  loading: boolean;              // Loading state
  login: (...) => void;          // Login function
  logout: () => void;            // Logout function
  updateUser: (user) => void;    // Update user data
  checkAuth: () => Promise<void>; // Verify authentication
}
```

**Usage in components**:
```typescript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { isAuthenticated, user, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user.name}!</div>;
}
```

---

## Protected Routes

Routes that require authentication are wrapped with `ProtectedRoute`:

```typescript
// File: src/App.tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

The `ProtectedRoute` component:
1. Checks if user is authenticated
2. Shows loading spinner while checking
3. Redirects to login if not authenticated
4. Renders the protected page if authenticated

---

## CORS Configuration

**Important**: Your backend must allow requests from the frontend origin.

Example backend CORS configuration (FastAPI):
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Token Management Best Practices

### Current Implementation:
- Tokens stored in `localStorage`
- Automatically included in API requests
- Cleared on logout or 401 errors

### Security Considerations:
1. **Production**: Use HTTPS to prevent token interception
2. **Token Expiration**: Implement token refresh logic if tokens expire quickly
3. **XSS Protection**: Sanitize user inputs to prevent XSS attacks
4. **CSRF Protection**: Backend should implement CSRF tokens if needed

---

## Testing the Integration

### 1. Test Send OTP
```bash
curl -X POST http://localhost:8000/api/v1/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"identifier": "+919876543210", "provider": "auto"}'
```

### 2. Test Verify OTP
```bash
curl -X POST http://localhost:8000/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"identifier": "+919876543210", "otp": "123456"}'
```

### 3. Test Verify Token
```bash
curl -X GET http://localhost:8000/api/v1/auth/verify-token \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Test Add User Info
```bash
curl -X POST http://localhost:8000/api/v1/auth/addUserInfo \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "Rahul Sharma",
    "school": "Delhi Public School",
    "class_name": "10",
    "age": "15",
    "location": "Delhi",
    "contact": "+919876543210"
  }'
```

---

## Common Issues and Solutions

### Issue: "Network Error"
**Solution**: 
- Check if backend is running
- Verify `VITE_API_BASE_URL` in `.env.local`
- Check CORS configuration on backend

### Issue: "401 Unauthorized"
**Solution**:
- Token may have expired
- Clear localStorage and login again
- Check token format in backend

### Issue: "Failed to send OTP"
**Solution**:
- Check if SMS/Email provider is configured in backend
- Verify phone number/email format
- Check backend logs for errors

### Issue: "OTP verification failed"
**Solution**:
- Ensure OTP is correct
- Check if OTP has expired
- Verify backend OTP validation logic

---

## Development Tips

1. **View stored tokens**:
   ```javascript
   // In browser console
   console.log(localStorage.getItem('access_token'));
   ```

2. **Clear authentication**:
   ```javascript
   // In browser console
   localStorage.clear();
   window.location.reload();
   ```

3. **Monitor API calls**:
   - Open browser DevTools
   - Go to Network tab
   - Filter by XHR
   - Inspect request/response

4. **Debug authentication state**:
   ```typescript
   // Add to any component
   const { isAuthenticated, user } = useAuth();
   console.log({ isAuthenticated, user });
   ```

