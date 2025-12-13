# Environment Setup Instructions

## 🔧 Creating Your `.env.local` File

Since `.env` and `.env.local` files are gitignored for security reasons, you need to create this file manually.

### Step 1: Create the File

In the **root directory** of your project (same level as `package.json`), create a new file named `.env.local`

### Step 2: Add Configuration

Copy and paste the following into your `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Step 3: Update the URL (if needed)

If your backend is running on a different URL or port, update the value accordingly:

**Examples:**

```env
# Local development (default)
VITE_API_BASE_URL=http://localhost:8000/api/v1

# Different port
VITE_API_BASE_URL=http://localhost:3000/api/v1

# Production server
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1

# Different IP address
VITE_API_BASE_URL=http://192.168.1.100:8000/api/v1
```

### Step 4: Restart Development Server

After creating or modifying `.env.local`, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 📝 File Location

```
student-platform-frontend/
├── .env.local          ← Create this file here
├── package.json
├── vite.config.ts
├── src/
└── ...
```

---

## ✅ Verification

To verify your environment variable is loaded correctly:

1. Start the development server: `npm run dev`
2. Open browser console (F12)
3. Type: `import.meta.env.VITE_API_BASE_URL`
4. You should see your configured URL

---

## 🔒 Security Notes

- ✅ `.env.local` is automatically ignored by git
- ✅ Never commit this file to version control
- ✅ Use different values for development and production
- ✅ Keep production URLs secure

---

## 🐛 Troubleshooting

### "API calls failing"
- Check if `.env.local` exists
- Verify the URL is correct
- Ensure backend is running
- Restart dev server after changes

### "Environment variable undefined"
- File must be named exactly `.env.local`
- Must be in root directory (not in `src/`)
- Variable must start with `VITE_`
- Restart dev server after creating file

### "CORS errors"
- Backend must allow your frontend origin
- Check backend CORS configuration
- Verify the URL in `.env.local` matches backend

---

## 📋 Quick Copy-Paste

**For Local Development:**
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

**For Production:**
```env
VITE_API_BASE_URL=https://your-production-api.com/api/v1
```

---

## 🎯 Next Steps

After creating `.env.local`:
1. ✅ Restart development server
2. ✅ Test API connection
3. ✅ Try sending OTP
4. ✅ Complete authentication flow

---

Need help? Check:
- `QUICKSTART.md` - Quick start guide
- `SETUP.md` - Detailed setup
- `API_DOCUMENTATION.md` - API details

