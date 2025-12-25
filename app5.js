const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
// Serve files in `public/` at the web root so `/keiyo2_add.html` works
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('home');
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2 });
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';

  res.send('今日の運勢は' + luck + 'です');
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';

  res.render('omikuji2', { result: luck });
});

app.get("/omikuji3", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  let comment = '';

  if (num == 1) {
    luck = '大吉';
    comment = '絶好調です！...絶好調？好調×10%上昇する？？';
  } else if (num == 2) {
    luck = '中吉';
    comment = '首が飛ばないようにしっかり抑えとけよ';
  } else if (num == 3) {
    luck = '小吉';
    comment = '大凶になるように願っとくよ';
  } else if (num == 4) {
    luck = '吉';
    comment = '平凡って面白みがないよな';
  } else if (num == 5) {
    luck = '末吉';
    comment = 'ものは言いようだよな';
  } else if (num == 6) {
    luck = '凶';
    comment = 'さっさと死んだ方がいいんじゃない？';
  }

  res.render('omikuji3', { result: luck, comment: comment });
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);
  console.log({ hand, win, total });
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  let judgement = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  if ((hand == 'グー' && cpu == 'チョキ') ||
    (hand == 'チョキ' && cpu == 'パー') ||
    (hand == 'パー' && cpu == 'グー')) {
    judgement = '勝ち';
    win += 1;
  } else if (hand == cpu) {
    judgement = 'あいこ';
  } else {
    judgement = '負け';
  }
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render('janken', display);
});

app.get("/janken_reset", (req, res) => {
  let hand = req.query.hand;
  let win = 0;
  let total = 0;
  console.log({ hand, win, total });
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  let judgement = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';
  // 人間の勝ちの場合の処理
  if ((hand == 'グー' && cpu == 'チョキ') ||
    (hand == 'チョキ' && cpu == 'パー') ||
    (hand == 'パー' && cpu == 'グー')) {
    judgement = '勝ち';
    win += 1;
  } else if (hand == cpu) {
    judgement = 'あいこ';
  } else {
    judgement = '負け';
  }
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render('janken', display);
});


let station = [
  { id: 1, code: "JE01", name: "東京駅" },
  { id: 2, code: "JE07", name: "舞浜駅" },
  { id: 3, code: "JE12", name: "新習志野駅" },
  { id: 4, code: "JE13", name: "幕張豊砂駅" },
  { id: 5, code: "JE14", name: "海浜幕張駅" },
  { id: 6, code: "JE05", name: "新浦安駅" },
];
let station2 = [
  { id: 1, code: "JE01", name: "東京駅", change: "総武本線，中央線，etc", passengers: 403831, distance: 0 },
  { id: 2, code: "JE02", name: "八丁堀駅", change: "日比谷線", passengers: 31071, distance: 1.2 },
  { id: 3, code: "JE05", name: "新木場駅", change: "有楽町線，りんかい線", passengers: 67206, distance: 7.4 },
  { id: 4, code: "JE07", name: "舞浜駅", change: "舞浜リゾートライン", passengers: 76156, distance: 12.7 },
  { id: 5, code: "JE12", name: "新習志野駅", change: "", passengers: 11655, distance: 28.3 },
  { id: 6, code: "JE17", name: "千葉みなと駅", change: "千葉都市モノレール", passengers: 16602, distance: 39.0 },
  { id: 7, code: "JE18", name: "蘇我駅", change: "内房線，外房線", passengers: 31328, distance: 43.0 },
];
app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1_2', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push(newdata);
  res.render('db1_1', { data: station });
  //res.redirect('/keiyo_add.html');
});

// 一覧
app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db2_2', { data: station2 });
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

// Read
app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_detail', { data: detail });
});

//Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice(req.params.number, 1);
  res.redirect('/keiyo2');
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push({ id: id, code: code, name: name, change: change, passengers: passengers, distance: distance });
  console.log(station2);
  res.render('keiyo2', { data: station2 });
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_edit', { id: number, data: detail });
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log(station2);
  res.redirect('/keiyo2');
});

