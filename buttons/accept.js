import { channels } from "../util/botOptions.js";

import { PermissionsBitField } from "discord.js";

export async function accept(interaction, guild, member) {
  const [, sender_id] = interaction.customId.split("_");

  const sender = await guild.members.fetch(sender_id);

  // sender = undefined
  await interaction.channel.permissionOverwrites.edit(sender.id, {
    [PermissionsBitField.Flags.ViewChannel]: true,
    [PermissionsBitField.Flags.SendMessages]: true,
  });

  const commissionsChannel = channels.commissions;

  await commissionsChannel.send({
    content: `${sender} your quote has been accepted by ${member}`,
  });
  // TODO
}
