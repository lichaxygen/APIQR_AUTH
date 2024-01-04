import {Sequelize} from "sequelize";
import { config } from '../config.js';

export const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: "mysql",
});

export async function test_connection(){
  try {
    console.log("### Testing connection to database! ###")
    await sequelize.authenticate();
    console.log("### Good to go! ###")
  } catch (err) {
    console.error("### Something went wrong in the aunthentification of the db ###")
  }
}

