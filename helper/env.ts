import * as dotenv from "dotenv";

export const getEnv = () => {
  dotenv.config({
    override: true,
    path: `src/env/.env.${process.env.ENV}`
  });
};
