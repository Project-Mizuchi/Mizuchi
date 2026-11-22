import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { REST, Routes, type RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

const token = process.env.DISCORD_TOKEN; // Would normally be pulled from env.ts but this script can be run without the rest of the bot
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID; // Optional

if (!token || !clientId) {
  console.error("Missing DISCORD_TOKEN or CLIENT_ID in environment variables.");
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandsPath = path.join(__dirname, "commands");

async function loadCommands(dir: string): Promise<RESTPostAPIChatInputApplicationCommandsJSONBody[]> { 
  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []; //What an incredible type name
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      commands.push(...(await loadCommands(fullPath)));
    } else if (/\.(mts|ts|mjs|js)$/.test(entry.name) && !entry.name.endsWith(".d.ts")) {
      const commandModule = await import(pathToFileURL(fullPath).href);

      if ("data" in commandModule && "execute" in commandModule) {
        commands.push(commandModule.data.toJSON());
      } else {
        console.warn(`[WARNING] Command at ${fullPath} is missing "data" or "execute".`);
      }
    }
  }

  return commands;
}

async function deploy() {
  const commands = await loadCommands(commandsPath);
  const rest = new REST({ version: "10" }).setToken(token!);

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    if (guildId) {
      await rest.put(Routes.applicationGuildCommands(clientId!, guildId), { body: commands });
      console.log(`Successfully reloaded ${commands.length} guild (/) commands.`);
    } else {
      await rest.put(Routes.applicationCommands(clientId!), { body: commands });
      console.log(`Successfully reloaded ${commands.length} global (/) commands.`);
    }
  } catch (error) {
    console.error("Error deploying commands:", error);
    process.exit(1);
  }
}

deploy();
