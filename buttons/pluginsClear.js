import { MessageFlags } from "discord.js";

import { plugin_row_btn, plugin_row_menu } from "../util/botOptions.js";

export async function plugin_clear(interaction, guild, member) {
  const roles = await Promise.all(
    options.map((option) => guild.roles.fetch(option.value))
  );

  roles.map(async (role) => {
    if (!role || !member.roles.cache.has(role.id)) {
      if (interaction.replied || interaction.deferred) {
        await interaction.update({
          content: "No plugin roles to remove.",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "No plugin roles to remove.",
          flags: MessageFlags.Ephemeral,
        });
      }
      return;
    }

    await member.roles.remove(role);

    await interaction.update({
      content: "Click to receive the role:",
      components: [plugin_row_menu, plugin_row_btn],
      flags: MessageFlags.Ephemeral,
    });

    await interaction.followUp({
      content: "Cleared all plugin roles.",
      flags: MessageFlags.Ephemeral,
    });
  });
}
