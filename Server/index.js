import express from "express";
import cors from "cors";
import { orderRouter } from "./Routes/OrderRoutes.js";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://creamnbeans-repo-server.vercel.app",
      "https://creamnbeans-repo-client.vercel.app",
    ],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(orderRouter);

app.listen(3000, () => {
  console.log("Server is listening");
});
app.use("/", (req, res) => {
  res.send("Routing error go to https://creamnbeans-repo-client.vercel.app");
});
