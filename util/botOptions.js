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
  archive_category: "1392123092981125273",
};

// STORE CHANNELS HERE
export const channels = {};

export function loadChannels(guild) {
  channels.commissions = guild.channels.cache.get(ids.commissions_channel);
}

// STORE CATEGORIES HERE
export const categories = {};

export function loadCategories(guild) {
  categories.commissions = guild.channels.cache.get(ids.commissions_category);
  categories.archive = guild.channels.cache.get(ids.archive_category);
}

// STORE ROLES HERE
export const roles = {};

export function loadRoles(guild) {
  roles.nearchat = guild.roles.cache.find((r) => r.name === "NearChat");
  roles.pending = guild.roles.cache.find((r) => r.name === "Pending");
  roles.customer = guild.roles.cache.find((r) => r.name === "Customer");
  roles.developer = guild.roles.cache.find((r) => r.name === "Developer");
  roles.commission_manager = guild.roles.cache.find(
    (r) => r.name === "Commission Manager"
  );

  // LOAD OTHER ROLES HERE
}

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
