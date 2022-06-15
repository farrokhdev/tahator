import * as React from 'react';
import {Typography} from '@mui/material';

interface Props {
  name: string;
  unmountChildrenWhenError?: boolean;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    const { name, unmountChildrenWhenError } = this.props;
    const { hasError } = this.state;

    // eslint-disable-next-line max-len
    console.groupCollapsed(
      `%cA Caught Error Has Been Happend in %c${name} `,
      'color:blue; padding:5px;',
      'color:blue; padding:5px; border:solid 1px red',
    );
    console.log('where', name);
    console.log('error', error);
    console.log('info', info);
    console.groupEnd();
    if (!hasError && unmountChildrenWhenError) {
      this.setState({ hasError: true });
    }
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (!hasError) {
      return children;
    }
    return (
      <div className="h-screen bg-pink-800 flex justify-center items-center">
        <Typography className="text-2xl font-normal mb-10 text-center text-white mt-6">
          با عـــرض پوزش خطایی داخل سامانه رخ داد
        </Typography>
      </div>
    );
  }
}
