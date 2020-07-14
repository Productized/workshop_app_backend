require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')
const port = process.env.PORT || 5000;
const connection = require('./config.js');

const notificationRouter = require('./routes/notifications.route');
const userRouter = require('./routes/users.route');
const workshopRouter = require('./routes/workshop.route');
const authRouter = require('./routes/auth.route');

process.on('unhandledRejection', error => {
  console.error('unhandledRejection', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('uncaughtException', error => {
  console.log('uncaughtException', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('beforeExit', () => {
  app.close((err) => {
    if (err) console.error(JSON.stringify(err), err.stack);
  });
});

process.on('SIGINT', function () {
  db.stop(function (err) {
    process.exit(err ? 1 : 0);
  });
});


function startConnection() {
  console.error('CONNECTING');
  connection = mysql.createConnection(config.mysql);
  connection.connect(function (err) {
    if (err) {
      console.error('CONNECT FAILED', err.code);
      startConnection();
    }
    else
      console.error('CONNECTED');
  });
  connection.on('error', function (err) {
    if (err.fatal)
      startConnection();
  });
}

startConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use('/notifications', notificationRouter);
app.use('/users', userRouter);
app.use('/workshops', workshopRouter);
app.use('/auth', authRouter);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`The app is running at ${port}`);
  }
});