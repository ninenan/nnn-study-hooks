import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'nnn-toy-ui/dist/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);

// import React from 'react';
//
// const jsx = (
//   <div>
//     hello <span>world</span>
//   </div>
// );
//
// console.log(React);
// console.log(jsx);
// console.log(React.createElement);
