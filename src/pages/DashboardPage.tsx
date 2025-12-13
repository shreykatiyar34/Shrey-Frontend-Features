import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PrimaryButton } from '../components/PrimaryButton';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="page">
      <div className="page__backdrop" />
      <div className="page__content">
        <div className="dashboard">
          <div className="dashboard__header">
            <h1 className="dashboard__title">
              Welcome to your <span className="dashboard__title--accent">Dashboard</span>
            </h1>
            {user && (
              <div className="dashboard__user-info">
                <p className="dashboard__greeting">Hello, {user.name || 'Student'}!</p>
              </div>
            )}
          </div>

          <div className="dashboard__content">
            <div className="dashboard__card">
              <h2 className="dashboard__card-title">Your Profile</h2>
              {user && (
                <div className="dashboard__profile">
                  <div className="dashboard__profile-item">
                    <span className="dashboard__profile-label">Student ID:</span>
                    <span className="dashboard__profile-value">{user.student_id}</span>
                  </div>
                  {user.name && (
                    <div className="dashboard__profile-item">
                      <span className="dashboard__profile-label">Name:</span>
                      <span className="dashboard__profile-value">{user.name}</span>
                    </div>
                  )}
                  {user.school && (
                    <div className="dashboard__profile-item">
                      <span className="dashboard__profile-label">School:</span>
                      <span className="dashboard__profile-value">{user.school}</span>
                    </div>
                  )}
                  {user.class_name && (
                    <div className="dashboard__profile-item">
                      <span className="dashboard__profile-label">Class:</span>
                      <span className="dashboard__profile-value">{user.class_name}</span>
                    </div>
                  )}
                  {user.age && (
                    <div className="dashboard__profile-item">
                      <span className="dashboard__profile-label">Age:</span>
                      <span className="dashboard__profile-value">{user.age}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="dashboard__profile-item">
                      <span className="dashboard__profile-label">Location:</span>
                      <span className="dashboard__profile-value">{user.location}</span>
                    </div>
                  )}
                  {user.contact && (
                    <div className="dashboard__profile-item">
                      <span className="dashboard__profile-label">Contact:</span>
                      <span className="dashboard__profile-value">{user.contact}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="dashboard__card">
              <h2 className="dashboard__card-title">Quick Actions</h2>
              <div className="dashboard__actions">
                <p>Your learning journey starts here!</p>
                {/* Add more dashboard features here */}
              </div>
            </div>
          </div>

          <div className="dashboard__footer">
            <PrimaryButton label="Logout" onClick={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
}

