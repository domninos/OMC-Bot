import { Events } from "discord.js";

import { plugin_row_menu, plugin_row_btn } from "../util/botOptions.js";

export const name = Events.MessageCreate;

export async function execute(message) {
  if (message.author.bot) return;

  let prefix = "=";
  let args = message.content.slice(prefix.length).trim().split("/s+/");

  const command = args.shift().toLowerCase();

  // command handlers
  if (command === "ping") {
    await message.channel.send("Pong!");
  } else if (command === "server") {
    await message.channel.send(
      `This server is ${message.guild.name} and has ${message.guild.memberCount} members.`
    );
  } else if (command === "sendroles") {
    await message.channel.send({
      content: "Click to receive the role:",
      components: [plugin_row_menu, plugin_row_btn],
    });
  }
}
