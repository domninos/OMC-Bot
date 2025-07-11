import { Events } from "discord.js";

export const name = Events.ClientReady;
export const once = true;

export async function execute(client) {
  console.log(`Bot is in ${client.guilds.cache.size} guilds:`);

  client.guilds.cache.forEach((guild) => {
    console.log(
      `- ${guild.name} (ID: ${guild.id}) - ${guild.memberCount} members`
    );
  });

  console.log(`${client.user.tag} has logged in!`);
}
