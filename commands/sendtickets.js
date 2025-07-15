import {
  InteractionContextType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { createTicketContainer } from "../embeds/commission_embeds.js";

export const data = new SlashCommandBuilder()
  .setName("sendtickets")
  .setDescription("Send the tickets menu.")
  .addChannelOption((channel) =>
    channel
      .setName("channel")
      .setDescription("The channel to send the ticket onto")
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setContexts(InteractionContextType.Guild);

// TODO parse args[0] and that should be the text channel

export async function execute(interaction) {
  await interaction.reply("Success!");

  const channel = interaction.options.getChannel("channel");

  await channel.send(createTicketContainer());
}
