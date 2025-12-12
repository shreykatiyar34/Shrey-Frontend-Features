import { useEffect, useMemo, useState } from 'react'
import { AuthCard } from './components/AuthCard'
import { TabSwitcher } from './components/TabSwitcher'
import { TextField } from './components/TextField'
import { PrimaryButton } from './components/PrimaryButton'
import { OtpInput } from './components/OtpInput'
import './App.css'

type AuthMode = 'email' | 'phone'
type Step = 'login' | 'otp'

const OTP_LENGTH = 6

function App() {
  const [mode, setMode] = useState<AuthMode>('email')
  const [step, setStep] = useState<Step>('login')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [timer, setTimer] = useState(20)

  const isLoginDisabled = useMemo(() => {
    if (mode === 'email') return email.trim() === ''
    return phone.trim() === ''
  }, [email, mode, phone])

  const isOtpComplete = useMemo(() => otp.every((digit) => digit && digit.length === 1), [otp])

  useEffect(() => {
    if (step !== 'otp') return
    setTimer(20)
    const intervalId = window.setInterval(() => {
      setTimer((current) => (current > 0 ? current - 1 : 0))
    }, 1000)
    return () => window.clearInterval(intervalId)
  }, [step])

  const handleGetOtp = () => {
    if (isLoginDisabled) return
    setStep('otp')
    setOtp(Array(OTP_LENGTH).fill(''))
  }

  const handleResend = () => {
    setTimer(20)
    setOtp(Array(OTP_LENGTH).fill(''))
  }

  const contactValue = mode === 'phone' ? phone || '+91 9650873913' : email || 'example@email.com'

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
                <TextField
                  label="Enter your phone number *"
                  placeholder="+91 9650873913"
                  value={phone}
                  onChange={setPhone}
                  type="tel"
                />
              )}
              <PrimaryButton label="Get OTP" onClick={handleGetOtp} disabled={isLoginDisabled} />
            </div>
          </AuthCard>
        )}

        {step === 'otp' && (
          <AuthCard
            title="Enter"
            highlight="OTP"
            subtitle="A 6-digit OTP has been sent to the mobile number:"
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
              <PrimaryButton label="Continue" disabled={!isOtpComplete} />
            </div>
          </AuthCard>
        )}
      </div>
    </div>
  )
}

export default App
