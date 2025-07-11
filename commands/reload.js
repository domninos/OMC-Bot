import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  InteractionContextType,
  MessageFlags,
} from "discord.js";

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const data = new SlashCommandBuilder()
  .setName("reload")
  .setDescription("Reloads a command.")
  .addStringOption((option) =>
    option
      .setName("command")
      .setDescription("The command to reload")
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setContexts(InteractionContextType.Guild);

export async function execute(interaction) {
  const commandName = interaction.options
    .getString("command", true)
    .toLowerCase();
  const command = interaction.client.commands.get(commandName);

  // Re-import the module dynamically with cache-busting via a query string
  const timestamp = Date.now();
  const moduleURL = `${
    pathToFileURL(path.join(__dirname, `${command.data.name}.js`)).href
  }?update=${timestamp}`;

  if (!command) {
    return interaction.reply(
      `There is no command with name \`${commandName}\`!`
    );
  }

  try {
    const newCommand = await import(moduleURL);

    interaction.client.commands.set(newCommand.data.name, newCommand);

    await interaction.reply({
      content: `Command \`${newCommand.data.name}\` was reloaded!`,
      flags: MessageFlags.Ephemeral,
    });
  } catch (error) {
    console.error(error);
    await interaction.reply(
      `There was an error while reloading command \`${command.data.name}\`:\n\`${error.message}\``
    );
  }
}
