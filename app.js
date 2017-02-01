let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

let index = require('./routes/index');


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index');
});

server.listen(8080, function(){
  console.log('listening on localhost:8080');
});

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', (message) => {
    // console.log('username', message.userName, 'message', message.message)
    io.emit('chat message', message)
  });

  socket.on('disconnect', function(userName){
     console.log('user disconnected');
    //  io.emit('disconnect', userName);
   });

   //change color
   socket.on('keyup', function(){
      io.emit('someoneclicked', color);
    });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
