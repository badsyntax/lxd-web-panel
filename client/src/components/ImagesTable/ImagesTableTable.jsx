import React from 'react';
import ImageRow from './ImagesTableRow';

export default (props) => {
  let { images } = props;
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Aliases</th>
            <th>Description</th>
            <th>Size</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        { images.map((image, index) => <ImageRow key={'image-row-' + index} image={image} index={index} />) }
        </tbody>
      </table>
    </div>
  );
};
