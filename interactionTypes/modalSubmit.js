import { ChannelType, MessageFlags, PermissionsBitField } from "discord.js";
import { categories, channels, ids, roles } from "../util/botOptions.js";
import {
  createCommissionEmbed,
  createFirstCommEmbeds,
} from "../embeds/commission_embeds.js";
import {
  createQuoteEmbed,
  createQuotingEmbed,
  createThreadEmbed,
} from "../embeds/quote_embeds.js";
import { storeCommission } from "../data/jsonHelper.js";

export async function executeModalSubmit(interaction, guild, member) {
  if (interaction.customId === "commission-form") {
    const budget = interaction.fields.getTextInputValue("budget");
    const time_frame = interaction.fields.getTextInputValue("time_frame");
    const description = interaction.fields.getTextInputValue("description");

    // create channel
    const commissionsCategory = categories.commissions;
    const commissionsChannel = channels.commissions;

    const cmManager = roles.commission_manager;

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
          id: roles.commission_manager.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
          ],
        },
        {
          id: roles.developer.id,
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

    const pending = roles.pending;

    if (!member.roles.cache.has(pending.id)) {
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
          .then(async (thread) => {
            thread.send(
              createThreadEmbed(
                interaction.user,
                budget,
                time_frame,
                description
              )
            );

            await storeCommission(message.id, thread.id);
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
