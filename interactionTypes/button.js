import { plugin_clear } from "../buttons/pluginsClear.js";
import { refresh_license_func } from "../buttons/refreshLicense.js";
import { comm_create } from "../buttons/commCreate.js";
import { cancel_func } from "../buttons/cancel.js";
import { yes_func } from "../buttons/yes.js";
import { no_func } from "../buttons/no.js";
import { accept } from "../buttons/accept.js";
import { counter } from "../buttons/counter.js";
import { counter_accept } from "../buttons/caccept.js";
import { revoke_license_func } from "../buttons/revokeLicense.js";
import { quote_func } from "../buttons/quote.js";

export async function executeButton(interaction, guild, member) {
  for (const opt of btn_opt) {
    if (opt.starts) {
      if (interaction.customId.startsWith(opt.id))
        opt.func(interaction, guild, member);
    } else {
      if (interaction.customId === opt.id) opt.func(interaction, guild, member);
    }
  }
}

const btn_opt = [
  {
    id: "plugins_clear",
    starts: false,
    func: plugin_clear,
  },
  {
    id: "refresh_license",
    starts: true,
    func: refresh_license_func,
  },
  {
    id: "revoke_license",
    starts: true,
    func: revoke_license_func,
  },
  {
    id: "comm_create",
    starts: false,
    func: comm_create,
  },
  {
    id: "quote",
    starts: true,
    func: quote_func,
  },
  {
    id: "cancel",
    starts: false,
    func: cancel_func,
  },
  {
    id: "yes",
    starts: false,
    func: yes_func,
  },
  {
    id: "no",
    starts: false,
    func: no_func,
  },
  {
    id: "accept",
    starts: true,
    func: accept,
  },
  {
    id: "counter",
    starts: true,
    func: counter,
  },
  {
    id: "caccept",
    starts: true,
    func: counter_accept,
  },
];
