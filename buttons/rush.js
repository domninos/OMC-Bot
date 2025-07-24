import { MessageFlags } from "discord.js";
import {
  getBudget,
  getCommissionMessage,
  getDescription,
  getRush,
  getStatus,
  getTimeFrame,
  setRush,
} from "../data/jsonHelper.js";
import {
  createCommissionEmbed,
  createCommissionEmbedDisabled,
} from "../embeds/commission_embeds.js";
import { channels, roles } from "../util/botOptions.js";

export async function rush_func(interaction, guild, member) {
  const [, type] = interaction.customId.split("_");

  const commissionsChannel = channels.commissions;

  const commission_message_id = getCommissionMessage(interaction.channel.id);
  const commission_message = await commissionsChannel.messages.fetch(
    commission_message_id
  );

  const cmManager = roles.commission_manager;
  const budget = getBudget(interaction.channel.id);
  const time_frame = getTimeFrame(interaction.channel.id);
  const description = getDescription(interaction.channel.id);
  const status = getStatus(interaction.channel.id);

  if (type === "yes") {
    // is rush
    // edit commission message, automatically add 16% to budget since rush

    interaction.reply({
      content:
        "Successfully set this as a rush project. Please wait for further assistance.",
    });

    setRush(interaction.channel.id, "Yes");
    const rush = getRush(interaction.channel.id);

    const commissionsChannel = channels.commissions;

    const commission_message_id = getCommissionMessage(interaction.channel.id);
    const commission_message = await commissionsChannel.messages.fetch(
      commission_message_id
    );

    await commission_message.edit(
      createCommissionEmbedDisabled(
        cmManager,
        interaction.user,
        budget,
        time_frame,
        description,
        rush,
        status,
        interaction.channel
      )
    );
  } else if (type === "no") {
    // not rush
    interaction.reply({
      content: "Successfully set this as a standard project. Please standby.",
    });

    setRush(interaction.channel.id, "No");
    const rush = getRush(interaction.channel.id);

    await commission_message.edit(
      createCommissionEmbed(
        cmManager,
        interaction.user,
        budget,
        time_frame,
        description,
        rush,
        status,
        interaction.channel
      )
    );
  }
}
