import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ContainerBuilder,
  AttachmentBuilder,
  MessageFlags,
  StringSelectMenuBuilder,
} from "discord.js";

import { reason_options } from "./botOptions.js";

function formatTimestamp(timestamp) {
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

const omc_logo = new AttachmentBuilder("./assets/OMC.png");

const create_ticket = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId(`comm_create`)
    .setLabel("Order Now")
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setLabel("Terms of Service")
    .setURL(
      "https://discord.com/channels/731055234800943106/1391957098404909108"
    )
    .setStyle(ButtonStyle.Link)
);

export function createTicketContainer() {
  const ticketEmbed = new ContainerBuilder()
    .setAccentColor(0x00d4aa)
    .addSeparatorComponents((separator) => separator)
    .addSectionComponents((section) =>
      section
        .addTextDisplayComponents(
          (textDisplay) => textDisplay.setContent("Welcome to **OMC**! "),
          (textDisplay) =>
            textDisplay.setContent(
              "Before ordering, please make sure you have read, understand, and agree to the Terms of Service."
            )
        )
        .setThumbnailAccessory((thumbnail) =>
          thumbnail
            .setDescription("The OMC logo")
            .setURL("attachment://OMC.png")
        )
    )
    .addSeparatorComponents((separator) => separator)
    .addTextDisplayComponents((textDisplay) =>
      textDisplay.setContent(
        '**You hereby agree to our ToS upon clicking the "Order Now" Button.**'
      )
    );

  return {
    content: "",
    components: [ticketEmbed, create_ticket],
    files: [omc_logo],
    flags: MessageFlags.IsComponentsV2,
  };
}

export function createCommissionEmbed(
  commission_manager,
  user,
  budget,
  time_frame,
  description,
  commissionChannel
) {
  const commissionEmbed = new EmbedBuilder()
    .setColor("#00D4AA")
    .setTitle("**New Commission**")
    .setThumbnail(user.displayAvatarURL())

    .addFields({
      name: "**Customer**",
      value: `${user}`,
      inline: false,
    })

    .addFields(
      {
        name: "**Budget**",
        value: `${budget}`,
        inline: true,
      },
      {
        name: "**Timeframe**",
        value: `${time_frame}`,
        inline: true,
      }
    )

    .addFields({
      name: "**Project Description**",
      value: `${description}`,
      inline: false,
    })

    .addFields({ name: "\u200b", value: "\u200b", inline: false })

    .addFields({
      name: "**Status**",
      value: "✅", // (should be OPEN, ACCEPTED, CLOSED)
      inline: true,
    })

    .setFooter({
      text: "OMC Commissions\t\t\t\t\t",
    })
    .setTimestamp();

  const quote = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`quote_${commissionChannel}`)
      .setLabel("Send a Quote")
      .setStyle(ButtonStyle.Primary)
  );

  return {
    content: `{commission_manager}`, // replace with commission
    embeds: [commissionEmbed],
    components: [quote],
  };
}

const cancel = new ActionRowBuilder().setComponents(
  new ButtonBuilder()
    .setCustomId(`cancel`)
    .setLabel("Cancel")
    .setStyle(ButtonStyle.Danger)
);

export function createFirstCommEmbeds(budget, time_frame, description) {
  const container = new ContainerBuilder()
    .setAccentColor(0x00d4aa)
    .addTextDisplayComponents((textDisplay) =>
      textDisplay.setContent(
        "**Thank you for trusting OMC! Please wait for the Commission Managers.**"
      )
    )
    .addSeparatorComponents((separator) => separator)
    .addTextDisplayComponents(
      (textDisplay) =>
        textDisplay.setContent(
          "We will be sending quotes to you. You can _accept_, _counter_, or _reject_ our offer."
        ),
      (textDisplay) =>
        textDisplay.setContent(
          "You may cancel your order by pressing the _Cancel_ button."
        )
    )
    .addSeparatorComponents((separator) => separator)
    .addTextDisplayComponents(
      (textDisplay) => textDisplay.setContent("**Budget**"),
      (textDisplay) => textDisplay.setContent(`\`\`\`${budget}\`\`\``)
    )
    .addTextDisplayComponents(
      (textDisplay) => textDisplay.setContent("**Timeframe**"),
      (textDisplay) => textDisplay.setContent(`\`\`\`${time_frame}\`\`\``)
    )
    .addTextDisplayComponents(
      (textDisplay) => textDisplay.setContent("**Description of the Project**"),
      (textDisplay) => textDisplay.setContent(`\`\`\`${description}\`\`\``)
    )
    .addTextDisplayComponents((textDisplay) =>
      textDisplay.setContent(
        "**You may not cancel the order once you accept a quote.**"
      )
    );
  return {
    content: "",
    components: [container, cancel],
    flags: MessageFlags.IsComponentsV2,
  };
}

