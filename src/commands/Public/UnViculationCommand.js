import { ApplicationCommandOptionType } from 'discord.js';
import Command from '../../structures/Command.js';
import AccountsSchema from '../../models/Accounts.js';

export default class extends Command {
	constructor(client) {
		super(client, {
			name: 'desvincular',
			description: 'Desvincule a conta cadastrada.',
		});
	}

	async run(interaction) {
		const userId = interaction.user.id;
		const nickname = interaction.user.username;

		const registeredData = await AccountsSchema.findOneAndDelete({ userId });
		if (!registeredData) {
			return interaction.reply({
				content: `\`❌\` Você não tem registro, use \`/vincular\` para efetuar seu registro em nosso servidor.`,
				ephemeral: true,
			});
		}

		const member = await interaction.guild.members.fetch(userId);

		const roleIDToRemove = "";
		const ultraRoleID = "";
		const vipRoleID = "";

		const rolesToRemove = [];

		if (member.roles.cache.has(roleIDToRemove)) {
			rolesToRemove.push(roleIDToRemove);
		}

		if (member.roles.cache.has(ultraRoleID)) {
			rolesToRemove.push(ultraRoleID);
		}

		if (member.roles.cache.has(vipRoleID)) {
			rolesToRemove.push(vipRoleID);
		}

		for (const roleID of rolesToRemove) {
			const roleToRemove = interaction.guild.roles.cache.get(roleID);
			if (roleToRemove) {
				member.roles.remove(roleToRemove);
			}
		}

		const newNickname = nickname;
		await member.setNickname(newNickname);

		interaction.reply({
			content: `\`✅\` Sua conta foi desvinculada com sucesso.`,
			ephemeral: true,
		});
	}
}