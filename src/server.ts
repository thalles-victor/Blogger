import "dotenv/config"
import express from 'express';
import cors from 'cors'
import { userRouter } from "./Applicaton/Adapter/RestAPi/Routes/userRouter";
import { postRouter } from "./Applicaton/Adapter/RestAPi/Routes/postRouter";

const app = express();

app.use(cors());
app.use(express.json())
app.use("/user", userRouter)
app.use("/post", postRouter);


const PORT  = process.env.PORT;
app.listen(
  PORT,
  () => {
    console.log("Server is running at http://localhost:" + PORT);
  }
)