import express from "express";
import con from '../utils/db.js'

const router = express.Router();

router.post("/order", (req, res) => {
    let totalPrice = 0;
    let actualOrder = ``;
    const sql = 'INSERT INTO orders (actual_order, total_price) values(?,?)';
  req.body.forEach((element) => {
    console.log(element) 
    if(element.quantity > 0){
    if (element.toGo){ 
        totalPrice = totalPrice + (element.quantity * element.price) + (element.quantity * 10);
        actualOrder += `* ${element.quantity} ${element.name}; \n`
    }
    else{ 
        totalPrice = totalPrice + (element.quantity * element.price)
        actualOrder += ` ${element.quantity} ${element.name}; \n`
    }
}
});
con.query(sql, [actualOrder, totalPrice], (err, result) => {
    if(err){
        return res.json({Status: false, Error: `${err}`})
    }
    return res.json({Status: true, Result: `${result}`})
})

});

router.get('/get_orders', (req, res) =>{
    const sql = 'SELECT * FROM orders';
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: `${err}`})
        return res.json({Status: true, Result: result})
    })

})
router.use("/history", (req, res) => {
    res.send("Routing error go to https://creamnbeans-repo-client.vercel.app");
  });
  router.use("/orders", (req, res) => {
    res.send("Routing error go to https://creamnbeans-repo-client.vercel.app");
  });

export { router as orderRouter };
