const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(helmet());
server.use(morgan("short"));
server.use(logger);
server.use(auth);
server.use(express.json());

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

function logger(req,res,next){
  console.log(`${req.method} Req to : ${req.originalUrl}`);
  next();
}

function auth(req,res,next){
  if(req.query.pass==="mellon"){
    console.log("Allowed");
    next();
  }else{
    res.status(403).json({message:"Not allowed"});
  }

}