import React from "react";
import ReactDOM from "react-dom";

import './styles/styles';

type Message = {
  index: number;
  title: string;
  body: string;
};

const sampleMessage: Message = {
  index: 1,
  title: 'sample',
  body: 'body content',
}

const App = () => (
  <div>
    <h1>{sampleMessage.title}</h1>
    <p>{sampleMessage.body}</p>
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
