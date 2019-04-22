let express = require("express")
let bodyParser = require("body-parser")
let Sequelize = require('sequelize')
let api_routes = require("./routes/api.js")

sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite3'
})

sequelize.authenticate()
.then(() => console.log('connected to sqlite'))
.catch(err => console.log('error connecting', err))

let student = require('./model/student')(sequelize, Sequelize)
let app = express()
app.use(bodyParser.json())
app.use('/api', api_routes(student))
app.use(function(req, res, next){
    res.status(404).send('Not Found')
})
app.use(function(err,req,res,next){
    console.log(err.stack)
    res.status(500).send('server error')
})
let server = app.listen(process.env.PORT || 3000, function(){
    console.log('app running on port', server.address().port)
})