import express from "express";
import con from "../utils/db.js";

const router = express.Router();

router.post("/order", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://creamnbeans-repo-client.vercel.app/');
  let totalPrice = 0;
  let actualOrder = ``;
  const sql = "INSERT INTO orders (actual_order, total_price) values(?,?)";
  req.body.forEach((element) => {
    console.log(element);
    if (element.quantity > 0) {
      if (element.toGo) {
        totalPrice =
          totalPrice + element.quantity * element.price + element.quantity * 10;
        actualOrder += `* ${element.quantity} ${element.name}; \n`;
      } else {
        totalPrice = totalPrice + element.quantity * element.price;
        actualOrder += ` ${element.quantity} ${element.name}; \n`;
      }
    }
  });
  con.query(sql, [actualOrder, totalPrice], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: `${err}`, Authentication: `${con.state}` });
    }
    return res.json({ Status: true, Result: `${result}`, Authentication: `${con.state}` });
  });
});

router.get("/get_orders", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  const sql = "SELECT * FROM orders";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Status: false, Error: `${err}`, Authentication: `${con.state}` });
      
    } else {
      console.log(result);
      return res.json({ Status: true, Result: result, Authentication: `${con.state}` });
    
    }
  });
});
router.get('/hi', (req, res) => {
  res.send("Server says hi")
})

export { router as orderRouter };
