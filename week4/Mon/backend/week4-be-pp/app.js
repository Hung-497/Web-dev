const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

const morgan = require('morgan');
app.use(morgan('tiny'));

app.use('/api/tours', tourRouter)
app.use('/api/users', userRouter)

const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});