const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.MESSAGE, Partials.CHANNEL, Partials.GUILD_MEMBER, Partials.REACTION, Partials.GUILD_SCHEDULED_EVENT, Partials.USER, Partials.THREAD_MEMBER] });
const config = require("./src/config.js");
const { readdirSync } = require("fs");
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

let token = config.token;

client.commands = new Collection();
client.slashcommands = new Collection();
client.commandaliases = new Collection();

const rest = new REST({ version: '10' }).setToken(token);

const log = x => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${x}`); };

const roleplays = [];
readdirSync('./src/commands/roleplay/').forEach(async file => {
  const roleplay = await require(`./src/commands/roleplay/${file}`);
  if (roleplay) {
    client.commands.set(roleplay.name, roleplay);
    if (roleplay.aliases && Array.isArray(roleplay.aliases)) {
      roleplay.aliases.forEach(alias => {
        client.commandaliases.set(alias, roleplay.name);
      });
    }
  }
});

// Manejador de comandos slash
const slashcommands = [];
readdirSync('./src/commands/slash').forEach(async file => {
  const command = await require(`./src/commands/slash/${file}`);
  slashcommands.push(command.data.toJSON());
  client.slashcommands.set(command.data.name, command);
});

client.once("ready", async () => {
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: slashcommands },
    );
  } catch (error) {
    console.error(error);
  }
  log(`${client.user.username} Online!`);
});

// Manejador de eventos
readdirSync('./src/events').forEach(async file => {
  const event = await require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
});

// Listeners de Node.js
process.on("unhandledRejection", e => {
  console.log(e);
});
process.on("uncaughtException", e => {
  console.log(e);
});
process.on("uncaughtExceptionMonitor", e => {
  console.log(e);
});

client.login(token);
