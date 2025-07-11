export async function counter_accept(interaction, guild, member) {
  const [, commission_channel] = interaction.customId.split("_");

  const commissionChannel = await guild.channels.fetch(commission_channel);

  await commissionChannel.send({
    content: `${member} has accepted your counter. Please wait while we set things up.`,
  });
}
