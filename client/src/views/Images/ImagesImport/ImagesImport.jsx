'use strict';

import './ImagesImport.scss';
import React from 'react';

import ImagesImportForm from '../../../components/ImagesImportForm/ImagesImportForm';

export default class ImagesImport extends React.Component {
  render() {
    return (
      <div className={'images-import'}>
        <h2 className="sub-header">
          Import image
        </h2>
        <ImagesImportForm
            className={'form form-horizontal'} />
      </div>
    );
  }
}
