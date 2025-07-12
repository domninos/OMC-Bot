import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export function formatTimestamp(timestamp) {
  if (!timestamp) return "N/A";

  const date = new Date(timestamp);
  const unixTimestamp = Math.floor(date.getTime() / 1000);

  return `<t:${unixTimestamp}:R>`;
}

/*
TODO
  ADD plugin version
*/

export function createLicenseEmbed(plugin, licenseData, user) {
  const licenseEmbed = new EmbedBuilder()
    .setColor("#00D4AA")
    .setTitle("🔐 **LICENSE INFORMATION**")
    .setThumbnail(user.displayAvatarURL())

    .addFields(
      {
        name: "**Network ID**",
        value: `\`${licenseData.network_id || "N/A"}\``,
        inline: true,
      },
      {
        name: "**IP**",
        value: `\`${licenseData.ip || "N/A"}\``,
        inline: false,
      }
    )

    .addFields(
      {
        name: "**License**",
        value: ` \`${licenseData.license || "N/A"}\``,
        inline: false,
      },
      {
        name: "Status",
        value: `\`${licenseData.status.toUpperCase() || "N/A"}\``,
        inline: true,
      }
    )

    .addFields(
      {
        name: "**Bought By**",
        value: `\`${licenseData.bought_by || "N/A"}\``,
        inline: false,
      },
      {
        name: "**Created**",
        value: `${formatTimestamp(licenseData.created_at) || "N/A"}`,
        inline: true,
      }
    )

    .addFields({ name: "\u200b", value: "\u200b", inline: false })

    .addFields({
      name: "**Last Seen**",
      value: `**${formatTimestamp(licenseData.last_seen)}**`,
      inline: true,
    })

    .setFooter({
      text: `OMCLicense Management System • ${user.tag || "N/A"}`,
    })
    .setTimestamp();

  const refresh_revoke = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`refresh_license_${plugin}_${licenseData.license}`)
      .setLabel("Refresh")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(
        `revoke_license_${plugin}_${licenseData.license}_${licenseData.status}`
      )
      .setLabel("Revoke")
      .setStyle(ButtonStyle.Danger)
  );

  return {
    embeds: [licenseEmbed],
    components: [refresh_revoke],
  };
}
