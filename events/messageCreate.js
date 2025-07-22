import { Events } from "discord.js";

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
    message.channel.send(createRolesEmbed()).then((message) => {
      message.react("📟"); // NearChat
    });
  }
}
