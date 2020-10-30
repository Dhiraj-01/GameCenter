import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {

  constuctor() { }

  ngOnInit(): void {
    this.init();
    this.game_mode = 0;
    $("#mode").on("click", this.changeGameMode);
    for(let i = 0; i < 9; i++) {
      $("#" + i).on("click", this.mousePress);
    }
    this.audio = document.createElement('audio');
    this.audio.setAttribute('src', '../../assets/click.mp3');
  }

  player1 = '✕';
  player2 = '◯';
  current_player = null;
  game_mode = null;
  board = [null, null, null, null, null, null, null, null, null];
  audio = null;

  winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]

  win_cell = [null, null, null];

  checkWin() {
    for (let i = 0; i < this.winning_combinations.length; i++) {

      let cell1 = this.winning_combinations[i][0];
      let cell2 = this.winning_combinations[i][1];
      let cell3 = this.winning_combinations[i][2];

      if (this.board[cell1] === null || this.board[cell2] === null || this.board[cell3] === null) {
        continue;
      }

      if (this.board[cell1] === this.board[cell2] && this.board[cell2] === this.board[cell3] && this.board[cell3] === this.board[cell1]) {
        
        this.win_cell = [cell1, cell2, cell3];
        if(this.board[cell1] === this.player1) {
          return -1;
        }
        else {
          return 1;
        }
      }
    }
    return 0;
  }

  checkTie() {
    for (let i = 0; i < 9; i++) {
      if (this.board[i] == null) {
        return false;
      }
    }
    return true;
  }

  isEmpty(cell) {
    return (this.board[cell] == null);
  }

  init() {
    // clearboard
    for(let i = 0; i < 9; i++) {
      $("#" + i).text('');
      $("#" + i).css('opacity', '1');
      this.board[i] = null;
    }

    console.log(this.board);

    // curplayer = player1
    this.current_player = this.player1;

    // clear msg
    $("#msg").text('');

    if (this.game_mode == 1) {
      if (this.rnd(0, 5) <= 2) {
        let r = [0, 2];
        let x = r[this.rnd(0, 1)];
        let y = r[this.rnd(0, 1)];
        let id = x * 3 + y;
        console.log(id, x, y);
    
        $("#" + id).text(this.player2);
        this.board[id] = this.player2;
      }
    }
  }

  changePlayer() {
    this.current_player = (this.current_player == this.player1) ? this.player2 : this.player1;
  }

  computerMove() {
    
    let findVal = (i, j) => {
      return i * 3 + j;
    };

    let minmax = (b: boolean) => {
      let score = this.checkWin();
      if (score != 0 || this.checkTie()) {
        return score;
      }

      if (b == true) {
        let bestscore = -5;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let id = findVal(i, j);
            if (this.board[id] == null) {
              this.board[id] = this.player2;
              let res = minmax(false);
              if(res > bestscore) {
                bestscore = res;
              }
              this.board[id] = null;
            }
          }
        }
        // console.log(bestscore);
        return bestscore;
      }
      else {
        let bestscore = 5;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let id = findVal(i, j);
            if (this.board[id] == null) {
              this.board[id] = this.player1;
              let res = minmax(true);
              if (res < bestscore) {
                bestscore = res;
              }
              this.board[id] = null;
            }
          }
        }
        // console.log(bestscore);
        return bestscore;
      }
    };

    let bestMove = () => {
      let bestscore = -5;
      let pid = -1;

      for (let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
          let id = findVal(i, j);
          if (this.board[id] == null) {
            this.board[id] = this.player2;
            let score = minmax(false);
            if (score > bestscore) {
              pid = id;
              bestscore = score;
            }
            this.board[id] = null;
          }
        }
      }
      if(pid != -1) {
        this.board[pid] = this.player2;
        $("#" + pid).text(this.player2);
      }
      else {
        console.log("invalid");
      }
    };
    bestMove();
  }

  gameOver(x = 0) {
    let res = this.checkWin();
    if(x != 0) {
      return ((res != 0) || this.checkTie());
    }
    if (res != 0) {

      for(let i = 0; i < 9; i++) {
        $("#" + i).css('opacity', '0.5');
      }
      $("#" + this.win_cell[0]).css('opacity', '1');
      $("#" + this.win_cell[1]).css('opacity', '1');
      $("#" + this.win_cell[2]).css('opacity', '1');

      let cnt = 0;
      let interval = setInterval(() => {
        // console.log(cnt, "inside interval");
        if (cnt === 5) {
          clearInterval(interval);
        }
        $('#' + this.win_cell[0]).toggleClass('win');
        $('#' + this.win_cell[1]).toggleClass('win');
        $('#' + this.win_cell[2]).toggleClass('win');
        cnt++;
      }, 500);

      let win = "Winner : ";
      if(res == -1) {
        if (this.game_mode == 0) {
          win += "Player1";
        }
        else {
          win += "Player";
        }
        $("#player1-score").text(1 + (Number)($("#player1-score").text()));
      }
      else {
        if (this.game_mode == 0) {
          win += "Player2";
        }
        else {
          win += "Computer";
        }
        $("#player2-score").text(1 + (Number)($("#player2-score").text()));
      }
      $("#msg").text(win);
      return true;
    }
    else if(this.checkTie()) {
      $("#tie-score").text(1 + (Number)($("#tie-score").text()));
      $("#msg").text("Match Tie !!");
      return true;
    }
    return false;
  }

  mousePress = (e) => {
    console.log(this.board);
    this.audio.play();

    let cell = e.target.id;
    if(this.gameOver(1)) {
      this.init();
      return;
    }
      
    if (this.isEmpty(cell)) {
      this.board[cell] = this.current_player;
      $("#" + cell).text(this.current_player);
      if(this.gameOver()) {
        return;
      }
      this.changePlayer();
      if(this.game_mode == 1 && this.current_player == this.player2) {
        this.computerMove();
        this.changePlayer();
        this.gameOver();
      }
    }
  }

  rnd(l, r) {
    return Math.floor(Math.random() * (r - l + 1)) + l;
  }

  changeGameMode = () => {
    if (this.game_mode == 0) {
      $("#mode").text("Player vs Computer");
      $("#player1").text("Player(X)");
      $("#player2").text("Computer(O)");
    }
    else {
      $("#mode").text("Player1 vs Player2");
      $("#player1").text("Player(X)");
      $("#player2").text("Player2(O)");
    }
    
    $("#player1-score").text('0');
    $("#player2-score").text('0');
    $("#tie-score").text('0');
    
    this.game_mode ^= 1;
    this.init();
  }
}
