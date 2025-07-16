import { Events, MessageFlags } from "discord.js";

export const name = Events.MessageReactionAdd;

export async function execute(reaction, user) {
  if (user.bot) return;

  // Fetch partials if necessary
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();

  const emoji = reaction.emoji.name;
  const guild = reaction.message.guild;
  const channel = reaction.message.channel;

  if (emoji === "📟") {
    const member = await guild.members.fetch(user.id);
    const role = guild.roles.cache.find((r) => r.name === "NearChat");

    if (!member.roles.cache.has(role.id)) {
      member.roles.add(role).then(async () => {
        await channel.send({
          content: "You can now access NearChat channels.",
          flags: MessageFlags.Ephemeral,
        });
        console.log(`Added role to ${member.user.tag}`);
      });
    }
  }
}
