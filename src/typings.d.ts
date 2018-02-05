/**
 * Declaration of the modules which do not have a Definition Types
 */
declare module '*.json' {
  const value: {};

  /* tslint:disable:no-default-export */
  export default value;
}
