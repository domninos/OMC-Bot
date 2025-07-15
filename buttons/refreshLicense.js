import { createLicenseEmbed } from "../embeds/other_embeds.js";
import { get_all } from "../loaders/api-loader.js";

export async function refresh_license_func(interaction, guild, member) {
  const [, , plugin, key] = interaction.customId.split("_");

  await refresh_license(interaction, plugin, key);
}

export async function refresh_license(interaction, plugin, key) {
  const license = await get_all(plugin, key);

  const licenseData = createLicenseEmbed(plugin, license[0], interaction.user);

  if (interaction.replied || interaction.deferred) {
    await interaction.editReply(licenseData);
  } else {
    await interaction.update(licenseData);
  }

  console.log(
    `User: ${interaction.user.displayName} (${interaction.user.tag}) got license information of ${license[0].license} from ${license[0].network_id}`
  );
}
