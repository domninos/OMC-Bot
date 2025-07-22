import { Events } from "discord.js";

import { roles } from "../util/botOptions.js";

export const name = Events.MessageReactionRemove;

// channel for select-roles: 1395006523255689367

export async function execute(reaction, user) {
  if (user.bot) return;

  // Fetch partials if necessary
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();

  const emoji = reaction.emoji.name;
  const guild = reaction.message.guild;

  if (emoji === "📟") {
    const member = await guild.members.fetch(user.id);

    const role = roles.nearchat;

    if (role && member.roles.cache.has(role.id)) {
      member.roles.remove(role).then(() => {
        console.log(`Removed NearChat from ${member.user.tag}`);
      });
    }
  }
}
