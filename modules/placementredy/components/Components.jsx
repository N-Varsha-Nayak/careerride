import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', disabled = false, ...props }) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  
  return (
    <button 
      className={`btn ${variantClass} ${sizeClass}`.trim()} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, error, helpText, ...props }) => {
  const id = props.id || props.name;
  
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className={`form-label ${props.required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      <input 
        id={id}
        className={`form-input ${error ? 'with-error' : ''}`.trim()}
        {...props}
      />
      {helpText && !error && <div className="form-help">{helpText}</div>}
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export const Textarea = ({ label, error, helpText, ...props }) => {
  const id = props.id || props.name;
  
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className={`form-label ${props.required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      <textarea 
        id={id}
        className={`form-textarea ${error ? 'with-error' : ''}`.trim()}
        {...props}
      />
      {helpText && !error && <div className="form-help">{helpText}</div>}
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export const Select = ({ label, options, error, helpText, ...props }) => {
  const id = props.id || props.name;
  
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className={`form-label ${props.required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      <select 
        id={id}
        className={`form-select ${error ? 'with-error' : ''}`.trim()}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && !error && <div className="form-help">{helpText}</div>}
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export const Card = ({ title, subtitle, children, footer = null }) => {
  return (
    <div className="card">
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      {children && <div className="card-body">{children}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export const Badge = ({ children, variant = 'default' }) => {
  const variantClass = variant !== 'default' ? `badge-${variant}` : '';
  
  return (
    <span className={`badge ${variantClass}`.trim()}>
      {children}
    </span>
  );
};

export const Alert = ({ type = 'info', title, children }) => {
  const iconMap = {
    success: '✓',
    warning: '⚠',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-icon">{iconMap[type]}</div>
      <div className="alert-content">
        {title && <div className="alert-title">{title}</div>}
        {children && <div className="alert-description">{children}</div>}
      </div>
    </div>
  );
};

export const Progress = ({ value, max = 100 }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${percentage}%` }} />
    </div>
  );
};

export const Divider = () => {
  return <div className="divider" />;
};

// Utility components
export const Text = ({ variant = 'default', children, className = '' }) => {
  const classes = {
    muted: 'text-muted',
    accent: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  };

  const textClass = classes[variant] || '';
  
  return <p className={`${textClass} ${className}`.trim()}>{children}</p>;
};
