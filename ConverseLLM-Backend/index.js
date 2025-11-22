const serverless = require("serverless-http");
const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express()
var cors = require('cors')
const router = require('./api/chatbot')
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

module.exports.handler = serverless(app);