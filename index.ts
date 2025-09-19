import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { Repositories } from "./repositories";
import { routes } from "./routes";
import { Controllers } from "./controllers";

dotenv.config();

const APP_PORT = process.env.APP_PORT;
const DATA_BUS_API_URL = process.env.DATA_BUS_API_URL ?? "";
const MIS_API_URL = process.env.MIS_API_URL ?? "";

async function start() {
  try {
    const app = express();

    const repositories = new Repositories(DATA_BUS_API_URL, MIS_API_URL);
    const controllers = new Controllers(repositories);

    app.use(
      express.urlencoded({
        extended: true,
      })
    );

    app.use(
      express.json({
        limit: "30kb",
      })
    );

    app.use(morgan("dev"));

    app.use(cors());

    app.use("/api", routes(controllers));

    app.listen(APP_PORT, () => {
      console.log(`http://localhost:${APP_PORT}`);
    });
  } catch (e) {
    console.log("Something went wrong: ", e);
  }
}

start();
