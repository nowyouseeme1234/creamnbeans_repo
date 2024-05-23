import mysql from 'mysql'

const con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12708608",
    password: "Inj824Fg5r",
    database: "sql12708608"
});

con.connect(function(err){
    if(err){
        console.log(`connection error to external database ${err}`)
    }
    else console.log("Connected To external database sql12708608")
})

export default con;

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "creamnbeansdb"
// });

// con.connect(function(err){
//     if(err){
//         console.log("connection error")
//     }
//     else console.log("Connected To CreamNbeansDB")
// })

// export default con;