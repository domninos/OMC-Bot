import { MessageFlags, PermissionsBitField } from "discord.js";

import { ids } from "../util/botOptions.js";
import { createArchiveEmbed } from "../embeds/archive_embeds.js";

export async function executeSelectMenu(interaction, guild, member) {
  if (interaction.customId === "reasons") {
    let values = [...interaction.values];
    const archive_category = await guild.channels.fetch(ids.archive_channel);

    await removePendingRole(member, guild);

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

async function removePendingRole(member, guild) {
  if (member.roles.cache.has(ids.pending_role)) {
    const pending = await guild.roles.fetch(ids.pending_role);
    await member.roles.add(pending);
  }
}
