import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const displayName = user?.name || 'Ayush Sharma';
  const studentClass = user?.class_name || 'Class 10';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
              <button className="dashboard__nav-item" type="button">
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
                  {(user?.name?.charAt(0) || 'A').toUpperCase()}
                </div>
                <div className="dashboard__user-meta">
                  <div className="dashboard__user-name">{displayName}</div>
                  <div className="dashboard__user-class">{studentClass}</div>
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
                <button className="dashboard__icon-button" type="button" aria-label="Toggle theme">
                  ☀️
                </button>
              </div>
            </header>

            {/* Subjects row */}
            <section className="dashboard__subjects">
              <article className="subject-card subject-card--active">
                <div className="subject-card__header">
                  <div>
                    <h3 className="subject-card__title">Mathematics</h3>
                    <p className="subject-card__topic">Active: Surface Area and Volume</p>
                  </div>
                  <span className="subject-card__status">Active</span>
                </div>
                <div className="subject-card__progress">
                  <div className="subject-card__progress-bar">
                    <div className="subject-card__progress-fill" style={{ width: '62%' }} />
                  </div>
                  <span className="subject-card__progress-value">62%</span>
                </div>
              </article>

              <article className="subject-card">
                <div className="subject-card__header">
                  <div>
                    <h3 className="subject-card__title">Science</h3>
                    <p className="subject-card__topic">Active: Electricity</p>
                  </div>
                  <span className="subject-card__status">Active</span>
                </div>
                <div className="subject-card__progress">
                  <div className="subject-card__progress-bar">
                    <div className="subject-card__progress-fill" style={{ width: '48%' }} />
                  </div>
                  <span className="subject-card__progress-value">48%</span>
                </div>
              </article>

              <article className="subject-card">
                <div className="subject-card__header">
                  <div>
                    <h3 className="subject-card__title">Social Science</h3>
                    <p className="subject-card__topic">Active</p>
                  </div>
                  <span className="subject-card__status">Active</span>
                </div>
                <div className="subject-card__progress">
                  <div className="subject-card__progress-bar">
                    <div className="subject-card__progress-fill" style={{ width: '40%' }} />
                  </div>
                  <span className="subject-card__progress-value">40%</span>
                </div>
              </article>

              <article className="subject-card">
                <div className="subject-card__header">
                  <div>
                    <h3 className="subject-card__title">Hindi</h3>
                    <p className="subject-card__topic">Active: Electricity</p>
                  </div>
                  <span className="subject-card__status">Active</span>
                </div>
                <div className="subject-card__progress">
                  <div className="subject-card__progress-bar">
                    <div className="subject-card__progress-fill" style={{ width: '32%' }} />
                  </div>
                  <span className="subject-card__progress-value">32%</span>
                </div>
              </article>

              <article className="subject-card">
                <div className="subject-card__header">
                  <div>
                    <h3 className="subject-card__title">English</h3>
                    <p className="subject-card__topic">Active: Electricity</p>
                  </div>
                  <span className="subject-card__status">Active</span>
                </div>
                <div className="subject-card__progress">
                  <div className="subject-card__progress-bar">
                    <div className="subject-card__progress-fill" style={{ width: '20%' }} />
                  </div>
                  <span className="subject-card__progress-value">20%</span>
                </div>
              </article>
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
                  onClick={() => navigate('/home')}
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
      </div>
    </div>
  );
}
