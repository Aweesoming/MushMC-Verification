export default class {
	constructor(client, data) {
		this.client = client;

		this.name = data.name;
		this.description = data.description;
		this.options = data.options;
		this.type = data.type
	}
}