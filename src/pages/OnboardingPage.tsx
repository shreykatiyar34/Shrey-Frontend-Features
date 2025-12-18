import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '../components/AuthCard';
import { TextField } from '../components/TextField';
import { Select } from '../components/Select';
import { PrimaryButton } from '../components/PrimaryButton';
import authService from '../services/authService';
import contentService from '../services/contentService';
import { useAuth } from '../context/AuthContext';

export function OnboardingPage() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    board: '',
    class_name: '',
    medium: '',
    age: '',
    location: '',
    contact: '',
    guardian_contact: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [boards, setBoards] = useState<{ value: string; label: string }[]>([]);
  const [classes, setClasses] = useState<{ value: string; label: string }[]>([]);
  const [mediums, setMediums] = useState<{ value: string; label: string }[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [classesError, setClassesError] = useState<string | null>(null);

  // Fetch boards and mediums on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoadingOptions(true);
        setError('');
        const [boardsData, mediumsData] = await Promise.all([
          contentService.getBoards(),
          contentService.getMediums(),
        ]);

        // Transform API responses to dropdown options
        setBoards(
          boardsData.map((board) => ({
            value: board.name,
            label: board.name,
          }))
        );
        setMediums(
          mediumsData.map((medium) => ({
            value: medium.name,
            label: medium.name,
          }))
        );
      } catch (err: any) {
        console.error('Error fetching options:', err);
        setError(err.message || 'Failed to load options. Please refresh the page.');
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch classes when both board and medium are selected
  useEffect(() => {
    if (formData.board && formData.medium) {
      const fetchClasses = async () => {
        try {
          setLoadingClasses(true);
          setClassesError(null);
          setClasses([]); // Clear previous classes
          
          // Reset class selection when board or medium changes
          setFormData((prev) => ({ ...prev, class_name: '' }));

          const classesData = await contentService.getClasses(formData.board, formData.medium);
          
          setClasses(
            classesData.map((cls) => ({
              value: cls.name,
              label: cls.name,
            }))
          );
        } catch (err: any) {
          console.error('Error fetching classes:', err);
          setClassesError(err.message || 'Failed to load classes. Please try again.');
          setClasses([]);
        } finally {
          setLoadingClasses(false);
        }
      };

      fetchClasses();
    } else {
      // Reset classes if board or medium is deselected
      setClasses([]);
      setClassesError(null);
      setFormData((prev) => ({ ...prev, class_name: '' }));
    }
  }, [formData.board, formData.medium]);

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.school.trim() !== '' &&
      formData.board.trim() !== '' &&
      formData.class_name.trim() !== '' &&
      formData.medium.trim() !== '' &&
      formData.age.trim() !== '' &&
      formData.location.trim() !== '' &&
      formData.contact.trim() !== '' &&
      formData.guardian_contact.trim() !== ''
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
      navigate('/dashboard');
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
            <Select
              label="Board *"
              placeholder="Select board"
              value={formData.board}
              options={boards}
              onChange={(value) => handleChange('board', value)}
              disabled={loadingOptions}
            />
            <Select
              label="Medium *"
              placeholder="Select medium"
              value={formData.medium}
              options={mediums}
              onChange={(value) => handleChange('medium', value)}
              disabled={loadingOptions}
            />
            <Select
              label="Class *"
              placeholder={
                !formData.board || !formData.medium
                  ? 'Select board and medium first'
                  : loadingClasses
                  ? 'Loading classes...'
                  : classes.length === 0 && !loadingClasses
                  ? 'No classes available'
                  : 'Select class'
              }
              value={formData.class_name}
              options={classes}
              onChange={(value) => handleChange('class_name', value)}
              disabled={loadingOptions || loadingClasses || !formData.board || !formData.medium || classes.length === 0}
            />
            {classesError && (
              <div className="error-message" style={{ marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
                {classesError}
              </div>
            )}
            {formData.board && formData.medium && !loadingClasses && classes.length === 0 && !classesError && (
              <div style={{ color: '#666', fontSize: '0.875rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
                No classes available for {formData.board} - {formData.medium}
              </div>
            )}
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
              label="Confirm your number *"
              placeholder="+91 9876543210"
              value={formData.contact}
              onChange={(value) => handleChange('contact', value)}
              type="tel"
            />
            <TextField
              label="Guardian's Phone Number *"
              placeholder="+91 9876543210"
              value={formData.guardian_contact}
              onChange={(value) => handleChange('guardian_contact', value)}
              type="tel"
            />
            {error && <div className="error-message">{error}</div>}
            <PrimaryButton
              label={loading ? 'Saving...' : 'Complete Profile'}
              onClick={handleSubmit}
              disabled={!isFormValid() || loading || loadingOptions}
            />
          </div>
        </AuthCard>
      </div>
    </div>
  );
}

