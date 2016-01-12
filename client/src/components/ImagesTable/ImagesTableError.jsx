import React from 'react';
import Alert from '../Alert/Alert';

export default (props) => {
  let heading = props.heading || 'No images';
  let type = props.type || 'warning';
  let icon = props.icon || 'info-sign';
  return (
    <Alert
      heading={heading}
      type={type}
      icon={icon}
    />
  );
};
