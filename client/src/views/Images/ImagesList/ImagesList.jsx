'use strict';

import './ImagesList.scss';
import React from 'react';
import { Link } from 'react-router';
import ImagesTable from '../../../components/ImagesTable/ImagesTable';

export default class ImagesList extends React.Component {
  render() {
    return (
      <div className={'images-list'}>
        <h2 className="sub-header">
          Images
          <Link
            className={'btn btn-primary btn-new-container'}
            to={'images/import'}
          >
            Import image
          </Link>
        </h2>
        <ImagesTable />
      </div>
    );
  }
}
