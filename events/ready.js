import { Events } from "discord.js";

import { loadJSON } from "../data/jsonHelper.js";
import { loadCategories, loadChannels, loadRoles } from "../util/botOptions.js";

export const name = Events.ClientReady;
export const once = true;

export async function execute(client) {
  console.log(`\nBot is in ${client.guilds.cache.size} guild(s):`);

  client.guilds.cache.forEach((guild) => {
    console.log(
      `- ${guild.name} (ID: ${guild.id}) - ${guild.memberCount} members`
    );

    loadRoles(guild);
    loadCategories(guild);
    loadChannels(guild);

    console.log(
      `\nLoaded roles, categories, and channels at '${guild.name}'\n`
    );
  });

  console.log(`${client.user.tag} has logged in!`);

  console.log("Loading commissions..");

  loadJSON();
  console.log("Loaded!");
}
