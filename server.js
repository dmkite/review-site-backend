
const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const app = express();

if(process.env.NODE_ENV !== 'production') require('dotenv').load()

app.use(cors())
app.use(bodyParser.json());
app.use(morgan('dev'))

const snacks = require('./routes/snacks');
app.use('/api', snacks);

app.use('/users', require('./routes/users'))

app.use('/auth', require('./routes/auth'))

///////////////////////////////////////////////////////////////////////////////
//  Protected
///////////////////////////////////////////////////////////////////////////////

app.use('/reviews', require('./routes/reviews'))

app.use((req, res) => {
  const status = 404;
  const message = `Could not ${req.method} ${req.path}`;
  res.status(status).json({ status, message });
});

app.use((err, _req, res, _next) => {
  console.log(err)
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  res.status(status).send({status, message});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port', port);
});
