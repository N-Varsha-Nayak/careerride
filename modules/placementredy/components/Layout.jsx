import React from 'react';

export const TopBar = ({ projectName, step, totalSteps, status }) => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <h1 className="project-name">{projectName}</h1>
      </div>
      <div className="top-bar-center">
        {step && totalSteps && (
          <span className="progress-indicator">Step {step} / {totalSteps}</span>
        )}
      </div>
      <div className="top-bar-right">
        {status && (
          <div className={`status-badge ${status.toLowerCase()}`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export const ContextHeader = ({ title, subtitle }) => {
  return (
    <div className="context-header">
      <h2 className="context-header-title">{title}</h2>
      {subtitle && <p className="context-header-subtitle">{subtitle}</p>}
    </div>
  );
};

export const PrimaryWorkspace = ({ children }) => {
  return <div className="primary-workspace">{children}</div>;
};

export const SecondaryPanel = ({ children }) => {
  return <div className="secondary-panel">{children}</div>;
};

export const PanelSection = ({ title, children }) => {
  return (
    <div className="panel-section">
      {title && <h3 className="panel-section-title">{title}</h3>}
      <div className="panel-section-content">{children}</div>
    </div>
  );
};

export const PromptBox = ({ prompt }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
  };

  return (
    <div className="prompt-box">
      {prompt}
      <button className="prompt-box-copy-btn" onClick={handleCopy} title="Copy prompt">
        Copy
      </button>
    </div>
  );
};

export const ProofFooter = ({ items = [] }) => {
  const defaultItems = [
    { id: 'ui-built', label: 'UI Built' },
    { id: 'logic-working', label: 'Logic Working' },
    { id: 'test-passed', label: 'Test Passed' },
    { id: 'deployed', label: 'Deployed' },
  ];

  const proofItems = items.length > 0 ? items : defaultItems;

  return (
    <div className="proof-footer">
      <div className="proof-checklist">
        {proofItems.map((item) => (
          <div key={item.id} className="proof-item">
            <input type="checkbox" id={item.id} className="proof-checkbox" />
            <label htmlFor={item.id} className="proof-label">
              □ {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const WorkspaceContainer = ({ primaryContent, secondaryContent }) => {
  return (
    <div className="workspace-container">
      <PrimaryWorkspace>{primaryContent}</PrimaryWorkspace>
      <SecondaryPanel>{secondaryContent}</SecondaryPanel>
    </div>
  );
};
