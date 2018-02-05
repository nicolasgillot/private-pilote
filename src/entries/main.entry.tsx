/**
 * Main entry
 */
import Root from 'components/Root';
import { Index } from 'Index';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addLocaleData } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import 'styles/index.css';

addLocaleData([...en]);

function renderReactComponent(
  component: React.ComponentClass | React.StatelessComponent,
  mountElement: HTMLElement,
  props = {}
) {
  if (component == null || mountElement == null) {
    return;
  }

  ReactDOM.render(
    React.createElement(Root, {}, React.createElement(component, props)),
    mountElement
  );
}

document.addEventListener('DOMContentLoaded', () => {
  renderReactComponent(Index, document.getElementById(
    'root'
  ) as HTMLDivElement);
});
