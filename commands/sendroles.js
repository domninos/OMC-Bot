import {
  InteractionContextType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";

import { plugin_row_menu, plugin_row_btn } from "../util/botOptions.js";

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

// TODO parse args[0] and that should be the text channel

export async function execute(interaction) {
  await interaction.reply("Success!");

  const channel = interaction.options.getChannel("channel");

  await channel.send({
    content: "Click to receive the role:",
    components: [plugin_row_menu, plugin_row_btn],
  });
}