app.get("/keiyo2_add.html", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let change = req.query.change;
  let passengers = req.query.passengers;
  let distance = req.query.distance;
  let newdata = {
    id: id,
    code: code,
    name: name,
    change: change,
    passengers: passengers,
    distance: distance
  };
  station2.push(newdata);
  res.render('db2_1', { data: station2 });
  //res.redirect('/keiyo2_add.html');
});

let character = [
  { id:  1, name: レイニーディスタンス, type: mysterious, rarity:4 , skill_name: nup, skill_level: 2, rank: 2, total_status:35798 },
  { id:  2, name: 最高のひな祭り, type: pure, rarity:4 , skill_name: lif, skill_level: 2 , rank: 1 , total_status: 36095 },
  { id:  3, name: 窓辺の語らい, type: cour, rarity:4 , skill_name: sup, skill_level: 2 , rank: 1 , total_status: 35788 },
  { id:  4, name: 辿り着けた思い, type: hurt, rarity:4 , skill_name: jud , skill_level: 1 , rank: 0 , total_status: 36096 },
  { id:  5, name: 次のライブのために, type: cour, rarity: 4, skill_name: sup, skill_level: 2 , rank: 1, total_status: 35791 },
  { id:  6, name: 記憶の深淵, type: cute, rarity: 4, skill_name: nup, skill_level: 4 , rank: 5 , total_status: 35791 },
  { id:  7, name: うとうとアートクラス, type: cute, rarity: 4, skill_name: lif, skill_level: 2 , rank: 5 , total_status: 36095 },
  { id:  8, name: すべて受け止める覚悟を, type: pure, rarity: 4, skill_name: sup, skill_level: 2 , rank: 5 , total_status: 35792 },
  { id:  9, name: パーテーションの陰から, type: myst, rarity: 4, skill_name: lif, skill_level: 1 , rank: 2 , total_status: 36094 },
  { id: 10, name: 思い出を抱きしめて, type: hurt, rarity: 4, skill_name: lif, skill_level: 2 , rank: 1, total_status: 36097 },
  { id: 11, name: feat.ポムポムプリン, type: cour, rarity: 4, skill_name: jud, skill_level: 2 , rank: 1, total_status: 36096 },
  { id: 12, name: 空へはばたく祈り, type: cute, rarity: 4, skill_name: cup, skill_level: 4 , rank: 5 , total_status: 35792 },
  { id: 13, name: ひとりになった部屋, type: hurt, rarity: 4, skill_name: duj, skill_level: 2 , rank: 1 , total_status: 36102 },
  { id: 14, name: 四人一緒だから, type: cour, rarity: 4, skill_name: lif, skill_level: 2 , rank: 5 , total_status: 36102 },
  { id: 15, name: あの日の憧れ, type: myst, rarity: 4, skill_name: nup, skill_level: 2 , rank: 2, total_status: 35792 },
  { id: 16, name: 楽しくて幸せな音楽, type: hurt, rarity: 4, skill_name: nup, skill_level: 4 , rank: 5 , total_status: 35792 },
  { id: 17, name: あふれる感謝, type: cour, rarity: 4, skill_name: lif, skill_level: 1 , rank: 0 , total_status: 36102 },
  { id: 18, name: 難航企画会議, type: pure, rarity: 4, skill_name: lif, skill_level: 2 , rank: 2 , total_status: 36102 },
  { id: 19, name: エースプレイヤー, type: cute, rarity: 4, skill_name: nup, skill_level: 4 , rank: 5 , total_status: 35792 },
  { id: 20, name: ラッキーアイス, type: pure, rarity: 4, skill_name: nup, skill_level: 2 , rank: 2 , total_status: 35792 },
  { id: 21, name: 夜風さらう本音 , type: cute, rarity: 4, skill_name: sup, skill_level: 4 , rank: 5, total_status: 35792 },
];

// 期末課題用ページ
app.get("/kimatu", (req, res) => {
  res.render('kimatu');
});

// 所持キャラ一覧
app.get("/character", (req, res) => {
  res.render('character', { data: saki });
});

// 所持キャラ詳細
app.get("/character/:id", (req, res) => {
  const id = req.params.id;
  const detail = saki.find(c => c.id == id);
  res.render('character_detail', { data: detail });
});

// 編成画面
app.get("/formation", (req, res) => {
  res.render('formation', { data: saki });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
