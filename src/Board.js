import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";
let ons = 0;
class Board extends Component {
  // isValid=(board)=>{
  //   for(let i=0; i<board.length)
  // }
  createBoard = () => {
    ons = 0;
    let { nRows, nCols } = this.props;
    let board = Array(nRows).fill(Array(nCols).fill(0));
    board = board.map((v, i) => {
      let onCount = 0;
      return v.map((vv, index) => {
        let e = Math.floor(Math.random() * 2);
        if (e) onCount += 1;
        if (index == v.length - 1 && onCount % 2 != 0) {
          if (e) e = 0; //done
          else e = 1;
        }
        //row done
        if (e) ons += 1;
        return e;
      });
    });
    //traverse vertically
    let x = board[0].length,
      y = board.length;
    let all = 0;
    for (let j = 0; j < y; j++) {
      let onCount = 0,
        ind = 0;
      for (let i = 0; i < x; i++) {
        if (board[j][i]) onCount += 1;
        else ind = i;
      }
      if (onCount % 2 != 0) board[j][ind] = 1;
      all += onCount;
    }
    if (all == 0) {
      let i = Math.floor(Math.random() * board.length);
      board[i][0] = 1;
      board[i][board[i].length - 1] = 1;
    }
    return board;
  };
  state = {
    hasWon: 0,
    board: this.createBoard(),
  };
  flipCells = (coord) => {
    let { nRows, nCols } = this.props;
    let board = this.state.board;
    let [x, y] = coord.split("").map(Number);
    let s = [
      `${x} ${y}`,
      `${x - 1} ${y}`,
      `${x} ${y - 1}`,
      `${x + 1} ${y}`,
      `${x} ${y + 1}`,
    ];
    let set = new Set();

    for (let e of s) {
      let [i, j] = e.split(" ").map(Number);
      if (j >= 0 && j < nCols && i >= 0 && i < nRows) {
        if (board[i][j]) ons -= 1;
        else ons += 1;

        set.add(`${i} ${j}`);
      }
    }
    this.setState(() => ({
      board: board.map((v, i) =>
        v.map((vv, j) => {
          if (set.has(`${i} ${j}`)) return !board[i][j];
          else return board[i][j];
        })
      ),
      hasWon: !ons && true,
    }));
  };

  render() {
    let w = 0;
    let board = this.state.board;
    return (
      <div className="Board w-100">
        {this.state.hasWon ? (
          <div>
            <p className="text display-1 boardwon">"YOU WON!"</p>
            <input
              type="submit"
              className="btn btn-light mx-auto"
              value="RESTART"
              onClick={this.props.changePass}
            />
          </div>
        ) : (
          <table className="d-flex">
            <div className="display-3 text board-text m-4">LIGHTS OUT</div>
            <div className="wrapper">
              <tbody className="rounded">
                {board.map((v, i) => (
                  <div
                    key={`${i}`}
                    className="row gx-0 w-100"
                    style={{ height: `${100 / this.props.nRows}%` }}
                  >
                    {v.map((vv, j) => (
                      <div
                        className="col"
                        key={`${i}${j}`}
                        style={{
                          width: `${60 / this.props.nCols}%`,

                          border: "1px solid #000",
                        }}
                      >
                        {!vv ? (
                          <Cell
                            coord={`${i}${j}`}
                            isLit={1}
                            flipCells={this.flipCells}
                          />
                        ) : (
                          <Cell
                            coord={`${i}${j}`}
                            isLit={0}
                            flipCells={this.flipCells}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </tbody>
            </div>
          </table>
        )}
      </div>
    );
  }
}

export default Board;
