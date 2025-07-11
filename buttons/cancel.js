import { createSureEmbed } from "../util/embed-builder.js";

export async function cancel_func(interaction, guild, member) {
  await interaction.reply(createSureEmbed());
}
