import { ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField, Collection } from 'discord.js';
import Event from '../structures/Event.js';

export default class extends Event {
	constructor(client) {
		super(client, {
			name: 'interactionCreate',
		});
	}

	async run(interaction) {
		if (interaction.isCommand()) {
			const command = this.client.commands.find((cmd) => cmd.name === interaction.commandName);

			if (!command) return;

			command.run(interaction);
		}

	}
}