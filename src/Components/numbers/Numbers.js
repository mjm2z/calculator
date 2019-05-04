import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
class Numbers extends Component {
  render() {
    return (
      <div className='number_container'>
        <div className='top_number_row number_row'>
            <button className='number_button'>7</button>
            <button className='middle_number number_button'>8</button>
            <button className='number_button'>9</button>
        </div>
        <div className='number_row'>
            <button className='number_button'>4</button>
            <button className='middle_number number_button'>5</button>
            <button className='number_button'>6</button>
        </div>
        <div className='bottom_number_row number_row'>
            <button className='number_button'>1</button>
            <button className='middle_number number_button'>2</button>
            <button className='number_button'>3</button>
        </div>
      </div>
    );
  }
}

export default Numbers;