const yes_no = new ActionRowBuilder().setComponents(
  new ButtonBuilder()
    .setCustomId(`yes`)
    .setLabel("Yes")
    .setStyle(ButtonStyle.Primary),
  new ButtonBuilder()
    .setCustomId("no")
    .setLabel("No")
    .setStyle(ButtonStyle.Secondary)
);

export function createSureEmbed() {
  const container = new ContainerBuilder()
    .setAccentColor(0x00d4aa)
    .addTextDisplayComponents((textDisplay) =>
      textDisplay.setContent("Are you sure you want to cancel your order?")
    );

  return {
    components: [container, yes_no],
    flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
  };
}

export function createArchiveEmbed(user, reason) {
  const container = new ContainerBuilder()
    .setAccentColor(0x00d4aa)
    .addSectionComponents((section) =>
      section
        .addTextDisplayComponents(
          (textDisplay) => textDisplay.setContent(`Archiving ${user}'s ticket`),
          (textDisplay) => textDisplay.setContent("**Archived**"),
          (textDisplay) =>
            textDisplay.setContent(`${formatTimestamp(new Date().getTime())}`)
        )
        .setThumbnailAccessory((thumbnail) =>
          thumbnail.setURL(user.displayAvatarURL())
        )
    )
    .addTextDisplayComponents(
      (textDisplay) => textDisplay.setContent("**Reason(s)**"),
      (textDisplay) => textDisplay.setContent(`\`\`\`${reason}\`\`\``)
    );

  return {
    components: [container],
    flags: [MessageFlags.IsComponentsV2],
  };
}

const reason_menu = new StringSelectMenuBuilder()
  .setCustomId("reasons")
  .setMinValues(1)
  .setMaxValues(4)
  .setPlaceholder("Choose your reason here")
  .setOptions(reason_options);

export function createReasonEmbed() {
  const container = new ContainerBuilder()
    .setAccentColor(0x00d4aa)
    .addTextDisplayComponents((textDisplay) =>
      textDisplay.setContent("**Archiving**")
    )
    .addActionRowComponents((row) => row.addComponents(reason_menu));

  return {
    components: [container],
    flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
  };
}

export function createQuoteEmbed(quoting, sender) {
  const container = new ContainerBuilder()
    .setAccentColor(0x00d4aa)
    .addTextDisplayComponents(
      (textDisplay) => textDisplay.setContent("**Quotes**"),
      (textDisplay) => textDisplay.setContent(`${sender}: \`${quoting}\``)
    );

  const accept_counter = new ActionRowBuilder().setComponents(
    new ButtonBuilder()
      .setCustomId(`accept_${sender.id}`)
      .setLabel("Accept")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(`counter_${sender.id}`)
      .setLabel("Counter")
      .setStyle(ButtonStyle.Secondary)
  );

  return {
    components: [container, accept_counter],
    flags: MessageFlags.IsComponentsV2,
  };
}

export function createThreadEmbed(user, budget, time_frame, description) {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: `${user.tag}`,
      iconURL: user.displayAvatarURL(),
    })
    .setColor("#00D4AA")
    .setTitle("**Commission**")

    .addFields(
      { name: "Budget:", value: `${budget}`, inline: true },
      { name: "Time frame:", value: `${time_frame}`, inline: true },
      { name: "Description:", value: `${description}`, inline: true }
    )

    .setTimestamp();

  return {
    embeds: [embed],
  };
}

export function createCounterEmbed(sender, counter, commission_channel) {
  const embed = new EmbedBuilder()
    .setColor("#00D4AA")
    .setTitle(`**${sender.user.tag}'s Counter**`)
    .setThumbnail(sender.displayAvatarURL())

    .addFields({
      name: "",
      value: `${counter}`,
      inline: false,
    })

    .addFields({ name: "\u200b", value: "\u200b", inline: false })

    .addFields({
      name: "",
      value: "If you like this counter offer, click the Accept button.",
      inline: false,
    });

  const accept = new ActionRowBuilder().setComponents(
    new ButtonBuilder()
      .setCustomId(`caccept_${commission_channel.id}`)
      .setLabel("Accept")
      .setStyle(ButtonStyle.Primary)
  );

  return {
    embeds: [embed],
    components: [accept],
  };
}

export function createQuotingEmbed(quoting) {
  const container = new ContainerBuilder()
    .setAccentColor(0x00d4aa)
    .addTextDisplayComponents(
      (textDisplay) => textDisplay.setContent("**Quote**"),
      (textDisplay) => textDisplay.setContent(`\`${quoting}\``)
    );

  return {
    components: [container],
    flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
  };
}
