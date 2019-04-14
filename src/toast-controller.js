class ToastController {
  static setRef(ref = {}) {
    this.ref = ref;
  }

  static clearRef() {
    this.ref = null;
  }

  static show(options = {}) {
    this.ref.show(options);
  }

  static hide() {
    this.ref.hide();
  }
}

export default ToastController
