import React, {ReactNode} from 'react';

interface ErrorBoundaryWithRetryProps {
  children: ({fetchKey}: {fetchKey: number}) => ReactNode;
  fallback: ({error, retry}: {error: string; retry: () => void}) => ReactNode;
}

interface ErrorBoundaryWithRetryState {
  error: null | string;
  fetchKey: number;
}

class ErrorBoundaryWithRetry extends React.Component<
  ErrorBoundaryWithRetryProps,
  ErrorBoundaryWithRetryState
> {
  state = {error: null, fetchKey: 0};

  componentDidCatch(error: any) {
    this.setState({
      error: `${error}`,
    });
  }
  retry = () => {
    this.setState(prev => ({
      // Clear the error
      error: null,
      // Increment and set a new fetchKey in order
      // to trigger a re-evaluation and refetching
      // of the query using useLazyLoadQuery
      fetchKey: prev.fetchKey + 1,
    }));
  };

  render() {
    const {children, fallback} = this.props;
    const {error, fetchKey} = this.state;
    if (error) {
      if (typeof fallback === 'function') {
        return fallback({error, retry: this.retry});
      }
      return fallback;
    }
    return children({fetchKey});
  }
}

export default ErrorBoundaryWithRetry;
