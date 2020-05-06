import mx from "./mx";
const { mxEvent, mxEffects } = mx

export class SplashScreen {
  element: any

  constructor(element: any) {
    this.element = element || this.defaultElement
  }

  get defaultElement() {
    return document.getElementById('splash');
  }

  // Fades-out the splash screen after the UI has been loaded.
  fadeout() {
    var splash = this.element 
    if (splash == null) return
    try {
      mxEvent.release(splash);
      mxEffects.fadeOut(splash, 100, true, null, null, null);
    }
    catch (e) {  
      // mxUtils is not available (library not loaded)
      splash.parentNode.removeChild(splash);
    }  
  }
}
