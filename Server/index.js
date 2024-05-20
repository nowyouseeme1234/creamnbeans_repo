import express from "express"
import cors from 'cors'
import { orderRouter } from "./Routes/OrderRoutes.js";

const app = express()
app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.101.16:8080", "http://192.168.101.16:8081", 'https://mystifying-firefly-37170.pktriot.net'],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}))

app.use(express.json())
app.use(orderRouter)

app.listen(3000, '0.0.0.0', () => {
    console.log("Server is running")
})