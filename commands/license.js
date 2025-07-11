import {
  InteractionContextType,
  MessageFlags,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";

import {
  get_all,
  get_status,
  get_license,
  create_license,
  register_license,
  update_value,
} from "../loaders/api-loader.js";

import { createLicenseEmbed } from "../util/embed-builder.js";

// TODO other plugins
const choices = {
  name: "NearChat",
  value: "nearchat",
};

// TODO autocomplete, pagination (of getall)

export const data = new SlashCommandBuilder()
  .setName("license")
  .setDescription("All about license")
  .addSubcommand((get) =>
    get
      .setName("get")
      .setDescription("Get the license for a certain network")
      .addStringOption((option) =>
        option
          .setName("plugin")
          .setDescription("The plugin for the license")
          .setChoices(choices)
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("network_id")
          .setDescription("The network id to look for")
          .setRequired(true)
      )
  )
  .addSubcommand((create) =>
    create
      .setName("create")
      .setDescription("Create a new valid license for a user to activate.")
      .addStringOption((option) =>
        option
          .setName("plugin")
          .setDescription("The plugin to make the license for.")
          .setChoices(choices)
          .setRequired(true)
      )
  )
  .addSubcommand((status) =>
    status
      .setName("status")
      .setDescription(
        "Get the status for a license (ACTIVE, REVOKED, WAITING, NULL)"
      )
      .addStringOption((option) =>
        option
          .setName("plugin")
          .setDescription("The plugin to look from")
          .setChoices(choices)
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("license")
          .setDescription("The license to get status of")
          .setRequired(true)
      )
  )
  .addSubcommand((getall) =>
    getall
      .setName("getall")
      .setDescription("Get all license data")
      .addStringOption((option) =>
        option
          .setName("plugin")
          .setDescription("The plugin for the license")
          .setChoices(choices)
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("license")
          .setDescription("The license key to look for")
          .setRequired(true)
      )
  )
  .addSubcommand((update) =>
    update
      .setName("update")
      .setDescription("Update information about a license")
      .addStringOption((option) =>
        option
          .setName("plugin")
          .setDescription("The plugin to update license information for")
          .setChoices(choices)
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("license")
          .setDescription("The license to update information for")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("key")
          .setDescription("The key to update")
          .setChoices({
            name: "bought_by",
            value: "bought_by",
          })
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("value")
          .setDescription("The value to set for update")
          .setRequired(true)
      )
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setContexts(InteractionContextType.Guild);

export async function execute(interaction) {
  const plugin = interaction.options.getString("plugin");
  const network_id = interaction.options.getString("network_id");
  const license_arg = interaction.options.getString("license");

  switch (interaction.options.getSubcommand()) {
    case "get":
      if (network_id === "N/A") {
        await interaction.reply("Invalid argument. `N/A` is not valid.");
        break;
      }

      const license_key = await get_license(plugin, network_id);

      await interaction.reply({
        content: `License: ${license_key}`,
      });

      console.log(
        `User: ${interaction.user.displayName} (${interaction.user.tag}) got license key of ${network_id} from ${plugin}.${network_id}`
      );
      break;

    case "create":
      const key = create_license(plugin);
      await register_license(plugin, key);

      await interaction.reply({
        content: `\`Unregistered License Key (${plugin}):\` ||${key}||`,
      });

      console.log(
        `User: ${interaction.user.displayName} (${interaction.user.tag}) created a license key of ${key} for ${plugin}`
      );
      break;

    case "status":
      const status = await get_status(plugin, license_arg);

      await interaction.reply({
        content: `Status: ${status.toUpperCase()}`,
      });

      console.log(
        `User: ${interaction.user.displayName} (${interaction.user.tag}) got status information of ${status} from ${plugin}.${network_id}`
      );
      break;

    case "getall":
      if (network_id === "N/A") {
        await interaction.reply("Invalid argument. `N/A` is not valid.");
        break;
      }

      const license = await get_all(plugin, license_arg);
      const licenseData = createLicenseEmbed(
        plugin,
        license[0],
        interaction.user
      );

      await interaction.reply(licenseData);

      console.log(
        `User: ${interaction.user.displayName} (${interaction.user.tag}) got license information of ${license[0].license} from ${license[0].network_id}`
      );
      break;

    case "update":
      const key_arg = interaction.options.getString("key");
      const value_arg = interaction.options.getString("value");

      await update_value(plugin, license_arg, key_arg, value_arg);

      await interaction.reply({
        content: `Updated ${key_arg} to ${value_arg} of ${license_arg}`,
        flags: MessageFlags.Ephemeral,
      });

      console.log(
        `User: ${interaction.user.displayName} (${interaction.user.tag}) updated license information of ${license_arg} (${key_arg} = ${value_arg})`
      );

      break;

    default:
      break;
  }
}
