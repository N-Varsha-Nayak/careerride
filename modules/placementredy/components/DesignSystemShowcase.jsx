import React from 'react';
import {
  TopBar,
  ContextHeader,
  WorkspaceContainer,
  PanelSection,
  PromptBox,
  ProofFooter,
} from './Layout';
import {
  Button,
  Input,
  Textarea,
  Select,
  Card,
  Badge,
  Alert,
  Progress,
  Divider,
  Text,
} from './Components';

export const DesignSystemShowcase = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText('Design your UI with KodNest Premium');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const primaryContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      {/* Buttons Section */}
      <Card title="Buttons" subtitle="Primary, Secondary, and Tertiary actions">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="tertiary">Tertiary Button</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </Card>

      {/* Form Inputs Section */}
      <Card title="Form Inputs" subtitle="Text, textarea, and select inputs">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          helpText="We'll never share your email"
        />
        <Textarea
          label="Project Description"
          placeholder="Tell us about your project..."
          helpText="Be descriptive and clear"
        />
        <Select
          label="Project Type"
          options={[
            { value: 'web', label: 'Web Application' },
            { value: 'mobile', label: 'Mobile App' },
            { value: 'desktop', label: 'Desktop App' },
          ]}
        />
        <Input
          label="With Error"
          type="text"
          error="This field is required"
        />
      </Card>

      {/* Cards Section */}
      <Card title="Cards" subtitle="Card component with various content types">
        <Card title="Nested Card" subtitle="Cards can be nested for content organization">
          <p>This is content inside a nested card. Cards maintain consistent padding and borders throughout the system.</p>
        </Card>
      </Card>

      {/* Badges & Status */}
      <Card title="Badges & Status" subtitle="Visual indicators for states">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="accent">Accent</Badge>
        </div>
      </Card>

      {/* Alerts Section */}
      <Card title="Alerts" subtitle="Contextual messaging and feedback">
        <Alert type="success" title="Success">
          Your changes have been saved successfully.
        </Alert>
        <Alert type="warning" title="Warning">
          Please review your input before proceeding.
        </Alert>
        <Alert type="error" title="Error">
          Something went wrong. Please try again.
        </Alert>
        <Alert type="info" title="Information">
          This is informational content. Take note of this.
        </Alert>
      </Card>

      {/* Progress Section */}
      <Card title="Progress Indicators" subtitle="Visual progress tracking">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <div>
            <p style={{ marginBottom: 'var(--spacing-xs)' }}>25% Complete</p>
            <Progress value={25} max={100} />
          </div>
          <div>
            <p style={{ marginBottom: 'var(--spacing-xs)' }}>50% Complete</p>
            <Progress value={50} max={100} />
          </div>
          <div>
            <p style={{ marginBottom: 'var(--spacing-xs)' }}>100% Complete</p>
            <Progress value={100} max={100} />
          </div>
        </div>
      </Card>

      {/* Typography */}
      <Card title="Typography" subtitle="Heading and text styles">
        <h1>Heading 1 (Serif, 56px)</h1>
        <h2>Heading 2 (Serif, 48px)</h2>
        <h3>Heading 3 (Serif, 40px)</h3>
        <h4>Heading 4 (Serif, 24px)</h4>
        <h5>Heading 5 (Sans, 20px, Bold)</h5>
        <h6>Heading 6 (Sans, 16px, Bold)</h6>
        <Divider />
        <p>Body text with normal line height (1.6) and color. This paragraph demonstrates consistent spacing and typography across the system.</p>
        <p><Text variant="muted">Muted text for secondary information</Text></p>
        <p><Text variant="accent">Accent text for important highlights</Text></p>
      </Card>

      {/* Color System */}
      <Card title="Color System" subtitle="Limited palette used throughout">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-md)' }}>
          <div style={{ padding: 'var(--spacing-md)', backgroundColor: '#F7F6F3', border: '1px solid #DEDDD8', borderRadius: 'var(--radius-md)' }}>
            <strong>Background</strong>
            <p style={{ fontSize: 'var(--size-sm)', color: '#666' }}>#F7F6F3</p>
          </div>
          <div style={{ padding: 'var(--spacing-md)', backgroundColor: '#111111', color: '#fff', borderRadius: 'var(--radius-md)' }}>
            <strong>Primary Text</strong>
            <p style={{ fontSize: 'var(--size-sm)' }}>#111111</p>
          </div>
          <div style={{ padding: 'var(--spacing-md)', backgroundColor: '#8B0000', color: '#fff', borderRadius: 'var(--radius-md)' }}>
            <strong>Accent</strong>
            <p style={{ fontSize: 'var(--size-sm)' }}>#8B0000</p>
          </div>
          <div style={{ padding: 'var(--spacing-md)', backgroundColor: '#4A6B4A', color: '#fff', borderRadius: 'var(--radius-md)' }}>
            <strong>Success</strong>
            <p style={{ fontSize: 'var(--size-sm)' }}>#4A6B4A</p>
          </div>
        </div>
      </Card>

      {/* Spacing System */}
      <Card title="Spacing System" subtitle="8px base unit scale">
        <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <div style={{ width: '8px', height: '24px', backgroundColor: '#8B0000' }} />
            <span>8px (--space-1)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <div style={{ width: '16px', height: '24px', backgroundColor: '#8B0000' }} />
            <span>16px (--space-2)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <div style={{ width: '24px', height: '24px', backgroundColor: '#8B0000' }} />
            <span>24px (--space-3)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <div style={{ width: '40px', height: '24px', backgroundColor: '#8B0000' }} />
            <span>40px (--space-4)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <div style={{ width: '64px', height: '24px', backgroundColor: '#8B0000' }} />
            <span>64px (--space-5)</span>
          </div>
        </div>
      </Card>
    </div>
  );

  const secondaryContent = (
    <>
      <PanelSection title="Design System Info">
        <p style={{ fontSize: 'var(--size-sm)', color: 'var(--color-text-secondary)' }}>
          KodNest Premium Build System is a comprehensive, production-ready design system built for serious B2C SaaS products.
        </p>
      </PanelSection>

      <PanelSection title="Step Explanation">
        <p style={{ fontSize: 'var(--size-sm)', lineHeight: 'var(--line-height-normal)' }}>
          This showcase demonstrates all available components and design tokens. Each component follows the design philosophy of calm, intentional, and coherent design with maximum 4 colors across the system.
        </p>
        <ul style={{ fontSize: 'var(--size-sm)', marginLeft: 'var(--spacing-md)', marginTop: 'var(--spacing-sm)' }}>
          <li>Buttons with consistent hover states</li>
          <li>Form inputs with error states</li>
          <li>Card components for content organization</li>
          <li>Alert components for messaging</li>
          <li>Progress indicators for tracking</li>
          <li>Responsive layout structure</li>
        </ul>
      </PanelSection>

      <PanelSection title="Copyable Prompt">
        <PromptBox prompt="Design and implement a UI component following the KodNest Premium Design System guidelines." />
      </PanelSection>

      <div className="panel-buttons">
        <button className="panel-button primary">Build in Lovable</button>
        <button className="panel-button">It Worked</button>
        <button className="panel-button">Add Screenshot</button>
        <button className="panel-button">Error</button>
      </div>
    </>
  );

  return (
    <div className="app">
      <TopBar
        projectName="KodNest Premium"
        step={1}
        totalSteps={5}
        status="In Progress"
      />

      <ContextHeader
        title="Design System Showcase"
        subtitle="A comprehensive exploration of the KodNest Premium Build System components, tokens, and design philosophy"
      />

      <WorkspaceContainer
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
      />

      <ProofFooter />
    </div>
  );
};

export default DesignSystemShowcase;
