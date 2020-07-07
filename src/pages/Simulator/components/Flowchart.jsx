import React from 'react';
import FlowchartJS from 'react-simple-flowchart';

const options = {
  x: 0,
  y: 0,
  'line-width': 3,
  'line-length': 50,
  'text-margin': 10,
  'font-size': 14,
  'font-color': 'black',
  'line-color': 'black',
  'element-color': 'black',
  fill: 'white',
  'yes-text': 'V',
  'no-text': 'F',
  'arrow-end': 'block',
  scale: 1,
};

const Flowchart = ({ code }) => {
  return <FlowchartJS chartCode={code} options={options} />;
};

export default Flowchart;
