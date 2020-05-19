import { hexToRgb } from './utils';
import { removeClass, getTopMargin, fadeIn, show, addClass } from './handle-dom';
import defaultParams from './default-params';

var modalClass   = '.sweet-alert';
var overlayClass = '.sweet-overlay';

/*
 * Add modal + overlay to DOM
 */
import injectedHTML from './injected-html';

var sweetAlertInitialize = function() {
  var sweetWrap = document.createElement('div');
  sweetWrap.innerHTML = injectedHTML;

  // Append elements to body
  while (sweetWrap.firstChild) {
    document.body.appendChild(sweetWrap.firstChild);
  }
};

/*
 * Get DOM element of modal
 */
var getModal = function() {
  var $modal = document.querySelector(modalClass);

  if (!$modal) {
    sweetAlertInitialize();
    $modal = getModal();
  }

  return $modal;
};

/*
 * Get DOM element of form (in modal)
 */
var getForm = function() {
  var $modal = getModal();
  if ($modal) {
    return $modal.querySelector('form');
  }
};

/*
 * Get DOM element of overlay
 */
var getOverlay = function() {
  return document.querySelector(overlayClass);
};

/*
 * Add box-shadow style to button (depending on its chosen bg-color)
 */
var setFocusStyle = function($button, bgColor) {
  var rgbColor = hexToRgb(bgColor);
  $button.style.boxShadow = '0 0 2px rgba(' + rgbColor + ', 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)';
};

/*
 * Animation when opening modal
 */
var openModal = function(callback) {
  var $modal = getModal();
  fadeIn(getOverlay(), 10);
  show($modal);
  addClass($modal, 'showSweetAlert');
  removeClass($modal, 'hideSweetAlert');

  window.previousActiveElement = document.activeElement;
  var $okButton = $modal.querySelector('button.confirm');
  $okButton.focus();

  setTimeout(function () {
    addClass($modal, 'visible');
  }, 500);

  var timer = $modal.getAttribute('data-timer');

  if (timer !== 'null' && timer !== '') {
    var timerCallback = callback;
    $modal.timeout = setTimeout(function() {
      var doneFunctionExists = ((timerCallback || null) && $modal.getAttribute('data-has-done-function') === 'true');
      if (doneFunctionExists) {
        timerCallback(null);
      }
      else {
        sweetAlert.close();
      }
    }, timer);
  }
};

/*
 * Reset the styling of the form
 * (for example if errors have been shown)
 */
var resetForm = function() {
  var $modal = getModal();
  var $form = getForm();

  removeClass($modal, 'show-form');
  $form.innerHTML = '';
};

/*
 * Set "margin-top"-property on modal based on its computed height
 */
var fixVerticalPosition = function() {
  var $modal = getModal();
  $modal.style.marginTop = getTopMargin(getModal());
};


export {
  sweetAlertInitialize,
  getModal,
  getOverlay,
  getForm,
  setFocusStyle,
  openModal,
  resetForm,
  fixVerticalPosition
};
