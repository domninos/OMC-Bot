import { ChannelType, MessageFlags, PermissionsBitField } from "discord.js";
import { ids } from "../util/botOptions.js";
import {
  createCommissionEmbed,
  createFirstCommEmbeds,
} from "../embeds/commission_embeds.js";
import {
  createQuoteEmbed,
  createQuotingEmbed,
  createThreadEmbed,
} from "../embeds/quote_embeds.js";

export async function executeModalSubmit(interaction, guild, member) {
  if (interaction.customId === "commission-form") {
    const commissionsChannel = await guild.channels.fetch(
      ids.commissions_channel
    );

    const cmManager = await guild.roles.fetch(ids.commissions_manager_role);
    const budget = interaction.fields.getTextInputValue("budget");
    const time_frame = interaction.fields.getTextInputValue("time_frame");
    const description = interaction.fields.getTextInputValue("description");

    // create channel
    const commissionsCategory = await guild.channels.fetch(
      ids.commissions_category
    );

    // is the right cateogry
    const commissionChannel = await guild.channels.create({
      name: `commissions-${member.user.tag}`,
      type: ChannelType.GuildText,
      parent: commissionsCategory,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: member.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
          ],
        },
        {
          id: ids.commissions_manager_role,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
          ],
        },
        {
          id: ids.developer_role,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
          ],
        },
      ],
    });

    await interaction.reply({
      content: `Successfully submitted an order! Please be patient. Your order ticket is ${commissionChannel}`,
      flags: MessageFlags.Ephemeral,
    });

    if (!member.roles.cache.has(ids.pending_role)) {
      const pending = await guild.roles.fetch(ids.pending_role);
      await member.roles.add(pending);
    }

    // create commission thread
    await commissionsChannel
      .send(
        createCommissionEmbed(
          cmManager,
          interaction.user,
          budget,
          time_frame,
          description,
          commissionChannel.id
        )
      )
      .then(async (message) => {
        message
          .startThread({
            name: "Commission Thread",
          })
          .then((thread) => {
            thread.send(
              createThreadEmbed(
                interaction.user,
                budget,
                time_frame,
                description
              )
            );
          });
      });

    commissionChannel
      .send({
        content: `${member}`,
      })
      .then((msg) => {
        setTimeout(() => {
          msg.delete().catch(console.error);
        }, 3000); // 3 seconds
      });

    await commissionChannel.send(
      createFirstCommEmbeds(budget, time_frame, description)
    );
  } else if (interaction.customId.startsWith("quote")) {
    const [, , commission_channel] = interaction.customId.split("_");

    const commissionChannel = await guild.channels.fetch(commission_channel);
    const quote = interaction.fields.getTextInputValue("quoting");

    commissionChannel
      .send({
        content: `${member}`,
      })
      .then((msg) => {
        setTimeout(() => {
          msg.delete().catch(console.error);
        }, 3000);
      });

    await interaction.reply(createQuotingEmbed(quote));

    await commissionChannel.send(createQuoteEmbed(quote, member));
  }
}
