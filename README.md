# MushMC Verificação

Este é o repositório do bot Discord MushMC Verificação que inclui um sistema de banco de dados MongoDB e utiliza a API do Mush.

## Comandos

O bot possui os seguintes comandos:

- `/vincular`: Para vincular sua conta ao discord, caso tenha tags como Ultra ou VIP será adicionada a sua conta.
- `/desvincular`: Para desvincular sua conta ao discord, caso tenha tags como Ultra ou VIP será removida da sua conta.
- `/remover admin`: Para desvincular a conta de um usuário no discord, caso tenha tags como Ultra ou VIP será removidas da conta.

## Instalação e Uso

1. Clone este repositório para o seu ambiente local.
2. Execute `npm install` para instalar as dependências necessárias.
3. Antes de iniciar o bot, siga as instruções abaixo para configurar algumas variáveis e IDs.

### Configurações Iniciais
Antes de executar o bot, você precisará configurar algumas variáveis no código.

## Arquivo .env
```
TOKEN=AQUI FICARÁ O TOKEN DO SEU BOT, LEMBRE-SE DE ATIVAR OS PRESENTS
MONGO_URL=AQUI FICARÁ O LINK DA CONEXÃO PARA MONGODB
GUILD=ID DO SEU SERVIDOR DISCORD
COLOR=2f3136
```
Não esqueça de mudar o nome envExample para .env

#### ReadyEvents.js

No arquivo `src/events/ReadyEvents.js`, na linha 13, adicione o ID do canal de logs entre as aspas vazias.

#### UnVinculationCommand.js

No arquivo `src/commands/UnVinculationCommand.js`, nas linhas 27, 28 e 29, adicione os IDs dos cargos de verificado, ultra e vip entre as aspas vazias.

#### VinculationCommand.js

No arquivo `src/commands/VinculationCommand.js`, das linhas 63 a 76, atualize os IDs que você adicionou no comando `UnVinculationCommand` entre as aspas.

#### UnViculationAdminCommand.js

No arquivo `src/commands/UnViculationAdminCommand.js`, adicione o ID do cargo de verificado na linha 57 entre as aspas vazias.

### Iniciando o Bot

Após configurar as variáveis necessárias, você pode iniciar o bot executando o seguinte comando:

```
node .
```

O bot agora está online e pronto para ser utilizado no seu servidor Discord.

## Contribuições

Se você deseja contribuir com melhorias ou correções para este bot, fique à vontade para fazer um fork deste repositório e enviar um pull request.

---
