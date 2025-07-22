import { Events } from "discord.js";
import { loadRoles } from "../util/botOptions.js";

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
    loadRoles(guild);
    console.log(`Loaded roles at '${guild.name}'`);
  }
}
