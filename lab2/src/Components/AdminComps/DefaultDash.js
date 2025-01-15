import React from 'react'
import '../css/DefaultDash.css';
import AdminIcons from './AdminIcons';

export default function DefaultDash() {

  return (
    <div className='defaultMain'>
        <h1>Welcome to the Admin Page</h1>
        <h2>To begin, please navigate to a dashboard in the left panel</h2>
        <p><AdminIcons.dashIcon /></p>
    </div>
  )
}
