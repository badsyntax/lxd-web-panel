import React from 'react';

export default (props) => {
  return (
    <div className={props.className}>
      { props.labelComponent }
      { props.horizontal ? (
        <div className={props.inputLayoutClassName}>
          { props.inputComponent }
          { props.hasError ? (
            <span className="help-block">{ props.formModel.getPropValidationErrorMessage(props.name) }</span>
          ) : null }
        </div>
      ) : props.inputComponent }
    </div>
  );
}
