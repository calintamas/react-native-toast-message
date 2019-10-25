const ToastController = {
  _ref: null,

  setRef: (ref = {}) => {
    ToastController._ref = ref;
  },

  getRef: () => {
    return ToastController._ref;
  },

  clearRef: () => {
    ToastController._ref = null;
  },

  show: (options = {}) => {
    ToastController._ref.show(options);
  },

  hide: () => {
    ToastController._ref.hide();
  }
}

export default ToastController
