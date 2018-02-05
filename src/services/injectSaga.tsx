const hoistNonReactStatics = require('hoist-non-react-statics'); // tslint:disable-line
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { AllEffect } from 'redux-saga/effects';
import getInjectors from 'services/sagaInjectors';

interface IInjectSaga {
  key: string;
  saga: () => IterableIterator<AllEffect>;
}

export default ({ key, saga }: IInjectSaga) => (WrappedComponent: any) => {
  class InjectSaga extends React.Component {
    public static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    public static displayName = `withSaga(${WrappedComponent.displayName})`;

    private injectors = getInjectors(this.context.store);

    public componentWillMount() {
      const { injectSaga } = this.injectors;

      injectSaga(key, { saga }, this.props);
    }

    public componentWillUnmount() {
      const { ejectSaga } = this.injectors;

      ejectSaga(key);
    }

    public render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
