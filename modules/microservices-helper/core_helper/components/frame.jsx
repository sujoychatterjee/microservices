import React from 'react';
import ReactDOM from 'react-dom';
export class Frame extends React.Component {
  constructor() {
    super();
    this.frameRef = React.createRef();
    this.onIframeLoad = this.onIframeLoad.bind(this);
  }

  componentDidMount() {
    if (this.props.setRoot) {
      this.props.setRoot(this.frameRef.current);
    }
    this.frameRef.current.addEventListener('load', this.onIframeLoad);
  }

  onIframeLoad() {
    const node = this.frameRef.current;
    this.iframeHead = node.contentDocument.head;
    this.iframeRoot = node.contentDocument.body;
    this.forceUpdate();
  }

  render() {
    const { children, head } = this.props
    return (
      <iframe ref={this.frameRef} className="iframe-frame" src={this.props.htmlLink}>
        {this.iframeHead && ReactDOM.createPortal(head, this.iframeHead)}
        {this.iframeRoot && ReactDOM.createPortal(children, this.iframeRoot)}
      </iframe>
    )
  }
}
