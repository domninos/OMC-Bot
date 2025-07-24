import { MessageFlags } from "discord.js";
import {
  getBudget,
  getCommissionMessage,
  getDescription,
  getRush,
  getStatus,
  getThread,
  getTimeFrame,
  setBudget,
  setStatus,
} from "../data/jsonHelper.js";
import { channels, roles } from "../util/botOptions.js";
import { createCommissionEmbedDisabled } from "../embeds/commission_embeds.js";

export async function counter_accept(interaction, guild, member) {
  const [, commission_channel, counter] = interaction.customId.split("_");

  const commissionChannel = await guild.channels.fetch(commission_channel);

  await interaction.reply({
    content: `
    Successfully accepted counter of \`${counter}\`. Please proceed to ${commissionChannel}`,
    flags: MessageFlags.Ephemeral,
  });

  await commissionChannel.send({
    content: `${member} has accepted your counter of \`${counter}\`. Please wait for further assistance. Thank you!`,
  });

  const commission_message_id = getCommissionMessage(commissionChannel.id);

  const commissionsChannel = channels.commissions;

  const commission_message = await commissionsChannel.messages.fetch(
    commission_message_id
  );

  const threadId = getThread(commissionChannel.id);
  const thread = await guild.channels.fetch(threadId);
  await thread.setLocked(true);

  setBudget(commissionChannel.id, counter);
  setStatus(commissionChannel.id, ":x:");

  const cmManager = roles.commission_manager;
  const budget = getBudget(commissionChannel.id);
  const time_frame = getTimeFrame(commissionChannel.id);
  const description = getDescription(commissionChannel.id);
  const rush = getRush(commissionChannel.id);
  const status = getStatus(commissionChannel.id);

  await commission_message.edit(
    createCommissionEmbedDisabled(
      cmManager,
      interaction.user,
      budget,
      time_frame,
      description,
      rush,
      status,
      commissionChannel
    )
  );

  // TODO also disable button on first message on main comm thread
  // TODO also edit the first comm embed
}
