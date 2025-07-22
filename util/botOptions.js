// options on
export const options = [
  {
    label: "NearChat",
    description: "The blablabla",
    value: "1389215670910193828",
    default: false,
  },
];

// options for reasons on cancelling
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

// ids for specific channels and categories
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
