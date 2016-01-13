import React from 'react';
import AppActions from '../../actions/AppActions';

export default (props) => {

  let { image } = props;

  function onDeleteButtonClick(image) {
    AppActions.async([() => {
      AppActions.confirm({
        message: 'Are you sure you want to delete this image?',
        onConfirmYes: () => image.delete()
      });
    }]);
  }

  return (
    <div>
      <button className="btn btn-default btn-xs">Edit</button>
      <button
        className="btn btn-default btn-xs"
        onClick={onDeleteButtonClick.bind(null, image)}
      >
        Delete
      </button>
    </div>
  );
};
