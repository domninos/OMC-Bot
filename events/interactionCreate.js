import { Events } from "discord.js";

import { executeChatInputCommand } from "../interactionTypes/chatInputCommand.js";
import { executeButton } from "../interactionTypes/button.js";
import { executeModalSubmit } from "../interactionTypes/modalSubmit.js";
import { executeSelectMenu } from "../interactionTypes/stringSelectMenu.js";

export const name = Events.InteractionCreate;

export async function execute(interaction) {
  if (interaction.isChatInputCommand()) {
    await executeChatInputCommand(interaction);
    return;
  }

  const guild = interaction.guild;
  const member = interaction.member;

  if (interaction.isStringSelectMenu()) {
    await executeSelectMenu(interaction, guild, member);
    return;
  }

  if (interaction.isButton()) {
    await executeButton(interaction, guild, member);
    return;
  }

  if (interaction.isModalSubmit()) {
    await executeModalSubmit(interaction, guild, member);
    return;
  }
}
