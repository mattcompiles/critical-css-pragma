import React from 'react';

export const CSSContext = React.createContext<
  ((className: string) => void) | null
>(null);

interface ReporterProps {
  element: any;
  props: any;
  children: Array<any>;
}
function Reporter({ element, props, children }: ReporterProps) {
  const register = React.useContext(CSSContext);

  if (register && props && props.className) {
    register(props.className.split(' '));
  }

  return React.createElement(element, props, ...children);
}

export function jsx(element: any, props: any, ...children: Array<any>) {
  return React.createElement(Reporter, { element, props, children });
}
