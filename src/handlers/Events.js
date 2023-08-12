import { readdirSync } from 'fs';

export default async (client, path = 'src/events') => {
	const eventFiles = readdirSync(path);

	for (const eventFile of eventFiles) {
		if (!eventFile.endsWith('.js')) continue;

		const eventClass = (await import(`../events/${eventFile}`)).default;
		const event = new eventClass(client);

		client.on(event.name, (...args) => event.run(...args));

	}
};
