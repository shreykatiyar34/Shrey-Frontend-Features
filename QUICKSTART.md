# Quick Start Guide

Get your authentication system up and running in 3 simple steps!

## Step 1: Create Environment File

Create a file named `.env.local` in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

> **Note**: Replace with your actual backend URL if different.

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Run the Application

```bash
npm run dev
```

The app will open at `http://localhost:5173`

---

## Testing the Flow

### 1. **Login Page** (/)
- Choose Email or Phone tab
- Enter your identifier
- Click "Get OTP"
- Enter the 6-digit OTP
- Click "Continue"

### 2. **First Time Users**
You'll be redirected to the **Onboarding Page** (`/onboarding`):
- Fill in your details:
  - Name
  - School
  - Class
  - Age
  - Location
  - Contact
- Click "Complete Profile"

### 3. **Returning Users**
You'll be redirected directly to the **Dashboard** (`/dashboard`):
- View your profile information
- Access learning features
- Logout when done

---

## 🎯 That's it!

Your authentication system is now fully integrated with:
✅ OTP-based login
✅ Token management
✅ Protected routes
✅ Onboarding flow
✅ User dashboard

---

## Need Help?

- Check `SETUP.md` for detailed documentation
- Check `API_DOCUMENTATION.md` for API details
- Ensure your backend is running and accessible
- Verify CORS is configured on your backend

## Quick Troubleshooting

**Can't send OTP?**
- Backend running? ✓
- `.env.local` configured? ✓
- Network connection? ✓

**Token issues?**
```javascript
// Clear storage and try again
localStorage.clear();
window.location.reload();
```

**Port already in use?**
```bash
# Change port in vite.config.ts or kill existing process
npx kill-port 5173
npm run dev
```

