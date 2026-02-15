import { Component, ReactNode } from 'react';

interface RequirementsErrorBoundaryProps {
  children: ReactNode;
}

interface RequirementsErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

export class RequirementsErrorBoundary extends Component<
  RequirementsErrorBoundaryProps,
  RequirementsErrorBoundaryState
> {
  state: RequirementsErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): RequirementsErrorBoundaryState {
    return {
      hasError: true,
      message: error.message,
    };
  }

  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error('Requirements module error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 shadow-md">
          <h2 className="text-lg font-semibold text-destructive">Requirements failed to load</h2>
          <p className="text-sm text-muted-foreground mt-2">
            {this.state.message || 'An unexpected error occurred while rendering this page.'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
