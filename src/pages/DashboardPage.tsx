import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import authService from '../services/authService';
import contentService from '../services/contentService';
import type { Subject } from '../services/contentService';
import type { UserInfo } from '../services/authService';

export function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [userProfile, setUserProfile] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [subjectsError, setSubjectsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1: Check first time user to get student_id
        const firstTimeCheck = await authService.checkFirstTimeUser();
        
        if (!firstTimeCheck.student_id) {
          throw new Error('Student ID not found');
        }

        // Step 2: Get user profile using student_id
        const profileResponse = await authService.getUserById(firstTimeCheck.student_id);
        
        // Debug: Log the response to see the structure
        console.log('Profile Response:', profileResponse);
        
        // Extract profile data - it might be nested in profile field or directly in response
        // Check if profile exists and is not empty
        let profile = profileResponse.profile;
        
        // If profile is an empty object or doesn't exist, try using the response directly
        if (!profile || (typeof profile === 'object' && Object.keys(profile).length === 0)) {
          profile = profileResponse;
        }
        
        // Debug: Log the extracted profile
        console.log('Extracted Profile:', profile);
        console.log('Profile keys:', profile ? Object.keys(profile) : 'No profile');
        
        // Transform to UserInfo format if needed
        // Handle different possible field names and structures
        const userData: UserInfo = {
          student_id: profileResponse.student_id || firstTimeCheck.student_id,
          name: profile?.name || profile?.full_name || profile?.user_name || profile?.username || '',
          school: profile?.school || profile?.school_name || '',
          class_name: profile?.class_name || profile?.class || profile?.grade || '',
          age: profile?.age || '',
          location: profile?.location || profile?.city || '',
          contact: profile?.contact || profile?.phone || profile?.phone_number || '',
          email: profile?.email || '',
          phone: profile?.phone || profile?.phone_number || '',
          is_first_time_user: firstTimeCheck.is_first_time_user,
          ...(profile || {}),
        };

        // Debug: Log the final user data
        console.log('Final User Data:', userData);

        setUserProfile(userData);
      } catch (err: any) {
        console.error('Failed to fetch user profile:', err);
        setError(err.response?.data?.detail || err.message || 'Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch subjects based on board, medium, and class
  const fetchSubjects = useCallback(async (boardName: string, mediumName: string, className: string) => {
    try {
      setLoadingSubjects(true);
      setSubjectsError(null);
      const subjectsData = await contentService.getSubjects(boardName, mediumName, className);
      setSubjects(subjectsData);
    } catch (err: any) {
      console.error('Failed to fetch subjects:', err);
      setSubjectsError(err.message || 'Failed to load subjects');
      setSubjects([]);
    } finally {
      setLoadingSubjects(false);
    }
  }, []);

  // Fetch subjects when user profile is loaded and has board, medium, and class
  useEffect(() => {
    if (userProfile?.board && userProfile?.medium && userProfile?.class_name) {
      fetchSubjects(userProfile.board, userProfile.medium, userProfile.class_name);
    } else {
      // Clear subjects if profile is incomplete
      setSubjects([]);
      setSubjectsError(null);
    }
  }, [userProfile?.board, userProfile?.medium, userProfile?.class_name, fetchSubjects]);

  const displayName = userProfile?.name || 'User';
  const studentClass = userProfile?.class_name || '';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="page page--dashboard">
        <div className="page__backdrop" />
        <div className="page__content page__content--wide">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page page--dashboard">
        <div className="page__backdrop" />
        <div className="page__content page__content--wide">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
            <div className="error-message" style={{ marginBottom: '1rem' }}>{error}</div>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page--dashboard">
      <div className="page__backdrop" />
      <div className="page__content page__content--wide">
        <div className="dashboard">
          {/* Sidebar */}
          <aside className="dashboard__sidebar">
            <div className="dashboard__logo">
              <span className="dashboard__logo-main">ky</span>
              <span className="dashboard__logo-secondary">ourious.ai</span>
            </div>

            <div className="dashboard__mode-toggle">
              <button className="dashboard__mode-btn dashboard__mode-btn--active" type="button">
                Learn Mode
              </button>
              <button className="dashboard__mode-btn" type="button">
                Exam Mode
              </button>
            </div>

            <nav className="dashboard__nav">
              <button className="dashboard__nav-item dashboard__nav-item--active" type="button">
                Dashboard
              </button>
            </nav>

            <div className="dashboard__section-label">Chapter Focus</div>
            <nav className="dashboard__nav dashboard__nav--secondary">
              <button 
                className="dashboard__nav-item" 
                type="button"
                onClick={() => navigate('/test')}
              >
                Test
              </button>
              <button className="dashboard__nav-item" type="button">
                Revision
              </button>
              <button className="dashboard__nav-item" type="button">
                Progress
              </button>
            </nav>

            <div className="dashboard__sidebar-footer">
              <div className="dashboard__user-chip">
                <div className="dashboard__user-avatar">
                  {(userProfile?.name?.charAt(0) || 'U').toUpperCase()}
                </div>
                <div className="dashboard__user-meta">
                  <div className="dashboard__user-name">{displayName}</div>
                  <div className="dashboard__user-class">{studentClass || 'Not set'}</div>
                </div>
              </div>
              <button className="dashboard__logout-btn" type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </aside>

          {/* Main content */}
          <main className="dashboard__main">
            <header className="dashboard__main-header">
              <div>
                <p className="dashboard__welcome">Hi, {displayName}</p>
                <p className="dashboard__subtitle">Let&apos;s keep your learning streak going.</p>
              </div>
              <div className="dashboard__main-header-right">
                <button className="dashboard__level-pill" type="button">
                  Level 1 Explorer
                </button>
                <button 
                  className="dashboard__icon-button" 
                  type="button" 
                  aria-label="Toggle theme"
                  onClick={toggleTheme}
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </div>
            </header>

            {/* Subjects row */}
            <section className="dashboard__subjects">
              {loadingSubjects ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                  Loading subjects...
                </div>
              ) : subjectsError ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#d32f2f' }}>
                  {subjectsError}
                </div>
              ) : subjects.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                  {userProfile?.board && userProfile?.medium && userProfile?.class_name
                    ? 'No subjects available for your board, medium, and class combination.'
                    : 'Please complete your profile (board, medium, and class) to see subjects.'}
                </div>
              ) : (
                subjects.map((subject, index) => (
                  <article
                    key={subject.id || index}
                    className={`subject-card ${index === 0 ? 'subject-card--active' : ''}`}
                  >
                    <div className="subject-card__header">
                      <div>
                        <h3 className="subject-card__title">{subject.name}</h3>
                        <p className="subject-card__topic">
                          {subject.code ? `Code: ${subject.code}` : 'Active'}
                        </p>
                      </div>
                      <span className="subject-card__status">Active</span>
                    </div>
                    <div className="subject-card__progress">
                      <div className="subject-card__progress-bar">
                        {/* Placeholder progress - can be replaced with actual progress data when available */}
                        <div
                          className="subject-card__progress-fill"
                          style={{ width: `${Math.floor(Math.random() * 50 + 20)}%` }}
                        />
                      </div>
                      <span className="subject-card__progress-value">
                        {Math.floor(Math.random() * 50 + 20)}%
                      </span>
                    </div>
                  </article>
                ))
              )}
            </section>

            {/* Mastery section */}
            <section className="dashboard__mastery">
              <div className="dashboard__mastery-text">
                <p className="dashboard__mastery-label">Analyzing performance</p>
                <h2 className="dashboard__mastery-title">
                  Mastery in <span>Mathematics</span>
                </h2>
                <button
                  className="dashboard__primary-btn"
                  type="button"
                  onClick={() => navigate('/dashboard')}
                >
                  View Report card
                </button>
              </div>
              <div className="dashboard__mastery-meter">
                <div className="dashboard__progress-circle">
                  <span className="dashboard__progress-circle-value">25%</span>
                </div>
              </div>
            </section>

            {/* Bottom stats */}
            <section className="dashboard__stats-row">
              <article className="dashboard-stat-card">
                <h3 className="dashboard-stat-card__label">Active Weakness</h3>
                <p className="dashboard-stat-card__value">3</p>
                <p className="dashboard-stat-card__hint">Study and practice</p>
              </article>
              <article className="dashboard-stat-card">
                <h3 className="dashboard-stat-card__label">Current Streak</h3>
                <p className="dashboard-stat-card__value">5</p>
                <p className="dashboard-stat-card__hint">Keep it up</p>
              </article>
              <article className="dashboard-stat-card">
                <h3 className="dashboard-stat-card__label">Tests Taken</h3>
                <p className="dashboard-stat-card__value">14</p>
                <p className="dashboard-stat-card__hint">Total this month</p>
              </article>
            </section>
          </main>
        </div>
      </main>
    </div>
  );
}
