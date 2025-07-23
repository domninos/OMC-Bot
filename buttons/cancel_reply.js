import { MessageFlags } from "discord.js";

export async function cancel_reply_func(interaction, guild, member) {
  await interaction.reply({
    content: "Reply not sent.",
    flags: MessageFlags.Ephemeral,
  });
}
