import React from 'react';
import ReactDom from 'react-dom';
// @ts-expect-error
import { jsx, CSSContext } from 'pragma';

function Used() {
  return (
    <>
      <div className="one">one</div>
      <div className="two">two</div>
      <div className="three">three</div>
      <div className="four">four</div>
      <div className="five">five</div>
      <div className="six">six</div>
    </>
  );
}

function Unused() {
  return <div className="unused">Unused</div>;
}

interface AppProps {
  handleClassName: (classNames: Array<string>) => void;
}
function App({ handleClassName }: AppProps) {
  return (
    <CSSContext.Provider value={handleClassName}>
      <div className="heading bold">Heading</div>
      <div>{true ? <Used /> : <Unused />}</div>
    </CSSContext.Provider>
  );
}

const usedClassNames = new Set<string>();

function onClassName(classNames: Array<string>) {
  for (const cn of classNames) {
    usedClassNames.add(cn);
  }
}

ReactDom.render(
  <App handleClassName={onClassName} />,
  document.getElementById('app'),
  () => {
    console.log('All classnames', usedClassNames);
  },
);
