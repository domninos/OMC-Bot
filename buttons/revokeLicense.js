import { MessageFlags } from "discord.js";

import { revoke_license } from "../loaders/api-loader.js";

import { refresh_license } from "./refreshLicense.js";

export async function revoke_license_func(interaction, guild, member) {
  const [, , plugin, license, status] = interaction.customId.split("_");

  if (status === "revoked") {
    await interaction.reply({
      content: "License already revoked.",
      flags: MessageFlags.Ephemeral,
    });

    return;
  }

  const result = await revoke_license(plugin, license);

  await refresh_license(interaction, plugin, license);

  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({
      content: `${result}`,
    });
  }

  console.log(
    `User: ${interaction.user.displayName} (${interaction.user.tag}) revoked license ${license}`
  );
}
