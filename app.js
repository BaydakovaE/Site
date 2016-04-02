var express=require('express');
var app = express();
var sqlite = require('sqlite3');
app.set('view engine', 'ejs');
var db = new sqlite.Database('mydb.sqlite');

app.get('/', function(req, res){
    db.all('select * from mydata', function (error,data){
        res.render('home', {
            data:data
        });
    });
});

app.post('/new', function(req, res){
    db.run("insert into mydata (text) values('"+req.query.text+"');", function (){
        res.send('ok');
    });
});

app.post('/delete', function(req, res){
    db.run("delete from mydata where id ="+req.query.id, function (){
        res.send('ok');
    })
});

app.get('/getLastAddedKey', function(req, res) {
    var execquery = 'SELECT id FROM mydata ORDER BY id DESC LIMIT 0,1';
    db.get(execquery, [] ,
        function(err, row) {
            res.end(JSON.stringify({ id: row.id }));
        }
    );
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});
