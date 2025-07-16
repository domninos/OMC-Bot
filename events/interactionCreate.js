import { Events } from "discord.js";

import { executeChatInputCommand } from "../interactionTypes/chatInputCommand.js";
import { executeButton } from "../interactionTypes/button.js";
import { executeModalSubmit } from "../interactionTypes/modalSubmit.js";

export const name = Events.InteractionCreate;

export async function execute(interaction) {
  if (interaction.isChatInputCommand()) {
    await executeChatInputCommand(interaction);
    return;
  }

  const guild = interaction.guild;
  const member = interaction.member;

  // TODO just make this an emoji
  // if (interaction.isStringSelectMenu()) {
  //   await executeSelectMenu(interaction, guild);
  //   return;
  // }

  if (interaction.isButton()) {
    await executeButton(interaction, guild, member);
    return;
  }

  if (interaction.isModalSubmit()) {
    await executeModalSubmit(interaction, guild, member);
    return;
  }
}
