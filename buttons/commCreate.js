import {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

const modal = new ModalBuilder()
  .setCustomId("commission-form")
  .setTitle("Order")
  .addComponents([
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("budget")
        .setLabel("Budget")
        .setStyle(TextInputStyle.Short)
        .setMinLength(2)
        .setMaxLength(10)
        .setPlaceholder("Example: $10")
        .setRequired(true)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("time_frame")
        .setLabel("Timeframe")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(
          "Example: In 5 days | In a week | Tomorrow (Rush - Fee)"
        )
        .setRequired(true)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("description")
        .setLabel("Description")
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder(
          "Describe your project. You may include more after creating the ticket."
        )
        .setMaxLength(1000)
        .setRequired(true)
    ),
  ]);

export async function comm_create(interaction, guild, member) {
  // TODO check if commissions are opened (disable order now button)
  await interaction.showModal(modal);
}
