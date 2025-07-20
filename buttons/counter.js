import { createCounterEmbed } from "../embeds/quote_embeds.js";
import { ids } from "../util/botOptions.js";

export async function counter(interaction, guild, member) {
  const [, sender_id] = interaction.customId.split("_");

  const sender = await guild.members.fetch(sender_id);

  const commissionsChannel = await guild.channels.fetch(
    ids.commissions_channel
  );

  await interaction.reply({
    content: "Got it! Please state your counter offer.",
  });

  const filter = (msg) => msg.author.id === member.id;
  const collector = interaction.channel.createMessageCollector({
    filter,
    max: 1,
    time: 60000,
  });

  collector.on("collect", async (msg) => {
    await commissionsChannel.send(
      createCounterEmbed(sender, msg.content, interaction.channel)
    );

    await interaction.followUp({
      content: `Sent counter of: \`${msg.content}\``,
    });
  });
}
