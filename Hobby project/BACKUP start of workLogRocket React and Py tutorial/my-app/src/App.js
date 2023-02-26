import React from 'react';
import PropTypes from 'prop-types';
import './my_styles.css';
import {useState} from "react";
 
const MyComponent = () => {
    const [value, setValue] = useState(1);
    return (
        <div>
            <p>{value}</p>
            <button onClick={() => setValue((value + 1))}>Increment Value</button>
        </div>
    );
};

function House(props) {
  return <h2>I am a { props.type }!</h2>;
}

export default function Alert() {
  return(
    <div className="header">
      <h2>React Header</h2>
      <MyComponent />
      <House type="duplex"/>
    </div>
  )
}
