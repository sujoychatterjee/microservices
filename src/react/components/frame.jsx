import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../../css/frame.css'
export class Frame extends React.Component {
    componentDidMount() {
      this.iframeHead = this.node.contentDocument.head
      this.iframeRoot = this.node.contentDocument.body
      this.forceUpdate()
    }
  
    render() {
      const { children, head, ...rest } = this.props
      return (
        <iframe {...rest} ref={node => (this.node = node)} className="iframe-frame">
          {this.iframeHead && ReactDOM.createPortal(head, this.iframeHead)}
          {this.iframeRoot && ReactDOM.createPortal(children, this.iframeRoot)}
        </iframe>
      )
    }
  }
  