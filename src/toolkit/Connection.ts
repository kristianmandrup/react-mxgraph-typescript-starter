import mx from "./mx";
const { mxImage, mxConnectionHandler } = mx

export class Connection {
  get defaultImage() {
    return new mxImage('images/connector.gif', 16, 16)
  }

  setConnectImageByPath(imagePath: string) {
    this.setConnectImage(new mxImage(imagePath, 16, 16));
  }

  setConnectImage(image: any = this.defaultImage) {
    mxConnectionHandler.prototype.connectImage = image;
  }
}
