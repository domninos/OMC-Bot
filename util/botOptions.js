import {
  StringSelectMenuBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";

export const options = [
  {
    label: "NearChat",
    description: "The blablabla",
    value: "1389215670910193828",
    default: false,
  },
];

export const reason_options = [
  {
    label: "Too slow",
    description: "The developer was too slow",
    value: "The developer was too slow.",
  },
  {
    label: "Could not undertand",
    description: "The developer could not understand what I'm saying",
    value: "The developer could not understand what I'm saying.",
  },
  {
    label: "Found others",
    description: "I have found other developers to make this.",
    value: "I have found other developers to make this.",
  },
  {
    label: "Other",
    description: "State your reason",
    value: "Other",
  },
];

export const ids = {
  commissions_channel: "1392457534371004467",
  commissions_category: "816649279062016001",
  commissions_manager_role: "815158713429131265",
  pending_role: "815158715871133736",
  developer_role: "815158711415865344",
  archive_channel: "1392123092981125273",
};

export const plugin_menu = new StringSelectMenuBuilder()
  .setCustomId("plugins_menu")
  .setPlaceholder("Select plugins here!")
  .addOptions(options)
  .setMinValues(1);

export const plugin_clear_btn = new ButtonBuilder()
  .setCustomId("plugins_clear")
  .setLabel("Clear Roles")
  .setStyle(ButtonStyle.Secondary);

export const plugin_row_menu = new ActionRowBuilder().addComponents(
  plugin_menu
);
export const plugin_row_btn = new ActionRowBuilder().addComponents(
  plugin_clear_btn
);

const ticket_menu = new StringSelectMenuBuilder()
  .setCustomId("tickets_menu")
  .setPlaceholder("Select which service you want us to provide")
  .addOptions(options); // TODO

const ticket_clear_btn = new ButtonBuilder()
  .setCustomId("plugins_clear")
  .setLabel("Clear Roles")
  .setStyle(ButtonStyle.Secondary); // TODO

export const ticket_row_menu = new ActionRowBuilder().addComponents(
  ticket_menu
);
export const ticket_row_btn = new ActionRowBuilder().addComponents(
  ticket_clear_btn
);
