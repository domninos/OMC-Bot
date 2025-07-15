import { createSureEmbed } from "../embeds/archive_embeds.js";

export async function cancel_func(interaction, guild, member) {
  await interaction.reply(createSureEmbed());
}
