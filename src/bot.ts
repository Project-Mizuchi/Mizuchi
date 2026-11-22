import { BotClient } from "./base.js";
import { token, ownerId } from './env.js';

const client = new BotClient(token, ownerId);

client.start();
