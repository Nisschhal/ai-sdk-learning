import "dotenv/config"
import express from "express"
import generateTextRouter from "./routes/generate-text"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    // credentials: true,
  }),
)

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use("/api", generateTextRouter)

app.listen(8000, () => {
  console.log("Server is running on port 8000")
})
