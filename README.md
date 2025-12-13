# Student Platform Frontend

A modern, responsive authentication system built with React, TypeScript, and Vite. Features OTP-based login, onboarding flow, and protected routes.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.0-purple)

## ✨ Features

- 🔐 **OTP Authentication** - Email/Phone-based login with OTP verification
- 🎯 **Smart Routing** - First-time users → Onboarding, Returning users → Dashboard
- 🛡️ **Protected Routes** - Secure pages with automatic authentication checks
- 🔄 **Token Management** - Automatic JWT token handling with refresh logic
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast development

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env.local` file:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` 🎉

## 📖 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 3 steps
- **[SETUP.md](./SETUP.md)** - Detailed setup and configuration guide
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API integration details

## 🔄 Authentication Flow

```
┌─────────────────────┐
│  Enter Phone/Email  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     Send OTP        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Verify OTP       │
│   → Get Tokens      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ First Time User?    │
└──────┬──────┬───────┘
       │      │
   Yes │      │ No
       │      │
       ▼      ▼
┌──────────┐ ┌──────────┐
│Onboarding│ │ Homepage │
└────┬─────┘ └────┬─────┘
     │            │
     └────────┬───┘
              ▼
        ┌──────────┐
        │ Homepage │
        └──────────┘
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthCard.tsx
│   ├── TextField.tsx
│   ├── OtpInput.tsx
│   ├── PrimaryButton.tsx
│   ├── TabSwitcher.tsx
│   └── ProtectedRoute.tsx
├── context/             # React Context
│   └── AuthContext.tsx  # Authentication state management
├── pages/               # Page components
│   ├── LoginPage.tsx    # OTP login
│   ├── OnboardingPage.tsx  # User profile form
│   ├── HomePage.tsx     # Main homepage after auth
│   └── DashboardPage.tsx   # User profile dashboard
├── services/            # API layer
│   ├── api.ts          # Axios instance & interceptors
│   └── authService.ts  # Auth API calls
├── App.tsx             # Main app with routing
└── main.tsx            # Entry point
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/send-otp` | POST | Send OTP to phone/email |
| `/auth/verify-otp` | POST | Verify OTP and get tokens |
| `/auth/verify-token` | GET | Verify JWT token validity |
| `/auth/addUserInfo` | POST | Add/update user information |
| `/auth/user/{id}` | GET | Get user by student ID |
| `/auth/check-first-time-user` | GET | Check if first-time user |

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API specs.

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

## 🔒 Security Features

- ✅ JWT token authentication
- ✅ Automatic token refresh on 401 errors
- ✅ Protected routes with authentication guards
- ✅ Secure token storage in localStorage
- ✅ CORS-ready API client

## 📱 Responsive Breakpoints

- **Desktop**: 1920px+
- **Tablet**: 768px - 1919px
- **Mobile**: 320px - 767px

## 🐛 Troubleshooting

### Can't send OTP?
1. Ensure backend is running
2. Check `VITE_API_BASE_URL` in `.env.local`
3. Verify CORS is enabled on backend

### Token errors?
```javascript
// Clear storage and try again
localStorage.clear();
window.location.reload();
```

### Build errors?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api/v1` |

## 📦 Dependencies

### Production
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `axios` - HTTP client

### Development
- `typescript` - Type checking
- `vite` - Build tool
- `eslint` - Code linting
- `@types/*` - TypeScript definitions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, please:
1. Check the [SETUP.md](./SETUP.md) documentation
2. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. Open an issue on GitHub

## 🎯 Next Steps

After setup, you can:
- Customize the UI theme in `App.css`
- Add more pages and routes
- Integrate additional API endpoints
- Implement advanced features (password reset, social login, etc.)

---

Built with ❤️ using React, TypeScript, and Vite
