import './Alert.scss';
import React from 'react';
import classNames from 'classnames';

function getIcon(icon) {
  return icon ? (
    <span className={'alert__icon glyphicon glyphicon-' + icon} aria-hidden="true"></span>
  ) : '';
}

function getHeading(heading) {
  return heading ? (<strong className="alert__heading">{heading}</strong>) : '';
}

export default (props) => {
  let icon = getIcon(props.icon);
  let heading = getHeading(props.heading);
  let message = props.message ? <span className="alert__message">{ props.message }</span> : null;
  let children = props.children ? <span className="alert__children">{ props.children }</span> : null;
  let className = classNames(
    'alert',
    'alert-' + (props.type || 'warning')
  );
  return (
    <div
      className={className}
      role="alert"
    >
      {icon}
      {heading}
      {message}
      {children}
    </div>
  );
};
