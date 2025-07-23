import { MessageFlags } from "discord.js";
import { sendReplyToCommision } from "../embeds/other_embeds.js";

export async function send_reply_func(interaction, guild, member) {
  const [, , commission_channel, reply] = interaction.customId.split("_");

  console.log(commission_channel);

  const commissionChannel = await guild.channels.fetch(commission_channel);

  await commissionChannel.send(sendReplyToCommision(member, reply));

  await interaction.reply({
    content: "Reply sent!",
    flags: MessageFlags.Ephemeral,
  });
}
