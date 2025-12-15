import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Store OTPs temporarily (in-memory)
const otpStore = new Map();

// Utility to generate OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// API Routes
app.post('/api/v1/auth/send-otp', (req, res) => {
  const { identifier, provider } = req.body;

  console.log(`📱 OTP Request Received:`);
  console.log(`   Identifier: ${identifier}`);
  console.log(`   Provider: ${provider}`);

  // Validate identifier
  if (!identifier) {
    return res.status(400).json({
      message: 'Identifier (phone or email) is required',
      success: false,
    });
  }

  // Generate OTP
  const otp = generateOtp();
  otpStore.set(identifier, {
    otp,
    timestamp: Date.now(),
    attempts: 0,
  });

  console.log(`✅ OTP Generated: ${otp}`);

  res.json({
    message: `OTP sent successfully to ${identifier}`,
    success: true,
  });
});

app.post('/api/v1/auth/verify-otp', (req, res) => {
  const { identifier, otp } = req.body;

  console.log(`🔐 OTP Verification Request:`);
  console.log(`   Identifier: ${identifier}`);
  console.log(`   OTP: ${otp}`);

  if (!identifier || !otp) {
    return res.status(400).json({
      message: 'Identifier and OTP are required',
      success: false,
    });
  }

  const storedData = otpStore.get(identifier);

  if (!storedData) {
    return res.status(400).json({
      message: 'OTP expired or not found. Please request a new OTP.',
      success: false,
    });
  }

  // Check OTP expiry (5 minutes)
  if (Date.now() - storedData.timestamp > 5 * 60 * 1000) {
    otpStore.delete(identifier);
    return res.status(400).json({
      message: 'OTP expired. Please request a new OTP.',
      success: false,
    });
  }

  // Check max attempts (3 attempts)
  if (storedData.attempts >= 3) {
    otpStore.delete(identifier);
    return res.status(400).json({
      message: 'Too many failed attempts. Please request a new OTP.',
      success: false,
    });
  }

  // Verify OTP
  if (storedData.otp !== otp) {
    storedData.attempts += 1;
    return res.status(400).json({
      message: `Invalid OTP. ${3 - storedData.attempts} attempts remaining.`,
      success: false,
    });
  }

  // OTP is correct
  otpStore.delete(identifier);

  console.log(`✅ OTP Verified Successfully!`);

  // Generate mock tokens
  const mockTokens = {
    access_token: `access_${identifier}_${Date.now()}`,
    refresh_token: `refresh_${identifier}_${Date.now()}`,
    student_id: `student_${Math.random().toString(36).substring(7)}`,
    is_first_time_user: Math.random() > 0.5,
  };

  res.json(mockTokens);
});

app.get('/api/v1/auth/verify-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ valid: false });
  }

  res.json({
    valid: true,
    student_id: 'student_123',
  });
});

app.post('/api/v1/auth/addUserInfo', (req, res) => {
  const { name, school, class_name, age, location, contact } = req.body;

  console.log(`📝 User Info Received:`, {
    name,
    school,
    class_name,
    age,
    location,
    contact,
  });

  res.json({
    message: 'User information added successfully',
    success: true,
    student_id: `student_${Math.random().toString(36).substring(7)}`,
  });
});

app.get('/api/v1/auth/user/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    student_id: id,
    name: 'John Doe',
    school: 'St. Xavier School',
    class_name: '10A',
    age: '16',
    location: 'Mumbai, India',
    email: 'john@example.com',
    phone: '+919876543210',
    is_first_time_user: false,
  });
});

app.get('/api/v1/auth/check-first-time-user', (req, res) => {
  const studentId = req.query.student_id;

  res.json({
    is_first_time_user: Math.random() > 0.5,
    student_id: studentId || 'student_123',
  });
});

// Get all country codes
app.get('/api/v1/countries', (req, res) => {
  const countries = [
    { name: 'India', code: 'IN', flag: '🇮🇳', dialCode: '+91' },
    { name: 'United States', code: 'US', flag: '🇺🇸', dialCode: '+1' },
    { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', dialCode: '+44' },
    { name: 'Canada', code: 'CA', flag: '🇨🇦', dialCode: '+1' },
    { name: 'Australia', code: 'AU', flag: '🇦🇺', dialCode: '+61' },
    { name: 'Germany', code: 'DE', flag: '🇩🇪', dialCode: '+49' },
    { name: 'France', code: 'FR', flag: '🇫🇷', dialCode: '+33' },
    { name: 'Japan', code: 'JP', flag: '🇯🇵', dialCode: '+81' },
    { name: 'China', code: 'CN', flag: '🇨🇳', dialCode: '+86' },
    { name: 'Brazil', code: 'BR', flag: '🇧🇷', dialCode: '+55' },
    { name: 'Mexico', code: 'MX', flag: '🇲🇽', dialCode: '+52' },
    { name: 'Singapore', code: 'SG', flag: '🇸🇬', dialCode: '+65' },
    { name: 'UAE', code: 'AE', flag: '🇦🇪', dialCode: '+971' },
    { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', dialCode: '+966' },
    { name: 'New Zealand', code: 'NZ', flag: '🇳🇿', dialCode: '+64' },
  ];

  res.json({
    success: true,
    data: countries,
  });
});

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Mock backend is running',
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Mock Backend Server Running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📍 API Base: http://localhost:${PORT}/api/v1`);
  console.log(`\n✅ Ready to test OTP authentication with country codes!\n`);
});
