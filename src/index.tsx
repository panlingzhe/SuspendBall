import * as React from "react";
import "./style.less";

export interface ISuspendBallProps {
  startLeft?: number;
  startTop?: number;
  autoFix?: boolean;
  style: React.CSSProperties;
}

export interface ISuspendBallState {
  left: number;
  top: number;
  htmlWidth: number;
  htmlHeight: number;
  touchClientX: number;
  touchClientY: number;
  animate: boolean;
}

export default class SuspendBall extends React.Component<
  ISuspendBallProps,
  ISuspendBallState
> {
  constructor(props) {
    super(props);
    this.state = {
      left: props.startLeft || 0,
      top: props.startTop || 0,
      htmlWidth: document.documentElement.clientWidth,
      htmlHeight: document.documentElement.clientHeight,
      touchClientX: null,
      touchClientY: null,
      animate: false
    };
    this.ballRef = React.createRef();
  }

  componentDidMount() {
    this.ballRef.addEventListener(
      "touchmove",
      e => {
        if (e.cancelable) {
          e.preventDefault();
        }
      },
      {
        passive: false
      }
    );
  }

  ballRef;

  onTouchStart = e => {
    e = e.touches[0];
    const touchClientX = e.clientX - this.ballRef.getBoundingClientRect().left,
      touchClientY = e.clientY - this.ballRef.getBoundingClientRect().top;
    let left = e.clientX - touchClientX;
    let top = e.clientY - touchClientY;
    this.ballRef.className = "suspendBall";
    this.setState({
      left,
      top,
      touchClientX,
      touchClientY
    });
  };

  onTouchMove = e => {
    const { touchClientX, touchClientY, htmlWidth, htmlHeight } = this.state;
    e = e.touches[0];
    let left = e.clientX - touchClientX;
    let top = e.clientY - touchClientY;
    if (left < 0) {
      left = 0;
    }
    if (left > htmlWidth - this.ballRef.clientWidth) {
      left = htmlWidth - this.ballRef.clientWidth;
    }
    if (top < 0) {
      top = 0;
    }
    if (top > htmlHeight - this.ballRef.clientHeight) {
      top = htmlHeight - this.ballRef.clientHeight;
    }
    this.setState({
      left,
      top
    });
  };

  onTouchEnd = () => {
    const { htmlWidth, htmlHeight } = this.state;
    let { left, top } = this.state;
    if (this.props.autoFix) {
      if (left + this.ballRef.clientWidth / 2 < htmlWidth / 2) {
        left = 0;
      } else {
        left = htmlWidth - this.ballRef.clientWidth;
      }
      this.ballRef.className = "suspendBall suspendBallAnimation";
    }
    if (top < 0) {
      top = 0;
    }
    if (top > htmlHeight - this.ballRef.clientHeight) {
      top = htmlHeight - this.ballRef.clientHeight;
    }
    this.setState({
      left,
      top
    });
  };

  onMouseDown = e => {
    const touchClientX = e.pageX - this.ballRef.getBoundingClientRect().left,
      touchClientY = e.pageY - this.ballRef.getBoundingClientRect().top;
    let left = e.pageX - touchClientX;
    let top = e.pageY - touchClientY;
    this.ballRef.className = "suspendBall";
    this.setState({
      left,
      top,
      touchClientX,
      touchClientY
    });
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
  };

  mouseMove = e => {
    const { touchClientX, touchClientY, htmlWidth, htmlHeight } = this.state;
    let left = e.pageX - touchClientX;
    let top = e.pageY - touchClientY;
    if (left < 0) {
      left = 0;
    }
    if (left > htmlWidth - this.ballRef.clientWidth) {
      left = htmlWidth - this.ballRef.clientWidth;
    }
    if (top < 0) {
      top = 0;
    }
    if (top > htmlHeight - this.ballRef.clientHeight) {
      top = htmlHeight - this.ballRef.clientHeight;
    }
    this.setState({
      left,
      top
    });
  };

  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    const { htmlWidth, htmlHeight } = this.state;
    let { left, top } = this.state;
    if (this.props.autoFix) {
      if (left + this.ballRef.clientWidth / 2 < htmlWidth / 2) {
        left = 0;
      } else {
        left = htmlWidth - this.ballRef.clientWidth;
      }
      this.ballRef.className = "suspendBall suspendBallAnimation";
    }
    if (top < 0) {
      top = 0;
    }
    if (top > htmlHeight - this.ballRef.clientHeight) {
      top = htmlHeight - this.ballRef.clientHeight;
    }
    this.setState({
      left,
      top
    });
  };

  public render() {
    const { left, top } = this.state;
    const { style = {}, children } = this.props;
    return (
      <div
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onMouseDown={this.onMouseDown}
        style={{
          left,
          top,
          ...style
        }}
        className="suspendBall"
        ref={ballRef => (this.ballRef = ballRef)}
      >
        {children}
      </div>
    );
  }
}
