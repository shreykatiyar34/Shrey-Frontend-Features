import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '../components/AuthCard';
import { TabSwitcher } from '../components/TabSwitcher';
import { TextField } from '../components/TextField';
import { PrimaryButton } from '../components/PrimaryButton';
import { OtpInput } from '../components/OtpInput';
import { CountryCodeSelector } from '../components/CountryCodeSelector';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

type AuthMode = 'email' | 'phone';
type Step = 'login' | 'otp';

const OTP_LENGTH = 6;

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<AuthMode>('email');
  const [step, setStep] = useState<Step>('login');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default to India
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const identifier = mode === 'email' ? email : `${countryCode}${phone.replace(/\s+/g, '')}`;

  const isLoginDisabled = useMemo(() => {
    if (mode === 'email') return email.trim() === '';
    return phone.trim() === '';
  }, [email, mode, phone]);

  const isOtpComplete = useMemo(() => otp.every((digit) => digit && digit.length === 1), [otp]);

  useEffect(() => {
    if (step !== 'otp') return;
    setTimer(20);
    const intervalId = window.setInterval(() => {
      setTimer((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [step]);

  const handleGetOtp = async () => {
    if (isLoginDisabled) return;

    setLoading(true);
    setError('');

      try {
      await authService.sendOtp({
        identifier,
        provider: 'auto',
      });

      setStep('otp');
      setOtp(Array(OTP_LENGTH).fill(''));
    } catch (err: any) {
      console.error('Send OTP error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!isOtpComplete) return;

    setLoading(true);
    setError('');

    try {
      const otpString = otp.join('');
      const response = await authService.verifyOtp({
        identifier,
        otp: otpString,
      });

      // Update auth context
      login(
        response.access_token,
        response.refresh_token,
        response.student_id,
        response.is_first_time_user
      );

      // Navigate based on first time user status
      if (response.is_first_time_user) {
        navigate('/onboarding');
      } else {
        navigate('/home');
      }
    } catch (err: any) {
      console.error('Verify OTP error:', err);
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
      setOtp(Array(OTP_LENGTH).fill(''));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setOtp(Array(OTP_LENGTH).fill(''));
    
    try {
      await authService.sendOtp({
        identifier,
        provider: 'auto',
      });
      setTimer(20);
    } catch (err: any) {
      console.error('Resend OTP error:', err);
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    }
  };

  const contactValue = mode === 'phone' ? `${countryCode}${phone || '9650873913'}` : email || 'example@email.com';

  return (
    <div className="page">
      <div className="page__backdrop" />
      <div className="page__content">
        {step === 'login' && (
          <AuthCard title="Welcome" highlight="Back" subtitle="Sign in to continue your account">
            <div className="stack stack--md">
              <TabSwitcher
                options={[
                  { label: 'Email', value: 'email' },
                  { label: 'Phone', value: 'phone' },
                ]}
                value={mode}
                onChange={(value) => setMode(value)}
              />
              {mode === 'email' ? (
                <TextField
                  label="Enter your email address *"
                  placeholder="example@email.com"
                  value={email}
                  onChange={setEmail}
                  type="email"
                />
              ) : (
                <div className="phone-field-wrapper">
                  <CountryCodeSelector value={countryCode} onChange={setCountryCode} />
                  <TextField
                    label="Enter your phone number *"
                    placeholder="9650873913"
                    value={phone}
                    onChange={setPhone}
                    type="tel"
                  />
                </div>
              )}
              {error && <div className="error-message">{error}</div>}
              <PrimaryButton
                label={loading ? 'Sending...' : 'Get OTP'}
                onClick={handleGetOtp}
                disabled={isLoginDisabled || loading}
              />
            </div>
          </AuthCard>
        )}

        {step === 'otp' && (
          <AuthCard
            title="Enter"
            highlight="OTP"
            subtitle={`A 6-digit OTP has been sent to ${mode === 'email' ? 'your email' : 'your mobile number'}:`}
          >
            <div className="stack stack--lg">
              <div className="otp__contact">{contactValue}</div>
              <OtpInput length={OTP_LENGTH} value={otp} onChange={setOtp} />
              <div className="otp__actions">
                <button
                  className="otp__resend"
                  type="button"
                  onClick={handleResend}
                  disabled={timer > 0}
                >
                  Send code again
                </button>
                <span className="otp__timer">00:{timer.toString().padStart(2, '0')}</span>
              </div>
              {error && <div className="error-message">{error}</div>}
              <PrimaryButton
                label={loading ? 'Verifying...' : 'Continue'}
                onClick={handleVerifyOtp}
                disabled={!isOtpComplete || loading}
              />
            </div>
          </AuthCard>
        )}
      </div>
    </div>
  );
}