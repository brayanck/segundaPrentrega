const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
const handlebarsExpress  = require('express-handlebars')
const managerDb = require('./daos/ManagerDb')
const dataBaseConect = new managerDb("mongodb+srv://brayanmampaso:brayanmampaso10@cluster.r7ppmee.mongodb.net/segunda")
const registerRoute = require('./routes/users.routes')
const paginateRoute = require('./routes/paginate.routes')
const cartsRouter = require('./routes/carts.routes')
const productsRouter = require("./routes/products.routes")
app.use(express.json())

app.use(express.urlencoded({extended:true}))
//public
app.use(express.static(__dirname+"/public"))

const handlebars = require('handlebars');

handlebars.registerHelper('isEqual', function (value1, value2, options) {
  if (value1 === value2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
//view
app.engine('handlebars', handlebarsExpress.engine({
    // Otras configuraciones...
    runtimeOptions: {
      allowProtoPropertiesByDefault: true
    }
  }));
app.set('view engine', "handlebars")
app.set("views",__dirname+"/views")


PORT= 8080 || process.env.PORT;
app.use("/user",registerRoute)
app.use("/",paginateRoute)
app.use("/api/carts",cartsRouter)
app.use("/product",productsRouter)
app.listen(PORT,()=>{
    console.log("servidor corriendo en puerto "+ PORT)
    dataBaseConect.conectarse()
})
