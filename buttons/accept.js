import {
  getBudget,
  getCommissionMessage,
  getDescription,
  getThread,
  getTimeFrame,
  setBudget,
} from "../data/jsonHelper.js";
import { createCommissionEmbedDisabled } from "../embeds/commission_embeds.js";
import { channels, roles } from "../util/botOptions.js";

import { PermissionsBitField } from "discord.js";

export async function accept(interaction, guild, member) {
  const [, sender_id, quoting] = interaction.customId.split("_");

  const sender = await guild.members.fetch(sender_id);

  await interaction.channel.permissionOverwrites.edit(sender.id, {
    [PermissionsBitField.Flags.ViewChannel]: true,
    [PermissionsBitField.Flags.SendMessages]: true,
  });

  const commissionsChannel = channels.commissions;

  await commissionsChannel.send({
    content: `${sender} your quote has been accepted by ${member}`,
  });

  const commission_message_id = getCommissionMessage(interaction.channel.id);
  const commission_message = await commissionsChannel.messages.fetch(
    commission_message_id
  );

  const threadId = getThread(interaction.channel.id);
  const thread = await guild.channels.fetch(threadId);
  await thread.setLocked(true);

  setBudget(interaction.channel.id, quoting);

  const cmManager = roles.commission_manager;
  const budget = getBudget(interaction.channel.id);
  const time_frame = getTimeFrame(interaction.channel.id);
  const description = getDescription(interaction.channel.id);

  await commission_message.edit(
    createCommissionEmbedDisabled(
      cmManager,
      interaction.user,
      budget,
      time_frame,
      description,
      interaction.channel.id
    )
  );
}
