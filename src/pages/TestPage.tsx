import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export function TestPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');

  const handleStartTest = () => {
    if (!selectedChapter || !selectedDuration) {
      alert('Please select both chapter and test duration');
      return;
    }
    
    // Find selected chapter and duration labels
    const chapterLabel = chapters.find((ch) => ch.value === selectedChapter)?.label || selectedChapter;
    const durationLabel = testDurations.find((d) => d.value === selectedDuration)?.label || selectedDuration;
    
    // Navigate to instructions page with test config
    navigate('/test-instructions', {
      state: {
        testConfig: {
          chapter: chapterLabel,
          duration: durationLabel,
        },
      },
    });
  };

  const testDurations = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '60 minutes' },
  ];

  // Mock chapters - replace with actual API call
  const chapters = [
    { value: '1', label: 'Chapter 1: Introduction' },
    { value: '2', label: 'Chapter 2: Basics' },
    { value: '3', label: 'Chapter 3: Advanced Topics' },
  ];

  return (
    <div className="page page--test">
      <div className="page__backdrop" />
      <div className="page__content page__content--wide">
        <div className="test-page">
          {/* Sidebar */}
          <aside className="test-page__sidebar">
            <div className="test-page__logo">
              <div className="test-page__logo-square">k</div>
            </div>

            <nav className="test-page__nav">
              <button
                className="test-page__nav-item"
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
                className="test-page__nav-item test-page__nav-item--active"
                type="button"
                title="Tests"
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
                className="test-page__nav-item"
                type="button"
                title="Study"
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
                className="test-page__nav-item"
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
                className="test-page__nav-item"
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

            <div className="test-page__sidebar-footer">
              <button
                className="test-page__theme-toggle"
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </aside>

          {/* Main content */}
          <main className="test-page__main">
            <header className="test-page__header">
              <button className="test-page__test-pill" type="button">
                <span className="test-page__test-icon">⚡</span>
                <span>TEST</span>
              </button>
              <div className="test-page__header-content">
                <h1 className="test-page__title">Start a New Test</h1>
                <p className="test-page__subtitle">
                  Choose your chapter and test duration to begin. Your progress will be saved automatically.
                </p>
              </div>
            </header>

            {/* Test Configuration Card */}
            <section className="test-page__config-card">
              <div className="test-page__config-field">
                <label className="test-page__config-label">
                  <span className="test-page__config-icon">📖</span>
                  CHAPTER
                </label>
                <div className="test-page__select-wrapper">
                  <select
                    className="test-page__select"
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                  >
                    <option value="">Select Chapter</option>
                    {chapters.map((chapter) => (
                      <option key={chapter.value} value={chapter.value}>
                        {chapter.label}
                      </option>
                    ))}
                  </select>
                  <span className="test-page__select-arrow">▼</span>
                </div>
              </div>

              <div className="test-page__config-field">
                <label className="test-page__config-label">
                  <span className="test-page__config-icon">🕐</span>
                  TEST DURATION
                </label>
                <div className="test-page__select-wrapper">
                  <select
                    className="test-page__select"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                  >
                    <option value="">Select Test Duration</option>
                    {testDurations.map((duration) => (
                      <option key={duration.value} value={duration.value}>
                        {duration.label}
                      </option>
                    ))}
                  </select>
                  <span className="test-page__select-arrow">▼</span>
                </div>
              </div>

              <button
                className="test-page__start-btn"
                type="button"
                onClick={handleStartTest}
                disabled={!selectedChapter || !selectedDuration}
              >
                Select Chapter and Duration
              </button>
            </section>

            {/* Additional Options */}
            <section className="test-page__options">
              <button className="test-page__option-card" type="button">
                <div className="test-page__option-content">
                  <div className="test-page__option-icon">🕐</div>
                  <div className="test-page__option-text">
                    <h3 className="test-page__option-title">Practice Mode</h3>
                    <p className="test-page__option-subtitle">Unlimited time for learning</p>
                  </div>
                </div>
                <span className="test-page__option-arrow">→</span>
              </button>

              <button 
                className="test-page__option-card" 
                type="button"
                onClick={() => navigate('/test-history')}
              >
                <div className="test-page__option-content">
                  <div className="test-page__option-icon">👤</div>
                  <div className="test-page__option-text">
                    <h3 className="test-page__option-title">Previous Tests</h3>
                    <p className="test-page__option-subtitle">Review your past attempts</p>
                  </div>
                </div>
                <span className="test-page__option-arrow">→</span>
              </button>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

