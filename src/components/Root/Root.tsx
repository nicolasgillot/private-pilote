/**
 * Root React component.
 */
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import * as messages from 'translations/messages.json';

interface IRootProps {
  children?: React.ReactNode;
}

const Root: React.StatelessComponent<IRootProps> = ({ children }) => (
  <IntlProvider locale="en-GB" messages={messages}>
    {children}
  </IntlProvider>
);

export default Root;
