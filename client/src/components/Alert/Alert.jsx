import React from 'react';
import classNames from 'classnames';

export default (props) => {
  let heading = props.heading ? <strong>{ props.heading }</strong> : '';
  let message = <span>{ props.message }</span>
  let className = classNames(
    'alert',
    'alert-' + (props.type || 'warning')
  );
  return (
    <div
      className={className}
      role="alert"
    >
      {heading}
      {message}
    </div>
  );
};
