/**
 * Index page.
 */
import PrivatePilote from 'containers/PrivatePilote/PrivatePilote';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from 'store';

class Index extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <Provider store={store()}>
        <PrivatePilote />
      </Provider>
    );
  }
}

export { Index };
