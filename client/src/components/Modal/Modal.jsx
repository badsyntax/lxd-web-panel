'use strict';

import './Modal.scss';
import React from 'react';
import $ from 'jquery';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import classNames from 'classnames';

import {
  MODAL__SHOW,
  MODAL__HIDE,
  MODAL__CONFIRM,
  REMOTE_IMAGES__GET_START,
  REMOTE_IMAGES__GET_END
} from '../../constants/AppConstants';

const DEFAULT_CONFIRM_TITLE = 'Confirm';

class ConfirmFooter extends React.Component {

  static propTypes = {
    action: React.PropTypes.object.isRequired,
    hideModal: React.PropTypes.func.isRequired
  };

  onCancelButtonClick = () => {
    let { action } = this.props;
    this.props.hideModal();
    if (action.onConfirmNo) {
      action.onConfirmNo();
    }
  };

  onOkayButtonClick = () => {
    let { action } = this.props;
    this.props.hideModal();
    if (action.onConfirmYes) {
      action.onConfirmYes();
    }
  };

  render() {
    return (
      <div className="modal-footer">
        <button
          className="btn btn-default"
          type="button"
          onClick={this.onCancelButtonClick.bind(this)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.onOkayButtonClick.bind(this)}
        >
          Okay
        </button>
      </div>
    );
  }
}

export default class Modal extends React.Component {

  state = {
    action: {}
  };

  static propTypes = {
    options: React.PropTypes.object,
    defaultAction: React.PropTypes.object
  };

  static defaultProps = {
    options: {
      backdrop: true,
      keyboard: true,
      show: false,
      backdrop: true
    },
    defaultAction: {
      title: null,
      confirm: false,
      close: true
    }
  };

  constructor() {
    super(...arguments);

    AppDispatcher.on(MODAL__SHOW, this.onAppModalShow);
    AppDispatcher.on(MODAL__HIDE, this.onAppModalHide);
    AppDispatcher.on(MODAL__CONFIRM, this.onAppModalConfirm);

    AppDispatcher.on(REMOTE_IMAGES__GET_START, this.onShowIt);
    AppDispatcher.on(REMOTE_IMAGES__GET_END, this.onHideIt);

    this.modalEvents = {
      'hidden.bs.modal': this.onHidden,
      'shown.bs.modal': this.onShown
    };
  }

  componentDidMount() {

    this.modal = $(this.refs.modal)
      .modal(this.getOptions())
      .data('bs.modal');

    $(this.refs.modal).on(this.modalEvents);
  }

  componentWillUnount() {
    $(this.refs.modal).off(this.modalEvents);
    AppDispatcher.off(MODAL__SHOW, this.onAppModalShow);
    AppDispatcher.off(MODAL__HIDE, this.onAppModalHide);
    AppDispatcher.off(MODAL__CONFIRM, this.onAppModalConfirm);
  }

  onShowIt = (action) => {
    if (action.showLoadingModal) {
      this.onAppModalShow({
        message: 'Loading, please wait...',
        className: '-loading',
        options: {
          close: false
        }
      });
    }
  };

  onHideIt = (action) => {
    if (action.showLoadingModal) {
      this.hideModal();
    }
  };

  onAppModalConfirm = (action) => {

    action = Object.assign({}, this.props.defaultAction, {
      title: DEFAULT_CONFIRM_TITLE,
      confirm: true
    }, action);

    this.setState({ action });
    this.showModal();
  };

  onAppModalShow = (action) => {

    action = Object.assign({}, this.props.defaultAction, {
      close: false
    }, action);

    action.options = Object.assign({
      backdrop: 'static',
      keyboard: false
    }, action.options || {});

    this.setState({ action: action });
    this.showModal();
  };

  onAppModalHide = () => {
    this.hideModal();
  };

  onHidden = () => {
    this.setState({
      action: {}
    });
  };

  onShown = () => {
    if (this.state.action.onShown) {
      this.state.action.onShown();
    }
  };

  showModal() {
    this.modal.options = this.getOptions();
    this.modal.show();
  }

  getOptions() {
    return Object.assign({}, this.props.options, this.state.action.options || {});
  }

  hideModal() {
    this.modal.hide();
  }

  render() {
    let { action } = this.state;
    let className = classNames(
      'modal fade',
      this.state.action.className || null
    );
    return (
      <div
        aria-hidden="true"
        className={className}
        ref="modal"
        role="dialog"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            { (action.close || action.title) ? <div className="modal-header">
              { action.close ? <button
                aria-hidden="true"
                className="close"
                data-dismiss="modal"
                type="button"
              >&times;</button> : '' }
              { action.title ? <h4 className="modal-title">{ action.title }</h4> : '' }
            </div> : '' }

            <div className="modal-body">
              <p>{action.message}</p>
            </div>

            { action.confirm ? <ConfirmFooter action={action} hideModal={this.hideModal.bind(this)} /> : '' }
          </div>
        </div>
      </div>
    );
  }
}
