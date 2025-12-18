import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface TestConfig {
  chapter: string;
  duration: string;
}

export function TestInstructionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  
  // Get test config from navigation state or use defaults
  const testConfig: TestConfig = location.state?.testConfig || {
    chapter: 'Mathematics- Surface Area and Volume',
    duration: '30 minutes',
  };

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartTest = () => {
    // TODO: Navigate to actual test taking screen
    console.log('Starting test with config:', testConfig);
    // For now, navigate back to test page
    navigate('/test');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="test-instructions__content">
            <div className="test-instructions__section">
              <div className="test-instructions__section-header">
                <span className="test-instructions__section-icon">📄</span>
                <h3 className="test-instructions__section-title">Question Paper Structure</h3>
              </div>
              <div className="test-instructions__section-body">
                <div className="test-instructions__bullet-item">
                  <span className="test-instructions__bullet-icon">📄</span>
                  <p>This question paper consists of 9 questions, all of which are compulsory.</p>
                </div>
                <div className="test-instructions__bullet-item">
                  <span className="test-instructions__bullet-icon">📄</span>
                  <p>The paper is divided into six sections — A, B, C, D, E, and F.</p>
                </div>
              </div>
            </div>
            <div className="test-instructions__note">
              <div className="test-instructions__note-header">
                <span className="test-instructions__note-icon">ℹ️</span>
                <h4 className="test-instructions__note-title">Important Note</h4>
              </div>
              <p className="test-instructions__note-text">
                All 9 questions in this paper are compulsory. Make sure to attempt every question within the given time limit.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="test-instructions__content">
            <div className="test-instructions__section">
              <div className="test-instructions__section-header">
                <span className="test-instructions__section-icon test-instructions__section-icon--purple">📊</span>
                <h3 className="test-instructions__section-title">Section Breakdown</h3>
              </div>
              <div className="test-instructions__section-body">
                <div className="test-instructions__breakdown-item">
                  <span className="test-instructions__breakdown-icon">📊</span>
                  <p>Section A: Questions 1 to 7 are Multiple Choice Questions (MCQs), each carrying 1 mark.</p>
                </div>
                <div className="test-instructions__breakdown-item">
                  <span className="test-instructions__breakdown-icon">📊</span>
                  <p>Section B: Questions 8 to 9 are Very Short Answer type questions, each carrying 2 marks.</p>
                </div>
                <div className="test-instructions__breakdown-item">
                  <span className="test-instructions__breakdown-icon">📊</span>
                  <p>Section C: Question 10 is Short Answer type question carrying 3 marks.</p>
                </div>
                <div className="test-instructions__breakdown-item">
                  <span className="test-instructions__breakdown-icon">📊</span>
                  <p>Section D: Question 11 is a Long Answer (LA) type question carrying 5 marks.</p>
                </div>
                <div className="test-instructions__breakdown-item">
                  <span className="test-instructions__breakdown-icon">📊</span>
                  <p>Section E: Question 12 is a Case/Source-based question with three sub-questions, carrying total of 4 marks.</p>
                </div>
              </div>
            </div>
            <div className="test-instructions__summary">
              <div className="test-instructions__summary-box test-instructions__summary-box--blue">
                <div className="test-instructions__summary-number">7</div>
                <div className="test-instructions__summary-label">MCQs</div>
              </div>
              <div className="test-instructions__summary-box test-instructions__summary-box--green">
                <div className="test-instructions__summary-number">2</div>
                <div className="test-instructions__summary-label">Very Short</div>
              </div>
              <div className="test-instructions__summary-box test-instructions__summary-box--yellow">
                <div className="test-instructions__summary-number">1</div>
                <div className="test-instructions__summary-label">Short</div>
              </div>
              <div className="test-instructions__summary-box test-instructions__summary-box--red">
                <div className="test-instructions__summary-number">1</div>
                <div className="test-instructions__summary-label">Long</div>
              </div>
              <div className="test-instructions__summary-box test-instructions__summary-box--purple">
                <div className="test-instructions__summary-number">1</div>
                <div className="test-instructions__summary-label">Case-based</div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="test-instructions__content">
            <div className="test-instructions__section">
              <div className="test-instructions__section-header">
                <span className="test-instructions__section-icon">📄</span>
                <h3 className="test-instructions__section-title">Ready to Begin?</h3>
              </div>
              <div className="test-instructions__section-body">
                <div className="test-instructions__guidelines">
                  <div className="test-instructions__guidelines-header">
                    <span className="test-instructions__guidelines-icon">📄</span>
                    <h4 className="test-instructions__guidelines-title">Important Guidelines</h4>
                  </div>
                  <div className="test-instructions__guidelines-list">
                    <div className="test-instructions__guideline-item">
                      <span className="test-instructions__guideline-icon">📄</span>
                      <p>Read each question carefully before answering</p>
                    </div>
                    <div className="test-instructions__guideline-item">
                      <span className="test-instructions__guideline-icon">🕐</span>
                      <p>Manage your time wisely across all sections</p>
                    </div>
                    <div className="test-instructions__guideline-item">
                      <span className="test-instructions__guideline-icon">ℹ️</span>
                      <p>All questions are compulsory</p>
                    </div>
                  </div>
                </div>
                <div className="test-instructions__ready">
                  <div className="test-instructions__ready-header">
                    <span className="test-instructions__ready-icon">⚡</span>
                    <h4 className="test-instructions__ready-title">You're All Set!</h4>
                  </div>
                  <div className="test-instructions__ready-details">
                    <p>Duration: {testConfig.duration} - Total Marks: 19</p>
                    <p>Click "Start Test" below when you're ready to begin. The timer will start immediately.</p>
                  </div>
                  <button
                    className="test-instructions__start-btn"
                    type="button"
                    onClick={handleStartTest}
                  >
                    Start Test →
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page page--test-instructions">
      <div className="page__backdrop" />
      <div className="page__content">
        <div className="test-instructions">
          {/* Header */}
          <header className="test-instructions__header">
            <h1 className="test-instructions__header-title">INSTRUCTIONS</h1>
            <h2 className="test-instructions__header-subtitle">Test Instructions</h2>
            <p className="test-instructions__header-text">
              Please read the following instructions carefully before starting the test.
            </p>
          </header>

          {/* Progress Indicator */}
          <div className="test-instructions__progress">
            {[1, 2, 3].map((step) => (
              <div key={step} className="test-instructions__progress-step">
                {currentStep > step ? (
                  <div className="test-instructions__progress-check">✓</div>
                ) : (
                  <div
                    className={`test-instructions__progress-number ${
                      currentStep === step ? 'test-instructions__progress-number--active' : ''
                    }`}
                  >
                    {step}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="test-instructions__panel">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="test-instructions__navigation">
            <button
              className={`test-instructions__nav-btn test-instructions__nav-btn--prev ${
                currentStep === 1 ? 'test-instructions__nav-btn--disabled' : ''
              }`}
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              ← Previous
            </button>
            {currentStep < totalSteps && (
              <button
                className="test-instructions__nav-btn test-instructions__nav-btn--next"
                type="button"
                onClick={handleNext}
              >
                Next →
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="test-instructions__footer">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </div>
    </div>
  );
}

