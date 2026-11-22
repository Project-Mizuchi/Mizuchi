import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST ?? "127.0.0.1",
  port: parseInt(process.env.DB_PORT ?? "3306", 10),
  username: process.env.DB_USER ?? "root", 
  password: process.env.DB_PASS ?? "", 
  database: process.env.DB_NAME ?? "Tavare", 
  synchronize: false, 
  logging: true,
  entities: [path.join(__dirname, "entities", "*.js")],
  migrations: [__dirname + "/migrations/**/*.ts"],
  subscribers: [],
});

export async function initializeDataSource() {
  try {
    await AppDataSource.initialize();
    console.log("Connected to DB!")
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  }
}