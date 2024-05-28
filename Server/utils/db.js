import mysql from 'mysql'

const con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    database: "sql12708608",
    user: "sql12708608",
    password: "Inj824Fg5r",
});

con.connect(function(err){
    if(err){
        console.log(`connection error to External database ${err}`)
    }
    else console.log("Connected To External database sql12708608")
})
con.on('connect', () => {
    console.log('Connection established');
    console.log("Connection state:", con.state);
  });
  
  con.on('end', () => {
    console.log('Connection ended');
  });

// export default con;

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

export default con;