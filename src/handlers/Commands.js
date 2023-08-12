import { readdirSync } from 'fs';

export default async (client, path = 'src/commands') => {
	readdirSync(path).forEach(async (dir) => {
		const commandsData = readdirSync(`${path}/${dir}/`).filter(file => file.endsWith('.js'))

		for (let file of commandsData) {
			const commandClass = (await import(`../commands/${dir}/${file}`)).default;
			const command = new commandClass(client);

			client.commands.push(command);
		}
	})
};