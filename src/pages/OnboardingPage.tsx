import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '../components/AuthCard';
import { TextField } from '../components/TextField';
import { PrimaryButton } from '../components/PrimaryButton';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

export function OnboardingPage() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    class_name: '',
    age: '',
    location: '',
    contact: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.school.trim() !== '' &&
      formData.class_name.trim() !== '' &&
      formData.age.trim() !== '' &&
      formData.location.trim() !== '' &&
      formData.contact.trim() !== ''
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.addUserInfo(formData);
      // Refresh auth state to get updated user info
      await checkAuth();
      navigate('/home');
    } catch (err: any) {
      console.error('Onboarding error:', err);
      setError(err.response?.data?.message || 'Failed to save user information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="page">
      <div className="page__backdrop" />
      <div className="page__content">
        <AuthCard
          title="Complete Your"
          highlight="Profile"
          subtitle="Tell us more about yourself"
        >
          <div className="stack stack--md">
            <TextField
              label="Full Name *"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(value) => handleChange('name', value)}
            />
            <TextField
              label="School *"
              placeholder="Enter your school name"
              value={formData.school}
              onChange={(value) => handleChange('school', value)}
            />
            <TextField
              label="Class *"
              placeholder="e.g., 10"
              value={formData.class_name}
              onChange={(value) => handleChange('class_name', value)}
            />
            <TextField
              label="Age *"
              placeholder="Enter your age"
              value={formData.age}
              onChange={(value) => handleChange('age', value)}
            />
            <TextField
              label="Location *"
              placeholder="Enter your city"
              value={formData.location}
              onChange={(value) => handleChange('location', value)}
            />
            <TextField
              label="Contact Number *"
              placeholder="+91 9876543210"
              value={formData.contact}
              onChange={(value) => handleChange('contact', value)}
              type="tel"
            />
            {error && <div className="error-message">{error}</div>}
            <PrimaryButton
              label={loading ? 'Saving...' : 'Complete Profile'}
              onClick={handleSubmit}
              disabled={!isFormValid() || loading}
            />
          </div>
        </AuthCard>
      </div>
    </div>
  );
}

