import { TextDisplayBuilder } from "discord.js";

export async function no_func(interaction, guild, member) {
  await interaction.update({
    content: "",
    components: [
      new TextDisplayBuilder().setContent(
        "Alright. Let's go back to business!"
      ),
    ],
  });
}
