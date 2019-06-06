import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../../css/frame.css';
export class Frame extends React.Component {
  constructor() {
    super();
    this.onIframeLoad = this.onIframeLoad.bind(this);
  }

  componentDidMount() {
    if (this.props.setRoot) {
      this.props.setRoot(this.iframeRoot);
    }
    this.node.addEventListener('load', this.onIframeLoad);
  }

  onIframeLoad() {
    this.iframeHead = this.node.contentDocument.head;
    this.iframeRoot = this.node.contentDocument.body;
    this.forceUpdate();
  }

  render() {
    const { children, head } = this.props
    return (
      <iframe ref={node => (this.node = node)} className="iframe-frame" src={this.props.htmlLink}>
        {this.iframeHead && ReactDOM.createPortal(head, this.iframeHead)}
        {this.iframeRoot && ReactDOM.createPortal(children, this.iframeRoot)}
      </iframe>
    )
  }
}
