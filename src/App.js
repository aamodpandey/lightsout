import React, { Component } from "react";
import Board from "./Board";
import "./App.css";

class App extends Component {
  state = {
    rows: 0,
    cols: 0,
    pass: 0,
  };
  changePass = () => {
    this.setState({
      pass: 0,
    });
  };
  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      pass: 1,
    });
  };
  handleChange = (evt) => {
    if (evt.target.name === "rows")
      this.setState({
        rows: Number(evt.target.value),
      });
    else
      this.setState({
        cols: Number(evt.target.value),
      });
  };
  render() {
    return (
      <div className="App d-flex align-items-center justify-content-center">
        {this.state.pass ? (
          <Board
            nCols={this.state.cols}
            nRows={this.state.rows}
            changePass={this.changePass}
          />
        ) : (
          <div className="Input d-flex align-items-center justify-content-center">
            <p class="display-1 text p-5 me-md-5 applight">LIGHTS OUT</p>
            <form className="d-flex flex-column me-4">
              <label>
                <p className="display-6 pt-5">Enter Rows and Columns:</p>
                <div className="pb-3">
                  <input
                    type="text"
                    placeholder="Rows"
                    className="px-2 mx-2"
                    autoComplete="off"
                    style={{ width: "3.5rem" }}
                    name="rows"
                    onChange={this.handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Columns"
                    className="px-2 mx-2"
                    autoComplete="off"
                    style={{ width: "5.5rem" }}
                    name="columns"
                    onChange={this.handleChange}
                  />
                </div>
              </label>
              <input
                type="submit"
                className="btn btn-light mx-auto"
                value="Submit"
                onClick={this.handleClick}
              />
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default App;
