import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  handleClick = (evt) => {
    this.props.flipCells(this.props.coord);
  };

  render() {
    let { isLit } = this.props;
    let classes = "Cell" + (isLit ? " Cell-lit" : "");
    return <div className={classes} onClick={this.handleClick}></div>;
  }
}

export default Cell;
