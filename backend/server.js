const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { authRouter } = require('./routes/auth.route'); // Check if the path is correct

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

// Mount the authentication routes
server.use('/auth', authRouter); // Ensure authRouter is properly imported and defined in auth.route.js

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
