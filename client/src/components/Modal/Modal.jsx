'use strict';

import './Modal.scss';
import React from 'react';
import $ from 'jquery';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import { MODAL__SHOW } from '../../constants/AppConstants';

export default class Modal extends React.Component {

  state = {
    message: null
  };

  static propTypes = {
    options: React.PropTypes.object
  };

  static defaultProps = {
    options: {
      backdrop: true,
      keyboard: true,
      show: false
    }
  };

  constructor() {
    super(...arguments);

    AppDispatcher.on(MODAL__SHOW, this.onAppModalShow);

    this.modalEvents = {
      'hidden.bs.modal': this.onHidden,
      'shown.bs.modal': this.onShown
    };
  }

  componentDidMount() {

    this.modal = $(this.refs.modal)
      .modal(this.props.options)
      .data('bs.modal');

    $(this.refs.modal).on(this.modalEvents);
  }

  componentWillUnount() {
    $(this.refs.modal).off(this.modalEvents);
    AppDispatcher.off(MODAL__SHOW, this.onAppModalShow);
  }

  onAppModalShow = (options) => {
    this.setState({
      message: options.message
    });
    this.showModal();
  };

  onHidden = () => {
    console.log('on hidden');
  };

  onShown = () => {
    console.log('on shown');
  };

  showModal(data) {
    this.modal.show();
  }

  render() {
    return (
      <div
        ref="modal"
        className="modal fade"
        id="confirm-delete"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >&times;</button>
              <h4 className="modal-title" id="myModalLabel">Confirm</h4>
            </div>

            <div className="modal-body">
              <p>{this.state.message}</p>
              <p className="debug-url"></p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
