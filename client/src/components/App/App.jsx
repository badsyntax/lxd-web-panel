import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Listing from '../Listing/Listing.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Listing />
      </div>
    );
  }
}
