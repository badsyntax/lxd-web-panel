import './Modal.scss';
import React from 'react';
import $ from 'jquery';

export default class Modal extends React.Component {

  static defaultProps = {
    options: {
      backdrop: true,
      keyboard: true,
      show: true
    }
  };

  constructor() {
    super(...arguments);

    this.events = {
      'hidden.bs.modal': this.onHidden,
      'shown.bs.modal': this.onShown
    };
  }

  componentDidMount() {
    $(this.refs.modal).modal(this.props.options);
    $(this.refs.modal).on(this.events);
  }

  componentWillUnount() {
    $(this.refs.modal).off(this.events);
  }

  onHidden = () => {
    console.log('on hidden');
  };

  onShown = () => {
    console.log('on shown');
  };

  render() {
    return (
      <div ref="modal" className="modal fade" id="confirm-delete" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title" id="myModalLabel">Confirm Delete</h4>
            </div>

            <div className="modal-body">
              <p>You are about to delete one track, this procedure is irreversible.</p>
              <p>Do you want to proceed?</p>
              <p className="debug-url"></p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <a className="btn btn-danger btn-ok">Delete</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
