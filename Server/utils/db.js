import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "creamnbeans_user",
    password: "0925319379aA%",
    database: "creamnbeansDB",
    port: 3306
});

con.connect(function(err){
    if(err){
        console.log(`connection error to local database ${err}`)
    }
    else console.log("Connected To local database creamnbeansDB")
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