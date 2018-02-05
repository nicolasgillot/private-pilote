const hoistNonReactStatics = require('hoist-non-react-statics'); // tslint:disable-line
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Reducer } from 'redux';
import getInjectors from 'services/reducerInjectors';

interface IInjectReducer {
  key: string;
  reducer: Reducer<any>;
}

export default ({ key, reducer }: IInjectReducer) => (
  WrappedComponent: any
) => {
  class ReducerInjector extends React.Component {
    public static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    public static displayName = `withReducer(${WrappedComponent.displayName})`;

    private injectors = getInjectors(this.context.store);

    public componentWillMount() {
      const { injectReducer } = this.injectors;

      injectReducer(key, reducer);
    }

    public render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
