import { MessageFlags, PermissionsBitField } from "discord.js";

import { plugin_row_menu, plugin_row_btn } from "../util/botOptions.js";
import { createArchiveEmbed } from "../util/embed-builder.js";

export async function executeSelectMenu(interaction, guild) {
  if (interaction.customId === "plugins_menu") {
    try {
      const values = interaction.values;

      const roles = await values
        .map(async (v) => {
          let role = await guild.roles.fetch(v);

          if (!member.roles.cache.has(role.id)) {
            await member.roles.add(role);
          }

          return role;
        })
        .map((role) => {
          return role.id;
        })
        .map((role) => console.log(role));

      await interaction.update({
        content: "Click to receive the role:",
        components: [plugin_row_menu, plugin_row_btn],
        flags: MessageFlags.Ephemeral,
      });

      if (roles.size > 0) {
        await interaction.followUp({
          content: `Received the ${roles.join(", ")} role.`,
          flags: MessageFlags.Ephemeral,
        });
      }

      // TODO make sure to edit the original message
    } catch (error) {
      console.error("Error handling button interaction:", error);
      await interaction.reply({
        content: "Something went wrong while assigning your role.",
        flags: MessageFlags.Ephemeral,
      });
    }
  } else if (interaction.customId === "reasons") {
    let values = [...interaction.values];
    const archive_category = await guild.channels.fetch(ids.archive_channel);

    if (values.includes("Other")) {
      values = values.filter((v) => v !== "Other"); // remove the Other

      await interaction.reply({
        content: "Please state your reason why you want to cancel your order",
        flags: MessageFlags.Ephemeral,
      });

      const filter = (msg) => msg.author.id === member.id;
      const collector = interaction.channel.createMessageCollector({
        filter,
        max: 1,
        time: 60000,
      });

      collector.on("collect", async (msg) => {
        values.push(msg);

        await interaction.followUp(
          createArchiveEmbed(
            member.user,
            values.map((v) => `• ${v}`).join("\n")
          )
        );

        await interaction.channel.permissionOverwrites.edit(member.id, {
          [PermissionsBitField.Flags.ViewChannel]: false,
        });

        await interaction.channel.setParent(archive_category);
      });

      return;
    }

    await interaction.followUp(
      createArchiveEmbed(member.user, values.map((v) => `• ${v}`).join("\n"))
    );

    await interaction.channel.permissionOverwrites.edit(member.id, {
      [PermissionsBitField.Flags.ViewChannel]: false,
    });

    await interaction.channel.setParent(archive_category);
  }
}
