import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery' 
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-npuzzle',
  templateUrl: './npuzzle.component.html',
  styleUrls: ['./npuzzle.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NPuzzleComponent implements OnInit {

  constructor() {}

  minN: Number = 2;
  maxN: Number = 10;
  step = 0;

  ngOnInit(): void {
    this.generateMatrix();
    $(document.body).on("keydown", this.keyPressEvent);
  }

  d() {
    for (var i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
    }
    console.log('\n');
  }

  shuffle(arr) {
    let id = arr.length;
    while (0 !== id) {
      let rid = Math.floor(Math.random() * id);
      id -= 1;
      let temp = arr[id];
      arr[id] = arr[rid];
      arr[rid] = temp;
    }
    return arr;
  }

  rnd(l, r) {
    return Math.floor(Math.random() * (r - l + 1)) + l;
  }
  getN() {
    return (Number)($("#n").text());
  }

  findIJ(val) {
    // val = i * n + j
    let n = this.getN();
    let i = Math.floor(val / n);
    let j = val - i * n;
    return [i, j];
  }

  findVal(i, j) {
    return i * this.getN() + j;
  }

  findEmpty() {
    let id = 0, n = this.getN();
    for (let i = 0; i < n * n; i++) {
      if ($("#" + i).text() == "") {
        id = i;
        break;
      }
    }
    console.log("id = " + id);
    return id;
  }

  Clear() {
    this.step = 0;
    $("#board").empty();
    $("#msg").empty();
  }

  gameOver() {
    let n = this.getN();
    for (let i = 0; i < n * n - 1; i++) {
      let val = (Number)($("#" + i).text());
      if (val != i + 1) {
        return false;
      }
    }
    return true;
  }

  generateMatrix() {
    this.Clear();
    let n = this.getN();
    console.log(n);
    var arr = new Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = new Array(n);
    }

    let r = new Array(n * n);
    for (let i = 0; i < n * n; i++) {
      r[i] = i;
    }

    while (1) {
      this.shuffle(r);
      let pos = [-1, -1];
      for (let i = 0; i < n * n; i++) {
        if (r[i] == 0) {
          pos = this.findIJ(i);
          break;
        }
      }
      let sum = (pos[0] + pos[1]) % 2;
      for (let i = 0; i < n * n; i++) {
        for (let j = i + 1; j < n * n; j++) {
          if (r[j] == 0) continue;
          else if (r[i] == 0) sum++;
          else if(r[j] < r[i]) {
            sum++;
          }
        }
      }
      if (sum % 2 == 0) {
        break;
      }
    }

    let id = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        arr[i][j] = r[id++];
      }
    }

    for (let i = 0; i < n; i++) {
      let row = "<tr>";
      for (let j = 0; j < n; j++) {
        if (arr[i][j] == 0) {
          arr[i][j] = "";
        }
        row += "<td id=" + (String)(this.findVal(i, j)) + ">" + (arr[i][j]) + "</td>";
      }
      row += "</tr>";
      // console.log(row);
      $("#board").append(row);
    }
  }

  decreseN() {
    let n = this.getN();
    if (n > this.minN) {
      $("#n").text(n - 1);
    }
    this.generateMatrix();
  }

  incerseN() {
    let n = this.getN();
    if (n < this.maxN) {
      $("#n").text(n + 1);
    }
    this.generateMatrix();
  }

  keyPressEvent = (event) => {
    let key = event.key;
    let A = this.findIJ(this.findEmpty());
    let B = A.slice();

    switch (key) {
      case "ArrowLeft":
        console.log("Left");
        B[1]--;
        break;
      case "ArrowRight":
        console.log("Right");
        B[1]++;
        break;
      case "ArrowUp":
        console.log("Up");
        B[0]--;
        break;
      case "ArrowDown":
        console.log("Down");
        B[0]++;
        break;
      default:
        return;
    }

    let n = this.getN();
    if (A[0] < 0 || A[1] < 0 || B[0] < 0 || B[1] < 0 || A[0] >= n || A[1] >= n || B[0] >= n || B[1] >= n) {
      return;
    }

    this.step++;
    let id1 = "#" + this.findVal(A[0], A[1]);
    let id2 = "#" + this.findVal(B[0], B[1]);

    let X = $(id1).text();
    let Y = $(id2).text();

    $(id1).text(Y);
    $(id2).text(X);

    if (this.gameOver()) {
      $("#board").empty();
      $("#msg").append("Congratulation Game Over. <br> Total Step : " + this.step);
    }
  }
}
