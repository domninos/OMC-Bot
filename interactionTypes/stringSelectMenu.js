import { MessageFlags, PermissionsBitField } from "discord.js";

import { categories, ids, roles } from "../util/botOptions.js";
import { createArchiveEmbed } from "../embeds/archive_embeds.js";

export async function executeSelectMenu(interaction, guild, member) {
  if (interaction.customId === "reasons") {
    let values = [...interaction.values];

    const archive_category = categories.archive;

    await removePendingRole(member);

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

async function removePendingRole(member) {
  const pending = roles.pending;

  if (member.roles.cache.has(pending.id)) {
    await member.roles.add(pending);
  }
}
