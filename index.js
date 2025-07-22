import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits, Partials } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessagePolls,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// deploy commands to discord api
import { deploy } from "./util/deploy-commands.js";
await deploy();

import load_commands from "./loaders/command-loader.js";
await load_commands(client);

import load_events from "./loaders/event-loader.js";
import { saveJSON } from "./data/jsonHelper.js";
await load_events(client);

client.login(process.env.DISCORD_TOKEN);

process.on("SIGINT", () => {
  saveJSON();
  process.exit();
});
