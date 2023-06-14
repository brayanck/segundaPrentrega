const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
const handlebars = require('express-handlebars')
const managerDb = require('./daos/ManagerDb')
const dataBaseConect = new managerDb("mongodb+srv://brayanmampaso:brayanmampaso10@cluster.r7ppmee.mongodb.net/segunda")
const registerRoute = require('./routes/users.routes')
const paginateRoute = require('./routes/paginate.routes')
app.use(express.json())

app.use(express.urlencoded({extended:true}))
//public
app.use(express.static(__dirname+"/public"))

//view
app.engine('handlebars',handlebars.engine())
app.set('view engine', "handlebars")
app.set("views",__dirname+"/views")


PORT= 8080 || process.env.PORT;
app.use("/user",registerRoute)
app.use("/",paginateRoute)
app.listen(PORT,()=>{
    console.log("servidor corriendo en puerto "+ PORT)
    dataBaseConect.conectarse()
})
