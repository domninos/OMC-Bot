import { Events } from "discord.js";
import { loadCategories, loadChannels, loadRoles } from "../util/botOptions.js";

export const name = Events.GuildCreate;
export const once = true;

const ALLOWED_GUILDS = [process.env.OMC_ID];

export async function execute(guild) {
  if (!ALLOWED_GUILDS.includes(guild.id)) {
    console.log(
      `Left unauthorized server: ${guild.name} (ID: ${guild.id}) - ${guild.memberCount} members`
    );
    guild.leave();
  } else {
    loadChannels(guild);
    loadCategories(guild);
    loadRoles(guild);
    console.log(
      `\nLoaded roles, channels, and categories at '${guild.name}'\n`
    );
  }
}
