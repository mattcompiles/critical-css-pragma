## Critical CSS Pragma

Experimental custom JSX pragma that allows tracking of classNames used during render. Could theoretically be used for building inline critical CSS from static CSS files.

```jsx
import ReactDOMServer from 'react-dom/server';
import { jsx, CSSContext } from 'critical-css-pragma';

const usedClassNames = new Set<string>();

function handleClassName(classNames: Array<string>) {
  for (const className of classNames) {
    usedClassNames.add(className);
  }
}

ReactDOMServer.renderToString(
  <CSSContext.Provider value={handleClassName}>
    <App />
  </CSSContext.Provider>,
);

console.log('Used classnames', usedClassNames)
```
