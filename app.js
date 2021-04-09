const express = require('express');
const config = require('./config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }));
app.use('/api', require('./middlewares/auth'));
app.use('/api/search', require('./routes/search'));
app.use('/api/history', require('./routes/history'));
app.use('/api/like', require('./routes/like'));
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message:
        err.message || 'Server error. Check the data being sent'
    });
  }
});

app.use('/', express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

mongoose
  .connect(config.mongoUri, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => app.listen(PORT, () => console.log(`Express server starts on port ${PORT} ...`)))
  .catch(e => {
    console.error('Mongoose connection failed: ', e);
    process.exit(1);
  });
