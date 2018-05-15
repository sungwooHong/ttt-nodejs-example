var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors()); // http://guswnsxodlf.github.io/enable-CORS-on-express

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var gameState = { isXnext: true, squares: Array(9).fill('') };

function wins(turn) {
  var squres = gameState.squres;

  return  (squres[0]==turn && squres[1]==turn && squres[2]==turn)||
          (squres[3]==turn && squres[4]==turn && squres[5]==turn)||
          (squres[6]==turn && squres[7]==turn && squres[8]==turn)||
          (squres[0]==turn && squres[3]==turn && squres[6]==turn)||
          (squres[1]==turn && squres[4]==turn && squres[7]==turn)||
          (squres[2]==turn && squres[5]==turn && squres[8]==turn)||
          (squres[0]==turn && squres[4]==turn && squres[8]==turn)||
          (squres[2]==turn && squres[4]==turn && squres[6]==turn)
};


app.get('/game_state', (req, res) => {
  res.charset = 'UTF-8';
  res.send(gameState); // send JSON
} );

// https://...../move?turn=X&pos=4r
app.get('/move', (req, res) => {
  res.charset = 'UTF-8';
  var turn = req.query.turn;
  var pos = req.query.pos;
  //OK 조건 검사
  if((gameState.isXnext && turn == 'X') ||
  (!gameState.isXnext && turn == 'O') ){
  console.log('move: '+turn+pos);
  gameState.squares[pos] = turn;
  gameState.isXnext = !gameState.isXnext;
  res.send('OK');
}else {
  res.send('ERROR');
}

} );

app.get('/', (req, res) => {
  res.charset = 'UTF-8';
  res.send('GET으로 넘어온 name은 '+ req.query.name + '입니다.');
} );

app.post('/', (req, res) => {
  res.charset = 'UTF-8';
  res.send('POST로 넘어온 name은 '+ req.body.name + '입니다.');
} );

app.listen(8080, () => console.log('Example app listening on port 8080!'));
