import Event from '../structures/Event.js';
import chalk from 'chalk';

export default class extends Event {
	constructor(client) {
		super(client, {
			name: 'ready'
		});
	}

	async run() {

		const channelId = "";
		const channel = this.client.channels.cache.get(channelId);
		const guild = this.client.guilds.cache.get(process.env.GUILD);

		if (channel) {
			this.client.on('guildMemberAdd', (member) => {
				const message = `- **Novo membro**: ${member.user.username} (${member.id})\n- **Total de membros**: ${member.guild.memberCount}`;
				channel.send(message);
			});

			guild.commands.set(this.client.commands);

			console.log(
				`[${chalk.bold.green('STARTED')}] - ${chalk.bold(this.client.user.username)} I WAS CONNECTED ON ${chalk.bold(guild.name)}`
			);

		}
	}
}