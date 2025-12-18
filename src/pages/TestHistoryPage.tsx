import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface TestResult {
  id: string;
  title: string;
  duration: string;
  totalMarks: number;
  date: string;
  score?: number;
  obtainedMarks?: number;
  status: 'completed' | 'in-progress';
  grade?: 'pass' | 'excellent';
  progress?: number;
  trend?: 'up' | 'down';
}

export function TestHistoryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Mock data - replace with actual API call
  const [testResults] = useState<TestResult[]>([
    {
      id: '1',
      title: 'Mathematics- Surface Area and Volume',
      duration: '30 minutes',
      totalMarks: 19,
      date: '14/09/2025',
      obtainedMarks: 13,
      score: 68,
      status: 'completed',
      grade: 'pass',
      trend: 'down',
    },
    {
      id: '2',
      title: 'Mathematics- Surface Area and Volume',
      duration: '30 minutes',
      totalMarks: 18,
      date: '14/09/2025',
      obtainedMarks: 15,
      score: 83,
      status: 'completed',
      grade: 'excellent',
      trend: 'up',
    },
    {
      id: '3',
      title: 'Mathematics-Surface Area and Volume',
      duration: '30 minutes',
      totalMarks: 19,
      date: '14/09/2025',
      progress: 12,
      score: 58,
      status: 'in-progress',
    },
  ]);

  const stats = {
    totalTests: 2,
    averageScore: 76,
    bestScore: 83,
    inProgress: 1,
  };

  const handleResumeTest = (testId: string) => {
    // TODO: Navigate to test taking screen
    console.log('Resume test:', testId);
  };

  const handleCheckPerformance = (testId: string) => {
    // TODO: Navigate to performance analysis screen
    console.log('Check performance:', testId);
  };

  return (
    <div className="page page--test-history">
      <div className="page__backdrop" />
      <div className="page__content page__content--wide">
        <div className="test-history-page">
          {/* Sidebar */}
          <aside className="test-history-page__sidebar">
            <div className="test-history-page__logo">
              <div className="test-history-page__logo-square">k</div>
            </div>

            <nav className="test-history-page__nav">
              <button
                className="test-history-page__nav-item"
                type="button"
                onClick={() => navigate('/dashboard')}
                title="Dashboard"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 10L10 3L17 10M3 10H7V17H13V10H17M3 10L10 17L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="test-history-page__nav-item test-history-page__nav-item--active"
                type="button"
                title="Test History"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M10 6V10L13 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                className="test-history-page__nav-item"
                type="button"
                onClick={() => navigate('/test')}
                title="Start Test"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 4H16V16H4V4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 8H16M8 4V16"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <button
                className="test-history-page__nav-item"
                type="button"
                title="Explore"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M10 2L10 10L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                className="test-history-page__nav-item"
                type="button"
                title="Analytics"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 17V13H7V17H3ZM11 17V9H15V17H11ZM19 17V5H23V17H19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </nav>

            <div className="test-history-page__sidebar-footer">
              <button
                className="test-history-page__theme-toggle"
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <div className="test-history-page__user-avatar">
                {(user?.name?.charAt(0) || 'A').toUpperCase()}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="test-history-page__main">
            {/* Header */}
            <header className="test-history-page__header">
              <div className="test-history-page__header-left">
                <button className="test-history-page__test-pill" type="button">
                  <span>TEST</span>
                </button>
                <div className="test-history-page__header-content">
                  <h1 className="test-history-page__title">Test History</h1>
                  <p className="test-history-page__subtitle">Track your progress over time</p>
                </div>
              </div>
              <div className="test-history-page__header-right">
                <button
                  className="test-history-page__header-icon"
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <div className="test-history-page__header-avatar">
                  {(user?.name?.charAt(0) || 'A').toUpperCase()}
                </div>
              </div>
            </header>

            {/* Statistics Section */}
            <section className="test-history-page__stats">
              <div className="test-history-page__stat-card">
                <div className="test-history-page__stat-icon">📄</div>
                <div className="test-history-page__stat-content">
                  <div className="test-history-page__stat-value">{stats.totalTests}</div>
                  <div className="test-history-page__stat-label">Total Tests Completed</div>
                </div>
              </div>
              <div className="test-history-page__stat-card">
                <div className="test-history-page__stat-icon">⭕</div>
                <div className="test-history-page__stat-content">
                  <div className="test-history-page__stat-value">{stats.averageScore}%</div>
                  <div className="test-history-page__stat-label">Average Score Across all tests</div>
                </div>
              </div>
              <div className="test-history-page__stat-card">
                <div className="test-history-page__stat-icon">🏆</div>
                <div className="test-history-page__stat-content">
                  <div className="test-history-page__stat-value">{stats.bestScore}%</div>
                  <div className="test-history-page__stat-label">Best Score Personal record</div>
                </div>
              </div>
              <div className="test-history-page__stat-card">
                <div className="test-history-page__stat-icon">⚡</div>
                <div className="test-history-page__stat-content">
                  <div className="test-history-page__stat-value">{stats.inProgress}</div>
                  <div className="test-history-page__stat-label">In Progress Resume anytime</div>
                </div>
              </div>
            </section>

            {/* Momentum Banner */}
            <section className="test-history-page__momentum">
              <div className="test-history-page__momentum-icon">📈</div>
              <div className="test-history-page__momentum-content">
                <span>Keep Up the Momentum! Your average score is </span>
                <strong>{stats.averageScore}%</strong>
                <span>. You have </span>
                <strong>{stats.inProgress}</strong>
                <span> test in progress - resume to complete!</span>
              </div>
              <div className="test-history-page__momentum-icon-right">⬜</div>
            </section>

            {/* Recent Tests Section */}
            <section className="test-history-page__recent">
              <div className="test-history-page__recent-header">
                <div>
                  <h2 className="test-history-page__recent-title">Recent Tests</h2>
                  <p className="test-history-page__recent-subtitle">
                    Click on any test to view detailed analysis
                  </p>
                </div>
                <button
                  className="test-history-page__next-test-btn"
                  type="button"
                  onClick={() => navigate('/test')}
                >
                  + Next Test
                </button>
              </div>

              <div className="test-history-page__tests-list">
                {testResults.map((test) => (
                  <div key={test.id} className="test-history-page__test-card">
                    <div className="test-history-page__test-card-left">
                      <div className="test-history-page__test-card-header">
                        <h3 className="test-history-page__test-title">{test.title}</h3>
                        {test.status === 'in-progress' && (
                          <span className="test-history-page__status-pill test-history-page__status-pill--in-progress">
                            IN PROGRESS
                          </span>
                        )}
                      </div>
                      <div className="test-history-page__test-details">
                        <span>Duration: {test.duration}</span>
                        <span>Total marks: {test.totalMarks}</span>
                        <span>Test attempted on {test.date}</span>
                      </div>
                      {test.status === 'completed' ? (
                        <button
                          className="test-history-page__check-btn"
                          type="button"
                          onClick={() => handleCheckPerformance(test.id)}
                        >
                          Check Performance &gt;
                        </button>
                      ) : (
                        <div className="test-history-page__progress-section">
                          <div className="test-history-page__progress-bar">
                            <div
                              className="test-history-page__progress-fill"
                              style={{
                                width: `${((test.progress || 0) / test.totalMarks) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="test-history-page__progress-text">
                            {test.progress}/{test.totalMarks} questions
                          </span>
                          <button
                            className="test-history-page__resume-btn"
                            type="button"
                            onClick={() => handleResumeTest(test.id)}
                          >
                            <span>▶</span> Resume
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="test-history-page__test-card-right">
                      {test.status === 'completed' ? (
                        <>
                          <div className="test-history-page__score-section">
                            <div className="test-history-page__score">
                              {test.obtainedMarks}/{test.totalMarks}
                            </div>
                            <div
                              className={`test-history-page__grade test-history-page__grade--${test.grade}`}
                            >
                              {test.grade?.toUpperCase()}
                            </div>
                          </div>
                          <div className="test-history-page__percentage">
                            {test.score}%
                            {test.trend === 'up' ? (
                              <span className="test-history-page__trend test-history-page__trend--up">
                                ↗
                              </span>
                            ) : (
                              <span className="test-history-page__trend test-history-page__trend--down">
                                ↘
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="test-history-page__percentage">{test.score}%</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

