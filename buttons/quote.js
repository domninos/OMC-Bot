import { ModalBuilder, ActionRowBuilder, TextInputStyle } from "discord.js";

export async function quote_func(interaction, guild, member) {
  const [, commission_channel] = interaction.customId.split("_");

  const quoteModal = new ModalBuilder()
    .setCustomId(`quote_form_${commission_channel}`)
    .setTitle("Send a quote")
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("quoting")
          .setLabel("Preferred Budget")
          .setStyle(TextInputStyle.Short)
          .setMinLength(2)
          .setPlaceholder("Example: $25")
          .setRequired(true)
      )
    );

  await interaction.showModal(quoteModal);
}
