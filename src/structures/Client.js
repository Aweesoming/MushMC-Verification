import { Client, GatewayIntentBits } from 'discord.js';

import Commands from '../handlers/Commands.js';
import Events from '../handlers/Events.js';
import Connection from "../models/Connect.js";

export default class Bot extends Client {
	constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildVoiceStates,
			],
		});

		this.commands = [];
		this.database = Connection;
	}

	start() {

		super.on('error', err => {
			console.log(err)
		})

		Events(this);
		Commands(this);

		process.on('unhandledRejection', async (reason) => {
			console.log(reason);
		});

		process.on('uncaughtException', async (err) => {
			console.log(err)
		});

		super.login(process.env.TOKEN);
	}
}