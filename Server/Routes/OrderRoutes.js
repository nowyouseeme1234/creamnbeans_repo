import express from "express";
import con from "../utils/db.js";

const router = express.Router();

router.post("/login", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  const sql = "SELECT * FROM login where username = ? and password = ?";
  con.query(sql, [req.body.username, req.body.password], (err, result) => {
    if (err) {
      return res.json({
        Status: false,
        Error: `${err}`,
        Authentication: `${con.state}`,
      });
    } else if (result.length > 0){
    
      return res.json({
        Status: true,
        Result: `Authentication Successfull!`,
        Authentication: `${con.state}`,
        Role: result[0].role
      });
  }
    else {
      res.json({ Status: false, Result: "wrong username or password" });
    }
  });
});

router.post("/order", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
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
  if (totalPrice > 0) {
    con.query(sql, [actualOrder, totalPrice], (err, result) => {
      if (err) {
        return res.json({
          Status: false,
          Error: `${err}`,
          Authentication: `${con.state}`,
        });
      }
      return res.json({
        Status: true,
        Result: `${result}`,
        Authentication: `${con.state}`,
      });
    });
  }
});

router.get("/get_orders", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  const sql = "SELECT * FROM orders WHERE deleted = 'NO'";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        Status: false,
        Error: `${err}`,
        Authentication: `${con.state}`,
      });
    } else {
      console.log(result);
      return res.json({
        Status: true,
        Result: result,
        Authentication: `${con.state}`,
      });
    }
  });
});

router.post("/edit_order", (req, res) => {
  //sql1 is for the orginal orders table to know which order to put into the edited_orders table
  const sql1 = "SELECT * FROM orders WHERE order_id= ?";
  //sql2 is for updating the original order in the orders table
  const sql2 =
    "UPDATE orders SET actual_order = ?, total_price = ?, edited = 'YES' WHERE order_id = ?";

  con.query(
    sql1,
    req.body.editableOrderId,
    (errSelectOrders, resultSelectOrders) => {
      if (errSelectOrders) {
        console.log(errSelectOrders);
      } else {
        console.log(resultSelectOrders[0]);
        //sql4 for checking whether the order with the orderId exists in the edited_orders table and update if does, insert if it doesn't
        const sql4 = "SELECT * FROM edited_orders WHERE edited_order_id = ?";
        con.query(sql4, resultSelectOrders[0].order_id, (errSelectEditedOrders, resultSelectEditedOrders) => {
            if (errSelectEditedOrders) {
              console.log(errSelectEditedOrders);
            } else {
              //if the order with the orderId exists in the edited_orders table, I update that entry
              if (resultSelectEditedOrders.length > 0) {
                //sql5 is to update the edited_orders table when the orderid exists
                const sql5 = "UPDATE edited_orders SET edited_actual_order = ?, edited_total_price = ? WHERE edited_order_id = ?";
                con.query( sql5, [
                    resultSelectOrders[0].actual_Order,
                    resultSelectOrders[0].total_price,
                    resultSelectOrders[0].order_id,
                  ],(errUpdateEditedOrders, resultUpdateEditedOrders) => {
                    if (errUpdateEditedOrders) {
                      console.log(errUpdateEditedOrders);
                    } else {
                      console.log(
                        "successfully updated entry in the edited_orders table"
                      );
                      const orderToUpdate = [
                        req.body.editable[0],
                        Number(req.body.editable[1]),
                        req.body.editableOrderId,
                      ];
                      console.log(orderToUpdate);
                      con.query(sql2, orderToUpdate, (err, result) => {
                        if (err) {
                          console.log(err);
                          return res.json({
                            Status: false,
                            Error: `${err}`,
                            Authentication: `${con.state}`,
                          });
                        } else {
                          console.log(result);
                          return res.json({
                            Status: true,
                            Result: `Order Updated Successfully`,
                            Authentication: `${con.state}`,
                          });
                        }
                      });
                    }
                  }
                );
              }
              //if the order with the orderId doesn't exist in the edited_orders table, I insert that entry አንድ
              else {
                //sql3 for inserting the order from the orders table to the edited_orders table
                const sql3 =
                  "INSERT INTO edited_orders (edited_order_id, edited_actual_order, edited_total_price) values(?,?,?)";
                con.query(sql3,[
                    resultSelectOrders[0].order_id,
                    resultSelectOrders[0].actual_order,
                    resultSelectOrders[0].total_price,
                  ],(errInsertEditedOrders, resultInsertEditedOrders) => {
                    if (errInsertEditedOrders) {
                      console.log(`error inserting into the edited_orders table ${errInsertEditedOrders}`);
                    } else {
                      console.log(
                        "successfully inserted into edited_orders table"
                      );
                      const orderToUpdate = [
                        req.body.editable[0],
                        Number(req.body.editable[1]),
                        req.body.editableOrderId,
                      ];
                      console.log(orderToUpdate);
                      con.query(sql2, orderToUpdate, (err, result) => {
                        if (err) {
                          console.log(err);
                          return res.json({
                            Status: false,
                            Error: `${err}`,
                            Authentication: `${con.state}`,
                          });
                        } else {
                          console.log(result);
                          return res.json({
                            Status: true,
                            Result: `Order Updated Successfully`,
                            Authentication: `${con.state}`,
                          });
                        }
                      });
                    }
                  }
                );
              }
            }
          }
        );
      }
    }
  );
});
router.post("/delete_order", (req, res) => {
  console.log(req.body);
  const sql = "UPDATE orders SET deleted = 'YES' WHERE order_id = ?";
  console.log(req.body.deletableOrderId);
  con.query(sql, req.body.deletableOrderId, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        Status: false,
        Error: `${err}`,
        Authentication: `${con.state}`,
      });
    } else {
      console.log(result);
      return res.json({
        Status: true,
        Result: `Order Deleted Successfully`,
        Authentication: `${con.state}`,
      });
    }
  });
});
router.get("/hi", (req, res) => {
  res.send("Server says hi");
});

export { router as orderRouter };
