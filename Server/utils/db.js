import mysql from 'mysql'

// const con = mysql.createConnection({
//     host: "sql.freedb.tech",
//     database: "freedb_creamnbeansDB",
//     user: "freedb_issac",
//     password: "jPAh5yqX98van$A",
//     port: 3306
// });

// con.connect(function(err){
//     if(err){
//         console.log(`connection error to External database ${err}`)
//     }
//     else console.log("Connected To External database freedb_creamnbeansDB")
// })
// con.on('connect', () => {
//     console.log('Connection established');
//     console.log("Connection state:", con.state);
//   });
  
//   con.on('end', () => {
//     console.log('Connection ended');
//   });

// export default con;

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