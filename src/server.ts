import express from "express";
import { initDB } from "./config/db";
import bookRoutes from "./routes/bookroutes";
import cors from "cors";
const app = express();
app.use(express.json());

initDB();
app.use(cors());
app.use("/books", bookRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});