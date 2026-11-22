import { AugurClient } from "augurbot-ts";
import { AppDataSource } from "./database/dataSource.js";

export class BotClient {
  private client: AugurClient;
  private token: string;

  public constructor(token: string, ownerId: string) {
    this.token = token;
        this.client = new AugurClient(
      {
        token,
        ownerId,
        events: ["interactionCreate"],
      },
      {
        modules: "./dist/modules",
        delayStart: async () => {
          if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log("MariaDB DataSource initialized!");
          }
        },
      },
    );
  }

  public async start(): Promise<void> {
    const readyPromise = new Promise<void>((resolve) => {
      this.client.once("ready", () => resolve());
    });

    await this.client.login(this.token);
    console.log(`Logged in successfully as ${this.client.user?.tag}`);
    await readyPromise;
  }
}
