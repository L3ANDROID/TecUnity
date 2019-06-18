import React from 'react';
import './Envio.css'


export default function Envio() {
  return (
    <div className="frame">
        <input type="checkbox" id="cb" />
        <label for="cb" className="button">Send mail</label>
        <label for="cb" className="button reset">Reset</label>
        <div className="circle"></div>
        <div className="circle-outer"></div>
        <svg className="icon mail">
            <polyline points="119,1 119,69 1,69 1,1"></polyline>
            <polyline points="119,1 60,45 1,1 119,1"></polyline>
        </svg>
        <svg className="icon plane">
            <polyline points="119,1 1,59 106,80 119,1"></polyline>
            <polyline points="119,1 40,67 43,105 69,73"></polyline>
        </svg>
    </div>
  )
}
