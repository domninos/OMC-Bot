import { createReasonEmbed } from "../util/embed-builder.js";

export async function yes_func(interaction, guild, member) {
  await interaction.update(createReasonEmbed());
}
