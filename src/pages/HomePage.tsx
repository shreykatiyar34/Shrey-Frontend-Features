import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="page">
      <div className="page__backdrop" />
      <div className="page__content page__content--wide">
        <div className="homepage">
          {/* Header */}
          <header className="homepage__header">
            <div className="homepage__branding">
              <h1 className="homepage__logo">
                Student<span className="homepage__logo--accent">Platform</span>
              </h1>
            </div>
            <button className="homepage__logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </header>

          {/* Welcome Section */}
          <section className="homepage__welcome">
            <h2 className="homepage__title">
              Welcome back, <span className="homepage__title--accent">{user?.name || 'Student'}!</span>
            </h2>
            <p className="homepage__subtitle">
              Ready to continue your learning journey? Let's make today count.
            </p>
          </section>

          {/* Quick Stats */}
          <section className="homepage__stats">
            <div className="stat-card">
              <div className="stat-card__icon">📚</div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">0</h3>
                <p className="stat-card__label">Courses Enrolled</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">✅</div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">0</h3>
                <p className="stat-card__label">Completed</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">🎯</div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">0</h3>
                <p className="stat-card__label">Achievements</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">🔥</div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">0</h3>
                <p className="stat-card__label">Day Streak</p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="homepage__main">
            {/* Quick Actions */}
            <div className="homepage__section">
              <h3 className="homepage__section-title">Quick Actions</h3>
              <div className="action-cards">
                <button className="action-card" onClick={() => navigate('/dashboard')}>
                  <div className="action-card__icon">👤</div>
                  <h4 className="action-card__title">My Profile</h4>
                  <p className="action-card__description">
                    View and edit your profile information
                  </p>
                </button>
                <button className="action-card">
                  <div className="action-card__icon">📖</div>
                  <h4 className="action-card__title">Browse Courses</h4>
                  <p className="action-card__description">
                    Explore available courses and start learning
                  </p>
                </button>
                <button className="action-card">
                  <div className="action-card__icon">📝</div>
                  <h4 className="action-card__title">Take Tests</h4>
                  <p className="action-card__description">
                    Practice with quizzes and assessments
                  </p>
                </button>
                <button className="action-card">
                  <div className="action-card__icon">📊</div>
                  <h4 className="action-card__title">View Progress</h4>
                  <p className="action-card__description">
                    Track your learning progress and scores
                  </p>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="homepage__section">
              <h3 className="homepage__section-title">Continue Learning</h3>
              <div className="activity-card">
                <div className="activity-card__empty">
                  <div className="activity-card__empty-icon">🚀</div>
                  <h4 className="activity-card__empty-title">Start Your Journey</h4>
                  <p className="activity-card__empty-text">
                    You haven't started any courses yet. Browse our catalog to begin!
                  </p>
                  <button className="activity-card__empty-btn">Explore Courses</button>
                </div>
              </div>
            </div>
          </section>

          {/* Profile Card */}
          {user && (
            <aside className="homepage__sidebar">
              <div className="profile-card">
                <div className="profile-card__header">
                  <div className="profile-card__avatar">
                    {user.name?.charAt(0).toUpperCase() || 'S'}
                  </div>
                  <div className="profile-card__info">
                    <h4 className="profile-card__name">{user.name}</h4>
                    <p className="profile-card__id">ID: {user.student_id}</p>
                  </div>
                </div>
                <div className="profile-card__details">
                  {user.school && (
                    <div className="profile-card__detail">
                      <span className="profile-card__label">🏫 School:</span>
                      <span className="profile-card__value">{user.school}</span>
                    </div>
                  )}
                  {user.class_name && (
                    <div className="profile-card__detail">
                      <span className="profile-card__label">📚 Class:</span>
                      <span className="profile-card__value">{user.class_name}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="profile-card__detail">
                      <span className="profile-card__label">📍 Location:</span>
                      <span className="profile-card__value">{user.location}</span>
                    </div>
                  )}
                </div>
                <button 
                  className="profile-card__btn"
                  onClick={() => navigate('/dashboard')}
                >
                  View Full Profile
                </button>
              </div>

              {/* Tips Card */}
              <div className="tips-card">
                <h4 className="tips-card__title">💡 Quick Tip</h4>
                <p className="tips-card__text">
                  Set daily learning goals to stay consistent and track your progress effectively!
                </p>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

