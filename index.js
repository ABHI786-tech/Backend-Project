const app = require('express')();
const dotenv = require("dotenv").config();
const server = require("./config/config");
const port = process.env.PORT;
const bodyParser = require("body-parser")
const employeeRouter = require("./router/employeesRouter")
const userRouter = require("./router/authRouter")

///incoming JSON data ko read aur parse (samajhne) ke liye.
app.use(bodyParser.json())


app.use("/", employeeRouter )
app.use("/", userRouter)


app.get("/",(req, res)=>{
    res.status(200).send("hello world")
})



server().then(()=>{
    app.listen(port,()=>{
        console.log("server is running")
    })
})