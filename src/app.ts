import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalMiddleware from "./app/middleware/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("yee, the server is running successfully");
});

app.use(globalMiddleware);

export default app;
