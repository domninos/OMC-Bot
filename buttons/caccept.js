import { MessageFlags } from "discord.js";

export async function counter_accept(interaction, guild, member) {
  const [, commission_channel] = interaction.customId.split("_");

  const commissionChannel = await guild.channels.fetch(commission_channel);

  await interaction.reply({
    content: `
    Successfully accepted counter. Please proceed to ${commissionChannel}`,
    flags: MessageFlags.Ephemeral,
  });

  await commissionChannel.send({
    content: `${member} has accepted your counter. Please wait for further assistance. Thank you!`,
  });
}
