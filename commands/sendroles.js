import {
  InteractionContextType,
  MessageFlags,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";

import { createRolesEmbed } from "../embeds/other_embeds.js";

export const data = new SlashCommandBuilder()
  .setName("sendroles")
  .setDescription("Send a role menu.")
  .addChannelOption((channel) =>
    channel
      .setName("channel")
      .setDescription("The channel to send the roles onto")
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setContexts(InteractionContextType.Guild);

export async function execute(interaction) {
  await interaction.reply({
    content: "Success!",
    flags: MessageFlags.Ephemeral,
  });

  const channel = interaction.options.getChannel("channel");

  channel.send(createRolesEmbed()).then((message) => {
    message.react("📟"); // NearChat
  });
}
