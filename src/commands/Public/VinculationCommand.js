import { ApplicationCommandOptionType } from 'discord.js';
import fetch from 'node-fetch';

import Command from '../../structures/Command.js';
import AccountsSchema from '../../models/Accounts.js';

export default class extends Command {
	constructor(client) {
		super(client, {
			name: 'vincular',
			description: 'Registre o nickname do Minecraft.',
			options: [
				{
					name: 'nickname',
					description: 'O nickname do Minecraft para registrar.',
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		});
	}

	async run(interaction) {
		const nickname = interaction.options.getString('nickname');
		const userId = interaction.user.id;

		const existingData = await AccountsSchema.findOne({ nick: nickname });
		if (existingData) {
			return interaction.reply({
				content: `\`❌\` O nickname **${nickname}** já está registrado.`,
				ephemeral: true,
			});
		}

		const validateNickname = (await fetch(
			`https://api.mojang.com/users/profiles/minecraft/${nickname}`
		)).status;

		const response = await fetch(`https://mush.com.br/api/player/${nickname}`);
		const data = await response.json();

		if (!data.success || !data.response.rank) {
			return interaction.reply({
				content: `\`❌\` O nickname **${nickname}** não foi encontrado no servidor.`,
				ephemeral: true,
			});
		}

		const { title, color } = data.response.rank;

		const member = await interaction.guild.members.fetch(userId);

		const newNickname = nickname;

		await member.setNickname(newNickname);

		await AccountsSchema.create({
			nick: nickname,
			isPirate: validateNickname !== 200,
			userId: userId,
		});

		if (title === 'Ultra') {
			const roleIDToAssign = "";
			const roleToAssign = interaction.guild.roles.cache.get(roleIDToAssign);
			if (roleToAssign) {
				member.roles.add(roleToAssign);
			}
		} else if (title === 'VIP') {
			const roleIDToAssign = "";
			const roleToAssign = interaction.guild.roles.cache.get(roleIDToAssign);
			if (roleToAssign) {
				member.roles.add(roleToAssign);
			}
		} else {
			const roleIDToAssign = "";
			const roleToAssign = interaction.guild.roles.cache.get(roleIDToAssign);
			if (roleToAssign) {
				member.roles.add(roleToAssign);
			}
		}

		interaction.reply({
			content: `\`✅\` Você foi registrado com sucesso, seu apelido foi alterado para **${nickname}**.`,
			ephemeral: true,
		});
	}
}