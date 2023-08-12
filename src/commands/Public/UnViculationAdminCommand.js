import { CommandInteraction, ApplicationCommandOptionType } from 'discord.js';
import Command from '../../structures/Command.js';
import AccountsSchema from "../../models/Accounts.js";

export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'remover',
            description: 'Desvincule a conta cadastrada.',
            options: [
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: 'admin',
                    description: 'Desvincule a conta de um usuário mencionado.',
                    options: [
                        {
                            name: 'conta',
                            description: 'Conta do usuário a ser desvinculada.',
                            type: ApplicationCommandOptionType.User,
                            required: true,
                        },
                    ],
                },
            ],
        });
    }

    async run(interaction) {
        const subCommand = interaction.options.getSubcommand();
        if (subCommand === 'admin') {
            const contaMencionada = interaction.options.getUser('conta');
            if (!contaMencionada) {
                return interaction.reply({
                    content: `\`❌\` Você deve mencionar a conta do usuário a ser desvinculado.`,
                    ephemeral: true,
                });
            }

            const memberId = contaMencionada.id;
            await removeRolesAndNickname(interaction, memberId);

            interaction.reply({
                content: `\`✅\` A conta de ${contaMencionada.username} foi desvinculada com sucesso.`,
                ephemeral: true,
            });
        }
    }
}

async function removeRolesAndNickname(interaction, userId) {
    const registeredData = await AccountsSchema.findOne({ userId });
    if (!registeredData) {
        return;
    }

    const member = await interaction.guild.members.fetch(userId);
    const roleIDToRemove = "";
    const roleToRemove = interaction.guild.roles.cache.get(roleIDToRemove);
    if (roleToRemove) {
        member.roles.remove(roleToRemove);
    }

    const newNickname = member.user.username;
    await member.setNickname(newNickname);

    await AccountsSchema.findOneAndRemove({ userId })
}