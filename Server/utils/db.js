import mysql from 'mysql'


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "creamnbeansdb"
});

con.connect(function(err){
    if(err){
        console.log("connection error")
    }
    else console.log("Connected To CreamNbeansDB")
})

export default con;