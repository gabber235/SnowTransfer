declare module 'snowtransfer' {
    /**
     * Create a new Rest Client
     * @property {ChannelMethods} channel - Methods for channels
     * @property {UserMethods} user - Methods for users
     * @property {EmojiMethods} emoji - Methods for emojis
     * @property {WebhookMethods} webhook - Methods for webhooks
     * @property {GuildMethods} guild - Methods for guilds
     * @property {InviteMethods} invite - Methods for invites
     * @property {VoiceMethods} voice - Methods for voice
     * @property {BotMethods} bot - Methods for bot related things (e.g. Gateway endpoint)
     * @property {AuditLogMethods} auditLog - Methods for accessing the audit log of a guild
     * @property {Raven|null} [raven] - optional [sentry raven](https://docs.sentry.io/clients/node/config/) instance used for catching errors
     * @param {String} token - Discord Bot token to use
     * @param {Object} [options] - options
     * @param {String} [options.sentryDsn] - Dsn to use for the sentry integration, disables the integration when empty
     * @param {Object} [options.sentryOptions] - Options to use for the sentry client, check the [sentry docs](https://docs.sentry.io/clients/node/config/) for more infos
     * @param {String} [options.baseHost=https://discordapp.com] - Base host to use for the requests, may be replaced when using a local hosted proxy
     * @return {SnowTransfer} - created instance
     * @constructor
     */
    export class SnowTransfer {
        constructor(token: string, options?: {
            sentryDsn?: string;
            sentryOptions?: any;
            baseHost?: string;
        });
        /**
         * Methods for channels
        */
        channel: ChannelMethods;
        /**
         * Methods for users
        */
        user: UserMethods;
        /**
         * Methods for emojis
        */
        emoji: EmojiMethods;
        /**
         * Methods for webhooks
        */
        webhook: WebhookMethods;
        /**
         * Methods for guilds
        */
        guild: GuildMethods;
        /**
         * Methods for invites
        */
        invite: InviteMethods;
        /**
         * Methods for voice
        */
        voice: VoiceMethods;
        /**
         * Methods for bot related things (e.g. Gateway endpoint)
        */
        bot: BotMethods;
        /**
         * Methods for accessing the audit log of a guild
        */
        auditLog: AuditLogMethods;
        /**
         * optional [sentry raven](https://docs.sentry.io/clients/node/config/) instance used for catching errors
        */
        raven?: Any | null;
    }

    /**
 * Create a new Channel Method handler
 *
 * Usually SnowTransfer creates a method handler for you, this is here for completion
 *
 * You can access the methods listed via `client.channel.method`, where `client` is an initialized SnowTransfer instance
 * @param {Any} requestHandler - request handler that calls the rest api
 * @constructor
 */
export class ChannelMethods {
    constructor(requestHandler: Any);
    /**
     * Get a channel via Id
     * @param {String} channelId - Id of the channel
     * @returns {Promise.<Channel>} - [discord channel](https://discordapp.com/developers/docs/resources/channel#channel-object) object
     * @example
     * let client = new SnowTransfer('TOKEN')
     * let channel = await client.channel.getChannel('channel id')
     */
    getChannel(channelId: string): Promise<Channel>;
    /**
     * Update a channel
     * @param {String} channelId - Id of the channel
     * @param {Object} data - Data to send
     * @param {String} [data.name] - New name of the channel
     * @param {Number} [data.position] - New position of the channel
     * @param {String} [data.topic] - New topic of the channel
     * @param {Boolean} [data.nsfw] - Update nsfw type of the channel
     * @param {Number} [data.bitrate] - Update bitrate of the channel
     * @param {Number} [data.user_limit] - Update the limit of users that are allowed to be in a channel
     * @param {Array} [data.permission_overwrites] - Update the permission overwrites
     * @param {String} [data.parent_id] - Id of the parent category of the channel
     * @returns {Promise.<Channel>} [discord channel](https://discordapp.com/developers/docs/resources/channel#channel-object) object
     *
     * | Permissions needed | Condition |
         |--------------------|----------:|
         | MANAGE_CHANNELS    |    always |
     * @example
     * // This example updates a channel with the passed id to use "New Name" as it's name and "Look at this cool topic" as the topic
     * let client = new SnowTransfer('TOKEN')
     * let updateData = {
     *   name: 'New Name',
     *   topic: 'Look at this cool topic'
     * }
     * client.channel.updateChannel('channel id', updateData)
     */
    updateChannel(channelId: string, data: {
        name?: string;
        position?: number;
        topic?: string;
        nsfw?: boolean;
        bitrate?: number;
        user_limit?: number;
        permission_overwrites?: any[];
        parent_id?: string;
    }): Promise<Channel>;
    /**
     * Delete a channel via Id
     *
     * This either **deletes** a Guild Channel or **closes** a Direct Message Channel
     *
     * **Be careful with deleting Guild Channels as this can not be undone!**
     *
     * When deleting a category, this does **not** delete the child channels of a category. They will just have their `parent_id` removed.
     * @param {String} channelId - Id of the channel
     * @returns {Promise.<Channel>} [discord channel](https://discordapp.com/developers/docs/resources/channel#channel-object) object
     *
     * | Permissions needed |                        Condition |
         |--------------------|---------------------------------:|
         | MANAGE_CHANNELS    |    When deleting a Guild Channel |
     */
    deleteChannel(channelId: string): Promise<Channel>;
    /**
     * Get a list of messages from a channel
     * @param {String} channelId - Id of the channel
     * @param {Object} [options]
     * @param {String} [options.around] - Get's messages around the Id of the passed snowflake
     * @param {String} [options.before] - Get's messages before the Id of the passed snowflake
     * @param {String} [options.after] - Get's messages after the Id of the passed snowflake
     * @param {Number} [options.limit=50] - Number of messages to get, values between 1-100 allowed
     * @returns {Promise.<Message[]>} Array of [discord message](https://discordapp.com/developers/docs/resources/channel#message-object) objects
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | READ_MESSAGES      |    always |
    
     * @example
     * // Fetch the last 20 messages from a channel
     * let client = new SnowTransfer('TOKEN')
     * let options = {
     *   limit: 20
     * }
     * let messages = await client.channel.getChannelMessages('channel id', options);
     */
    getChannelMessages(channelId: string, options?: {
        around?: string;
        before?: string;
        after?: string;
        limit?: number;
    }): Promise<Message[]>;
    /**
     * Get a single message via Id
     * @param {String} channelId - Id of the channel
     * @param {String} messageId - Id of the message
     * @returns {Promise.<Message>} [discord message](https://discordapp.com/developers/docs/resources/channel#message-object) object
     *
     * | Permissions needed   | condition |
         |----------------------|----------:|
         | READ_MESSAGE_HISTORY |    always |
    
     * @example
     * // Get a single message from a channel via id
     * let client = new SnowTransfer('TOKEN')
     * let message = await client.channel.getChannelMessage('channel id', 'message id')
     */
    getChannelMessage(channelId: string, messageId: string): Promise<Message>;
    /**
     * Creates a new Message within a channel
     *
     * **Make sure to use a filename with a proper extension (e.g. png, jpeg, etc.) when you want to upload files**
     * @param {String} channelId - Id of the Channel to sent a message to
     * @param {Object|String} data - Data to send, if data is a string it will be used as the content of the message,
     * if data is not a string you should take a look at the properties below to know what you may send
     * @param {?String} [data.content] - Content of the message
     * @param {?Boolean} [data.tts=false] - if this message is text-to-speech
     * @param {Object} [data.embed] - [Embed](https://discordapp.com/developers/docs/resources/channel#embed-object) to send
     * @param {Object} [data.file] - File, that should be uploaded
     * @param {String} [data.file.name] - Name of the file
     * @param {File} [data.file.file] - Buffer with file contents
     * @returns {Promise.<Message>} [discord message](https://discordapp.com/developers/docs/resources/channel#message-object) object
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | SEND_MESSAGES      |    always |
     *
     * @example
     * // Make a bot say "hi" within a channel
     * // createMessage sends the passed data as content, when you give it a string
     * let client = new SnowTransfer('TOKEN')
     * client.channel.createMessage('channel id', 'hi')
     *
     * @example
     * // Send a rich embed object
     * let client = new SnowTransfer('TOKEN')
     * let embedData = {
     *   title: 'This is a nice embed',
     *   description: 'But winter is so cold',
     *   fields: [
     *       {name: 'Brr', value: 'Insert snowflake emoji here'}
     *     ]
     * }
     * client.channel.createMessage('channel id', {embed: embedData})
     *
     * @example
     * // Send a file with a comment
     * let client = new SnowTransfer('TOKEN')
     * // fileData will be a buffer with the data of the png image.
     * let fileData = fs.readFileSync('nice_picture.png') // You should probably use fs.readFile, since it's asynchronous, synchronous methods may lag your bot.
     * client.channel.createMessage('channel id', {content: 'This is a nice picture', file: {name: 'Optional Filename.png', file: fileData}})
     */
    createMessage(channelId: string, data: {
        content?: string;
        tts?: boolean;
        embed?: any;
        file?: {
            name?: string;
            file?: File;
        };
    }): Promise<Message>;
    /**
     * Edit a message sent by the current user
     * @param {String} channelId - Id of the channel
     * @param {String} messageId - Id of the message
     * @param {Object|String} data - Data to send
     * @param {String} [data.content] - Content of the message
     * @param {Object} [data.embed] - Embed to send
     * @returns {Promise.<Message>} [discord message](https://discordapp.com/developers/docs/resources/channel#message-object) object
     * @example
     * // Simple ping response
     * let client = new SnowTransfer('TOKEN')
     * let time = Date.now()
     * let message = await client.channel.createMessage('channel id', 'pong')
     * client.channel.editMessage('channel id', message.id, `pong ${Date.now() - time}ms`)
     */
    editMessage(channelId: string, messageId: string, data: {
        content?: string;
        embed?: any;
    }): Promise<Message>;
    /**
     * Delete a message
     * @param {String} channelId - Id of the channel
     * @param {String} messageId - Id of the message
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed |                                 condition|
         |--------------------|---------------------------------------------:|
         | MANAGE_MESSAGES    | When the bot isn't the author of the message |
     * @example
     * // Delete a message
     * let client = new SnowTransfer('TOKEN')
     * client.channel.deleteMessage('channel id', 'message id')
     */
    deleteMessage(channelId: string, messageId: string): Promise<void>;
    /**
     * Bulk delete messages, messages may not be older than 2 weeks
     * @param {String} channelId - Id of the channel
     * @param {String[]} messages - array of message ids to delete
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_MESSAGES    |    always |
     */
    bulkDeleteMessages(channelId: string, messages: String[]): Promise<void>;
    /**
     * Adds a reaction to a message
     * @param {String} channelId - Id of the channel
     * @param {String} messageId - Id of the message
     * @param {String} emoji - uri encoded reaction emoji to add,
     * you may either use a discord emoji in the format `:emoji_name:emoji_id` or a unicode emoji,
     * which can be found [here](http://www.unicode.org/emoji/charts/full-emoji-list.html)
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed   | Condition                                           |
         |----------------------|----------------------------------------------------:|
         | READ_MESSAGE_HISTORY | always                                             |
         | ADD_REACTIONS        | When no other user has reacted with the emoji used |
     * @example
     * // This example uses a discord emoji
     * let client = new SnowTransfer('TOKEN');
     * client.channel.createReaction('channel Id', 'message Id', encodeURIComponent(':awooo:322522663304036352'));
     * @example
     * // using a utf-8 emoji
     * let client = new SnowTransfer('TOKEN');
     * client.channel.createReaction('channel Id', 'message Id', encodeURIComponent('😀'));
     */
    createReaction(channelId: string, messageId: string, emoji: string): Promise<void>;
    /**
     * Delete a reaction added by the current user from a message
     * @param {String} channelId - Id of the channel
     * @param {String} messageId - Id of the message
     * @param {String} emoji - reaction emoji
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     * @example
     * // This example uses a discord emoji
     * let client = new SnowTransfer('TOKEN');
     * client.channel.deleteReactionSelf('channel Id', 'message Id', encodeURIComponent(':awooo:322522663304036352'));
     * @example
     * // using a utf-8 emoji
     * let client = new SnowTransfer('TOKEN');
     * client.channel.deleteReactionSelf('channel Id', 'message Id', encodeURIComponent('😀'));
     */
    deleteReactionSelf(channelId: string, messageId: string, emoji: string): Promise<void>;
    /**
     * Delete a reaction from a message
     * @param {String} channelId - Id of the channel
     * @param {String} messageId - Id of the message
     * @param {String} emoji - reaction emoji
     * @param {String} userId - Id of the user
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permission        | Condition    |
         |-----------------    |-------:   |
         | MANAGE_MESSAGES    | always    |
     * @example
     * // This example uses a discord emoji
     * let client = new SnowTransfer('TOKEN');
     * client.channel.deleteReaction('channel Id', 'message Id', encodeURIComponent(':awooo:322522663304036352'), 'user Id');
     * @example
     * // using a utf-8 emoji
     * let client = new SnowTransfer('TOKEN');
     * client.channel.deleteReaction('channel Id', 'message Id', encodeURIComponent('😀'), 'user Id');
     */
    deleteReaction(channelId: string, messageId: string, emoji: string, userId: string): Promise<void>;
    /**
     * Get a list of users that reacted with a certain emoji on a certain message
     * @param {String} channelId - Id of the channel
     * @param {String} messageId - Id of the message
     * @param {String} emoji - reaction emoji
     * @returns {Promise.<User[]>} Array of [user objects](https://discordapp.com/developers/docs/resources/user#user-object)
     * @example
     * // This example uses a discord emoji
     * let client = new SnowTransfer('TOKEN');
     * let reactions = await client.channel.getReactions('channel Id', 'message Id', encodeURIComponent(':awooo:322522663304036352'));
     */
    getReactions(channelId: string, messageId: string, emoji: string): Promise<User[]>;
    /**
     * Delete all reactions from a message
     * @param {String} channelId - Id of the channel
     * @param {String} messageId - Id of the message
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_MESSAGES    |    always |
     */
    deleteAllReactions(channelId: string, messageId: string): Promise<void>;
    /**
     * Modify the permission overwrites of a channel
     * @param {String} channelId - Id of the channel
     * @param {String} permissionId - Id of the permission overwrite
     * @param {PermissionOverwrite} data - modified [permission overwrite](https://discordapp.com/developers/docs/resources/channel#edit-channel-permissions-json-params) object
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_ROLES       |    always |
     */
    editChannelPermission(channelId: string, permissionId: string, data: PermissionOverwrite): Promise<void>;
    /**
     * Delete a permission overwrite from a channel
     * @param {String} channelId - Id of the channel
     * @param {String} permissionId - Id of the permission overwrite
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_ROLES       |    always |
     */
    deleteChannelPermission(channelId: string, permissionId: string): Promise<void>;
    /**
     * Get a list of invites for a channel
     * @param {String} channelId - Id of the channel
     * @returns {Promise.<Invite[]>} Array of [invite objects](https://discordapp.com/developers/docs/resources/invite#invite-object) (with metadata)
     *
     *| Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_CHANNELS    |    always |
     */
    getChannelInvites(channelId: string): Promise<Invite[]>;
    /**
     * Create an invite for a channel
     *
     * If no data argument is passed, the invite will be created with the defaults listed below
     * @param {String} channelId - Id of the channel
     * @param {Object} [data={}] - invite data (optional)
     * @param {Number} [data.max_age=86400] - max age of the invite in seconds
     * @param {Number} [data.max_uses=0] - max uses of the invite
     * @param {Boolean} [data.temporary=false] - if this invite only allows temporary membership
     * @param {Boolean} [data.unique=false] - does not try to re-use similar invites when true (useful for creating many one-time invites)
     * @returns {Promise.<Invite>} [Invite object](https://discordapp.com/developers/docs/resources/invite#invite-object) (with metadata)
     *
     * | Permissions needed    | condition |
         |-----------------------|----------:|
         | CREATE_INSTANT_INVITE |    always |
     */
    createChannelInvite(channelId: string, data?: {
        max_age?: number;
        max_uses?: number;
        temporary?: boolean;
        unique?: boolean;
    }): Promise<Invite>;
    /**
     * Send an indicator that the current user is typing within a channel.
     *
     * **You should generally avoid this method unless used for longer computations (>1s)**
     * @param {String} channelId - Id of the channel
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     */
    startChannelTyping(channelId: string): Promise<void>;
    /**
     * Get a list of pinned messages for a channel
     * @param {String} channelId - Id of the channel
     * @returns {Promise.<Object[]>} Array of [message objects](https://discordapp.com/developers/docs/resources/channel#message-object)
     */
    getChannelPinnedMessages(channelId: string): Promise<object[]>;
    /**
     * Pin a message within a channel
     * @param {String} channelId - Id of the channel
     * @param {String} messageId - Id of the message
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_MESSAGES    |    always |
     */
    addChannelPinnedMessage(channelId: string, messageId: string): Promise<void>;
    /**
     * Remove a pinned message from a channel
     * @param {String} channelId - Id of the channel
     * @param {String} messageId - Id of the message
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_MESSAGES    |    always |
     */
    removeChannelPinnedMessage(channelId: string, messageId: string): Promise<void>;
    /**
     * Add a user to a group dm
     * @param {String} channelId - Id of the channel
     * @param {String} userId - Id of the user to be removed
     * @param {Object} data - Data to send to this endpoint
     * @param {String} data.access_token - access token of the user that granted the app the gdm.join scope
     * @param {String} [data.nick] - nickname of the user being added
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | OAUTH2 Scopes |
         |---------------|
         | gdm.join      |
     */
    addDmChannelRecipient(channelId: string, userId: string, data: {
        access_token: string;
        nick?: string;
    }): Promise<void>;
    /**
     * Remove a recipient from a group dm
     * @param {String} channelId - Id of the channel
     * @param {String} userId - Id of the user to be removed
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     */
    removeDmChannelRecipient(channelId: string, userId: string): Promise<void>;
}

/**
 * @typedef {Object} Channel
 * @property {String} id - Id of the channel
 * @property {Number} type - [type](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-types) of channel
 * @property {String} [guild_id] - Id of the {Guild} of the channel
 * @property {Number} [position] - sorting position of the channel
 * @property {PermissionOverwrite[]} [permission_overwrites] - array of permission overwrites for this channel
 * @property {String} [name] - name of the channel
 * @property {String} [topic] - topic of the channel
 * @property {Boolean} [nsfw] - if the channel is nsfw (guild only)
 * @property {String} [last_message_id] - the Id of the last message sent in this channel
 * @property {Number} [bitrate] - bitrate of the channel (voice only)
 * @property {Number} [user_limit] - limit of users in a channel (voice only)
 * @property {User[]} [recipients] - recipients of a dm (dm only)
 * @property {String} [icon] - icon hash (dm only)
 * @property {String} [owner_id] - Id of the DM creator (dm only)
 * @property {String} [application_id] - application Id of the creator of the group dm if a bot created it (group dm only)
 * @property {String} [parent_id] - Id of the parent category for a channel
 */
export type Channel = {
    id: string;
    type: number;
    guild_id?: string;
    position?: number;
    permission_overwrites?: PermissionOverwrite[];
    name?: string;
    topic?: string;
    nsfw?: boolean;
    last_message_id?: string;
    bitrate?: number;
    user_limit?: number;
    recipients?: User[];
    icon?: string;
    owner_id?: string;
    application_id?: string;
    parent_id?: string;
};

/**
 * @typedef {Object} PermissionOverwrite
 * @property {Number} allow - bitwise value of allowed permissions
 * @property {Number} deny - bitwise value of disallowed permissions
 * @property {String} type - type of the overwrite, either member or role
 */
export type PermissionOverwrite = {
    id: string;
    allow: number;
    deny: number;
    type: string;
};

/**
 * @typedef {Object} Message
 * @property {String} id - id of the message
 * @property {String} channel_id - id of the channel the message was sent in
 * @property {String} [guild_id] - id of the guild the message was sent in
 * @property {User} author - the author of this message (not guaranteed to be a valid user, see below)
 * @property {GuildMember} [member] - member properties for this message's author
 * @property {String} content - contents of the message
 * @property {String} timestamp - when this message was sent
 * @property {String} [edited_timestamp] - when this message was edited (or null if never)
 * @property {Boolean} tts - whether this was a TTS message
 * @property {Boolean} mention_everyone - whether this message mentions everyone
 * @property {User[]} mentions - users specifically mentioned in the message
 * @property {Role[]} mention_roles - roles specifically mentioned in this message
 * @property {Any[]} [mention_channels] - channels specifically mentioned in this message
 * @property {Any[]} attachments - any attached files
 * @property {Any[]} embeds - any embedded content
 * @property {Any[]} [reactions] - reactions to the message
 * @property {String | Number} nonce - used for validating a message was sent
 * @property {Boolean} pinned - whether this message is pinned
 * @property {String} [webhook_id] - if the message is generated by a webhook, this is the webhook's id
 * @property {Number} type - [type](https://discordapp.com/developers/docs/resources/channel#message-object-message-types) see for more
 * @property {Any} [activity] - sent with Rich Presence-related chat embeds
 * @property {Any} [application] - sent with Rich Presence-related chat embeds
 * @property {Any} [message_reference] - reference data sent with crossposted messages
 * @property {Any} [flags] - [flags](https://discordapp.com/developers/docs/resources/channel#message-object-message-flags) message flags OR d together, describes extra features of the message
 */
export type Message = {
    id: string;
    channel_id: string;
    guild_id?: string;
    author: User;
    member?: GuildMember;
    content: string;
    timestamp: string;
    edited_timestamp?: string;
    tts: boolean;
    mention_everyone: boolean;
    mentions: User[];
    mention_roles: Role[];
    mention_channels?: any[];
    attachments: any[];
    embeds: any[];
    reactions?: any[];
    nonce: string | number;
    pinned: boolean;
    webhook_id?: string;
    type: number;
    activity?: any;
    application?: any;
    message_reference?: any;
    flags?: any;
}

/**
 * Create a new User Method handler
 *
 * Usually SnowTransfer creates a method handler for you, this is here for completion
 *
 * You can access the methods listed via `client.user.method`, where `client` is an initialized SnowTransfer instance
 * @param {Any} requestHandler
 */
export class UserMethods {
    constructor(requestHandler: Any);
    /**
     * Get information about current user
     * @returns {Promise.<SelfUser>} [user object](https://discordapp.com/developers/docs/resources/user#user-object)
     */
    getSelf(): Promise<SelfUser>;
    /**
     * Get information about a user via Id
     * @param {String} userId - Id of the user
     * @returns {Promise.<User>} [user object](https://discordapp.com/developers/docs/resources/user#user-object)
     */
    getUser(userId: string): Promise<User>;
    /**
     * Update the current user
     * @param {Object} data
     * @param {String} [data.username] - Username to change
     * @param {String} [data.avatar] - Base64 encoded avatar
     * @returns {Promise.<SelfUser>} [user object](https://discordapp.com/developers/docs/resources/user#user-object)
     *
     * @example
     * // update the avatar of the user
     * let client = new SnowTransfer('TOKEN');
     * let fileData = fs.readFileSync('new_avatar.png') // You should probably use fs.readFile, since it's asynchronous, synchronous methods may lag your bot.
     * let updateData = {
     *   avatar: `data:image/png;base64,${fileData.toString('base64')}` // base64 data url: data:mimetype;base64,base64String
     * }
     * client.user.updateSelf(updateData)
     */
    updateSelf(data: {
        username?: string;
        avatar?: string;
    }): Promise<SelfUser>;
    /**
     * Get guilds of the current user
     * @returns {Promise.<Guild[]>} Array of [partial guild objects](https://discordapp.com/developers/docs/resources/guild#guild-object)
     */
    getGuilds(): Promise<Guild[]>;
    /**
     * Leave a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     */
    leaveGuild(guildId: string): Promise<void>;
    /**
     * Get direct messages of a user
     *
     * **Returns an empty array for bots**
     * @returns {Promise.<Channel[]>} Array of [dm channels](https://discordapp.com/developers/docs/resources/channel#channel-object)
     */
    getDirectMessages(): Promise<Channel[]>;
    /**
     * Create a direct message channel with another user
     *
     * **You can not create a dm with another bot**
     * @param {String} userId - Id of the user to create the direct message channel with
     * @returns {Promise.<Channel>} [DM channel](https://discordapp.com/developers/docs/resources/channel#channel-object)
     *
     * @example
     * // Create a dm channel and send "hi" to it
     * let client = new SnowTransfer('TOKEN');
     * let channel = await client.user.createDirectMessageChannel('other user id')
     * client.channel.createMessage(channel.id, 'hi')
     */
    createDirectMessageChannel(userId: string): Promise<Channel>;
}

/**
 * @typedef {Object} User
 * @property {String} id - Id of the user
 * @property {String} username - username of the user
 * @property {String} discriminator - 4 digit long discord tag
 * @property {String} avatar - avatar hash of the user
 * @property {Boolean} [bot] - whether the user belongs to an OAuth2 application
 */
export type User = {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    bot?: boolean;
};

/**
 * @typedef {User} SelfUser
 * @property {Boolean} bot - if the user is a bot
 * @property {Boolean} mfa_enabled - if the user has mfa enabled
 * @property {Boolean} verified - if the user is verified
 * @property {String} email - email of the user
 */
export type SelfUser = User;

/**
 * Create a new Emoji Method handler
 *
 * Usually SnowTransfer creates a method handler for you, this is here for completion
 *
 * You can access the methods listed via `client.emoji.method`, where `client` is an initialized SnowTransfer instance
 * @param {Any} requestHandler - request handler that calls the rest api
 * @constructor
 */
export class EmojiMethods {
    constructor(requestHandler: Any);
    /**
     * Get a list of emojis of a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Emoji[]>} Array of [emoji objects](https://discordapp.com/developers/docs/resources/emoji#emoji-object)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_EMOJIS      |    always |
     */
    getEmojis(guildId: string): Promise<Emoji[]>;
    /**
     * Get an emoji via guildId + emojiId
     * @param {String} guildId - Id of the guild
     * @param {String} emojiId - Id of the emoji
     * @returns {Promise.<Emoji>} [Emoji object](https://discordapp.com/developers/docs/resources/emoji#emoji-object)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_EMOJIS      |    always |
     */
    getEmoji(guildId: string, emojiId: string): Promise<Emoji>;
    /**
     * Create a new Emoji
     * @param {String} guildId - Id of the guild
     * @param {Object} data - Emoji data, check the example
     * @param {String} data.name - name of the emoji
     * @param {String} data.image - base 64 avatar
     * @returns {Promise.<Emoji>} [Emoji object](https://discordapp.com/developers/docs/resources/emoji#emoji-object)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_EMOJIS      |    always |
     * @example
     * // upload a simple png emoji with a name of "niceEmoji"
     * let client = new SnowTransfer('TOKEN');
     * let fileData = fs.readFileSync('nice_emoji.png') // You should probably use fs.readFile, since it's asynchronous, synchronous methods may lag your bot.
     * let emojiData = {
     *   name: 'niceEmoji',
     *   image: `data:image/png;base64,${fileData.toString('base64')}` // base64 data url: data:mimetype;base64,base64String
     * }
     * client.emoji.createEmoji('guild id', emojiData)
     */
    createEmoji(guildId: string, data: {
        name: string;
        image: string;
    }): Promise<Emoji>;
    /**
     * Update an existing emoji
     * @param {String} guildId - Id of the guild
     * @param {String} emojiId - Id of the emoji
     * @param {Object} data - Emoji data, check the example
     * @param {String} data.name - new name of the emoji
     * @returns {Promise.<Emoji>} [Emoji object](https://discordapp.com/developers/docs/resources/emoji#emoji-object)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_EMOJIS      |    always |
     * @example
     * // Change the name of an existing emoji to "niceEmote"
     * let client = new SnowTransfer('TOKEN');
     * let emojiData = {
     *   name: 'niceEmote'
     * }
     * client.emoji.updateEmoji('guild id', 'emoji id', emojiData)
     */
    updateEmoji(guildId: string, emojiId: string, data: {
        name: string;
    }): Promise<Emoji>;
    /**
     * Delete a emoji
     * @param {String} guildId - Id of the guild
     * @param {String} emojiId - Id of the emoji
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_EMOJIS      |    always |
     */
    deleteEmoji(guildId: string, emojiId: string): Promise<void>;
}

/**
 * @typedef {Object} Emoji
 * @property {String} id - Id of the emoji
 * @property {String} name - name of the emoji
 * @property {Array} [roles] - array of roles whitelisted to use the emoji (whitelisted apps only)
 * @property {User} [user] - User that created this emoji
 * @property {Boolean} require_colons - whether this emoji must be wrapped in colons
 * @property {Boolean} managed - whether this emoji is managed
 */
export type Emoji = {
    id: string;
    name: string;
    roles?: any[];
    user?: User;
    require_colons: boolean;
    managed: boolean;
};


/**
 * Create a new Method Handler
 *
 * Usually SnowTransfer creates a method handler for you, this is here for completion
 *
 * You can access the methods listed via `client.webhook.method`, where `client` is an initialized SnowTransfer instance
 * @param {Any} requestHandler - request handler that calls the rest api
 */
export class WebhookMethods {
    constructor(requestHandler: Any);
    /**
     * Create a new Webhook
     * @param {String} channelId - Id of the channel
     * @param {Object} data - Object with webhook properties
     * @param {String} data.name - name of the webhook
     * @param {String} [data.avatar] - base 64 encoded avatar
     * @returns {Promise.<Object>} [Webhook Object](https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | condition |
         |--------------------|-----------:|
         | MANAGE_WEBHOOKS    | always    |
     *
     * @example
     * // Create a new Webhook with the name "Webby Webhook"
     * let client = new SnowTransfer('TOKEN');
     * let webhookData = {
     *   name: "Webby Webhook"
     * }
     * client.webhook.createWebhook('channel Id', webhookData)
     */
    createWebhook(channelId: string, data: {
        name: string;
        avatar?: string;
    }): Promise<object>;
    /**
     * Get webhooks created within a channel
     * @param {String} channelId - Id of the channel
     * @returns {Promise.<Object[]>} Array of [Webhook Objects](https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | condition |
         |--------------------|-----------:|
         | MANAGE_WEBHOOKS    | always    |
     */
    getWebhooksChannel(channelId: string): Promise<object[]>;
    /**
     * Get all webhooks within a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Object>} Array of [Webhook Objects](https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | condition |
         |--------------------|-----------:|
         | MANAGE_WEBHOOKS    | always    |
     */
    getWebhooksGuild(guildId: string): Promise<object>;
    /**
     * Get a single Webhook via Id
     * @param {String} webhookId - Id of the webhook
     * @param {String} [token] - Webhook token
     * @returns {Promise.<Object>} [Webhook Object](https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | condition |
         |--------------------|---------------:|
         | MANAGE_WEBHOOKS    | without token |
     */
    getWebhook(webhookId: string, token?: string): Promise<object>;
    /**
     * Update a webhook
     * @param {String} webhookId - Id of the webhook
     * @param {String} [token] - Webhook token
     * @param {Object} data - Updated Webhook properties
     * @param {String} [data.name] - New default name of the webhook
     * @param {String} [data.avatar] - Updated base 64 image for the default avatar
     * @param {String} [data.channel_id] - Id of the new channel of the webhook
     * @returns {Promise.<Object>} Updated [Webhook Object](https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | condition |
         |--------------------|---------------:|
         | MANAGE_WEBHOOKS    | without token |
     */
    updateWebhook(webhookId: string, data: {
        name?: string;
        avatar?: string;
        channel_id?: string;
    }, token?: string): Promise<object>;
    /**
     * Delete a Webhook
     * @param {String} webhookId - Id of the webhook
     * @param {String} [token] - Webhook token
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|---------------:|
         | MANAGE_WEBHOOKS    | without token |
     */
    deleteWebhook(webhookId: string, token?: string): Promise<void>;
    /**
     * Send a message via Webhook
     * @param {String} webhookId - Id of the webhook
     * @param {String} token - webhook token
     * @param {Object} data - Webhook data to send
     * @param {String} [data.content] - content of the message
     * @param {?String} [data.username] - username to use for the webhook
     * @param {?String} [data.avatar_url] - avatar url of the webhook
     * @param {?Boolean} [data.tts] - send a text to speech message
     * @param {Object} [data.file] - File, that should be uploaded
     * @param {String} [data.file.name] - Name of the file
     * @param {File} [data.file.file] - Buffer with file contents
     * @param {Object[]} [data.embeds] - Array of [embed objects](https://discordapp.com/developers/docs/resources/channel#embed-object)
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     * @example
     * // Send a message saying "Hi from my webhook" with a previously created webhook
     * let client = new SnowTransfer('TOKEN');
     * client.webhook.executeWebhook('webhook Id', 'webhook token', {content: 'Hi from my webhook'})
     */
    executeWebhook(webhookId: string, token: string, data: {
        content?: string;
        username?: string;
        avatar_url?: string;
        tts?: boolean;
        file?: {
            name?: string;
            file?: File;
        };
        embeds?: object[];
    }): Promise<void>;
    /**
     * Execute a slack style Webhook
     * @param {String} webhookId - Id of the Webhook
     * @param {String} token - Webhook token
     * @param {Object} data - Check [Slack's documentation](https://api.slack.com/incoming-webhooks)
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     */
    executeWebhookSlack(webhookId: string, token: string, data: any): Promise<void>;
}


/**
 * Create a new Guild Method Handler
 *
 * Usually SnowTransfer creates a method handler for you, this is here for completion
 *
 * You can access the methods listed via `client.guild.method`, where `client` is an initialized SnowTransfer instance
 * @param {Any} requestHandler - request handler that calls the rest api
 */
export class GuildMethods {
    constructor(requestHandler: Any);
    /**
     * Create a new Guild, **limited to 10 guilds (you may create more if you are whitelisted)**
     * Check the [discord docs](https://discordapp.com/developers/docs/resources/guild#create-guild) for more infos
     * @param {Object} data - data
     * @param {String} data.name - name of the guild
     * @param {String} [data.region] - [voice region](https://discordapp.com/developers/docs/resources/voice#voice-region-voice-region-structure)
     * @param {String} [data.icon] - base64 encoded jpeg icon to use for the guild
     * @param {Number} [data.verification_level] - guild [verification level](https://discordapp.com/developers/docs/resources/guild#guild-object-verification-level)
     * @param {Number} [data.default_message_notifications] - default message [notification setting](https://discordapp.com/developers/docs/resources/guild#default-message-notification-level)
     * @param {Channel[]} [data.channels] - array of [channels](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     * @param {Role[]} [data.roles] - array of [roles](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     * @returns {Promise.<Guild>} [Guild](https://discordapp.com/developers/docs/resources/guild#guild-object)
     *
     * @example
     * // Creates a simple guild with the name "Demo Guild"
     * let client = new SnowTransfer('TOKEN')
     * let guildData = {
     *   name: 'Demo Guild'
     * }
     * client.guild.createGuild(guildData)
     */
    createGuild(data: {
        name: string;
        region?: string;
        icon?: string;
        verification_level?: number;
        default_message_notifications?: number;
        channels?: Channel[];
        roles?: Role[];
    }): Promise<Guild>;
    /**
     * Get a guild via Id
     *
     * **Your bot has to be a member of the guild for this function to work**
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Guild>} [Guild object](https://discordapp.com/developers/docs/resources/guild#guild-object)
     */
    getGuild(guildId: string): Promise<Guild>;
    /**
     * Update a guild
     * @param {String} guildId - Id of the guild
     * @param {Object} data - data
     * @param {String} [data.name] - name of the guild
     * @param {String} [data.region] - guild [voice region](https://discordapp.com/developers/docs/resources/voice#voice-region-voice-region-structure) Id
     * @param {Number} [data.verification_level] - guild [verification level](https://discordapp.com/developers/docs/resources/guild#guild-object-verification-level)
     * @param {Number} [data.default_message_notifications] - message [notification setting](https://discordapp.com/developers/docs/resources/guild#default-message-notification-level)
     * @param {String} [data.afk_channel_id] - Id of the afk channel
     * @param {Number} [data.afk_timeout] - afk timeout in seconds
     * @param {String} [data.icon] - base64 jpeg image of the guild icon
     * @param {String} [data.owner_id] - Id of the owner user
     * @param {String} [data.splash] - base64 jpeg image for the guild splash (vip/partner only)
     * @returns {Promise.<Guild>} [Guild object](https://discordapp.com/developers/docs/resources/guild#guild-object)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_GUILD       |    always |
     *
     * @example
     * // Update the name of a guild to "Nice Guild"
     * let client = new SnowTransfer('TOKEN')
     * let guildData = {
     *   name: 'Nice Guild'
     * }
     * client.guild.updateGuild('guild Id', guildData)
     */
    updateGuild(guildId: string, data: {
        name?: string;
        region?: string;
        verification_level?: number;
        default_message_notifications?: number;
        afk_channel_id?: string;
        afk_timeout?: number;
        icon?: string;
        owner_id?: string;
        splash?: string;
    }): Promise<Guild>;
    /**
     * Delete a guild
     *
     * **Your bot has to be the owner of the guild to do this**
     *
     * **This action is irreversible, so use it with caution!**
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     */
    deleteGuild(guildId: string): Promise<void>;
    /**
     * Get a list of channels for a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Channel[]>} - list of [channels](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     */
    getGuildChannels(guildId: string): Promise<Channel[]>;
    /**
     * Create a channel within a guild
     * @param {String} guildId - Id of the guild
     * @param {Object} data - channel properties
     * @param {String} data.name - name of the channel
     * @param {Number} [data.type] - [type](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-types) of the channel
     * @param {String} [data.topic] - channel topic (0-1024 characters)
     * @param {Number} [data.bitrate] - bitrate of the channel (voice only)
     * @param {Number} [data.user_limit] - user limit of a channel (voice only)
     * @param {Number} [data.rate_limit_per_user] - amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected
     * @param {Number} [data.position] - sorting position of the channel
     * @param {PermissionOverwrite[]} [data.permission_overwrites] - permissions overwrites for the channel
     * @param {String} [data.parent_id] - id of the parent category for a channel
     * @param {Boolean} [data.nsfw] - whether the channel is nsfw
     * @returns {Promise.<Channel>} [channel object](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | condition |
         |--------------------|-----------:|
         | MANAGE_CHANNELS    | always    |
     */
    createGuildChannel(guildId: string, data: {
        name: string;
        type?: number;
        topic?: string;
        bitrate?: number;
        user_limit?: number;
        rate_limit_per_user?: number;
        position?: number;
        permission_overwrites?: PermissionOverwrite[];
        parent_id?: string;
        nsfw?: boolean;
    }): Promise<Channel>;
    /**
     * Batch update the positions of channels
     * @param {String} guildId - Id of the guild
     * @param {Object[]} data
     * @param {String} data[].id - Id of the channel
     * @param {Number} data[].position - new position of the channel
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     */
    updateChannelPositions(guildId: string, data: object[]): Promise<void>;
    /**
     * Get a guild member via Id
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @returns {Promise.<GuildMember>} - [guild member](https://discordapp.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)
     */
    getGuildMember(guildId: string, memberId: string): Promise<GuildMember>;
    /**
     * Get a list of guild members
     * @param {String} guildId - Id of the guild
     * @param {Object} [data] - query data
     * @param {Number} [data.limit] - how many results should be returned
     * @param {String} [data.after] - highest user Id after which results should be returned
     * @returns {Promise.<GuildMember[]>} - list of [guild members](https://discordapp.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)
     */
    getGuildMembers(guildId: string, data?: {
        limit?: number;
        after?: string;
    }): Promise<GuildMember[]>;
    /**
     * Add a guild member to a guild via oauth2 access token
     *
     * **You need the oauth2 `guilds.join` scope granted to the access_token**
     *
     *
     * **Your bot has to be a member of the guild you want to add the user to**
     *
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {Object} data - object containing the needed request data
     * @param {String} data.access_token - oauth2 access token with a `guilds.join` scope enabled
     * @param {String} [data.nick] - nickname of the new member
     * @param {String[]} [data.roles] - Array of Role Ids the new member should have
     * @param {Boolean} [data.mute] - if the new member should be muted
     * @param {Boolean} [data.deaf] - if the new member is deaf
     * @returns {Promise.<GuildMember>} - [guild member](https://discordapp.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)
     *
     * | Permissions needed    | condition |
         |-----------------------|----------:|
         | CREATE_INSTANT_INVITE |    always |
     *
     * | OAUTH2 Scopes |
         |---------------|
         | guilds.join   |
     *
     * @example
     * // add a user to a server
     * let client = new SnowTransfer('TOKEN')
     * let memberData = {
     *   access_token: 'access token of a user with the guilds.join scope'
     * }
     * client.guild.addGuildMember('guildId', 'memberId', memberData)
     */
    addGuildMember(guildId: string, memberId: string, data: {
        access_token: string;
        nick?: string;
        roles?: String[];
        mute?: boolean;
        deaf?: boolean;
    }): Promise<GuildMember>;
    /**
     * Update properties of a guild member
     *
     * **Check the table below to make sure you have the right permissions for the types of updates**
     *
     * **Make sure that your bot has `CONNECT` and `MOVE_MEMBERS` on the channel you want to move the member to**
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {Object} data - Updated properties
     * @param {String} [data.nick] - updated nickname of the member (MANAGE_NICKNAMES)
     * @param {String[]} [data.roles] - Array of Role Ids the member should have (MANAGE_ROLES)
     * @param {Boolean} [data.mute] - if the member should be muted (MUTE_MEMBERS)
     * @param {Boolean} [data.deaf] - if the member is deaf (DEAFEN_MEMBERS)
     * @param {String} [data.channel_id] - channel to move the member to (if connected to voice) (CONNECT and MOVE_MEMBERS)
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed |    condition |
         |--------------------|-------------:|
         | MANAGE_NICKNAMES   | Nick Updates |
         | MANAGE_ROLES       | Role Updates |
         | MUTE_MEMBERS       | Mute Updates |
         | DEAFEN_MEMBERS     | Deaf Updates |
         | MOVE_MEMBERS       | Voice Move   |
     *
     * @example
     * // Reset the nickname of a guild member
     * let client = new SnowTransfer('TOKEN')
     * let memberData = {
     *   nick: "" // You can reset nicknames by providing an empty string as the value of data.nick
     * }
     * client.guild.updateGuildMember('guild Id', 'memberId', memberData)
     */
    updateGuildMember(guildId: string, memberId: string, data: {
        nick?: string;
        roles?: String[];
        mute?: boolean;
        deaf?: boolean;
        channel_id?: string;
    }): Promise<void>;
    /**
     * Update the nick of the current user
     * @param {String} guildId - Id of the guild
     * @param {Object} data - object with a nick property
     * @param {String} data.nick - new nickname to use
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | CHANGE_NICKNAME    |    always |
     *
     * @example
     * // change nick of bot to "Nice Nick"
     * let client = new SnowTransfer('TOKEN')
     * let nickData = {
     *   nick: 'Nice Nick'
     * }
     * client.guild.updateSelf('guildId', nickData)
     */
    updateSelf(guildId: string, data: {
        nick: string;
    }): Promise<void>;
    /**
     * Add a role to a guild member
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {String} roleId - Id of the role
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_ROLES       |    always |
     */
    addGuildMemberRole(guildId: string, memberId: string, roleId: string): Promise<void>;
    /**
     * Remove a role from a guild member
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {String} roleId - Id of the role
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_ROLES       |    always |
     */
    removeGuildMemberRole(guildId: string, memberId: string, roleId: string): Promise<void>;
    /**
     * Remove a guild member (aka kick them)
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {Object} [data] - object with reason property
     * @param {String} [data.reason] - Audit log reason for the remove
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     *| Permissions needed | condition |
         |--------------------|----------:|
         | KICK_MEMBERS       |    always |
     *
     * @example
     * // Kick a member with a reason of "spam"
     * let client = new SnowTransfer('TOKEN')
     * let kickData = {
     *   reason: 'spam'
     * }
     * client.guild.removeGuildMember('guild Id', 'memberId', kickData)
     */
    removeGuildMember(guildId: string, memberId: string, data?: {
        reason?: string;
    }): Promise<void>;
    /**
     * Get bans of a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Ban[]>} - List of [bans](https://discordapp.com/developers/docs/resources/guild#ban-object-ban-structure)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | BAN_MEMBERS        |    always |
     */
    getGuildBans(guildId: string): Promise<Ban[]>;
    /**
     * Ban a guild member
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {Object} [data] - object with a reason and a delete-message-days property
     * @param {String} [data.reason] - Audit log reason for the ban
     * @param {Number} [data.delete-message-days] - Number of Days of messages that should be removed
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | BAN_MEMBERS        |    always |
     *
     * @example
     * // Ban a user with a reason and delete the last 2 days of his messages
     * let client = new SnowTransfer('TOKEN')
     * let banData = {
     *   reason: 'Memes were not good enough',
     *   "delete-message-days":2
     * }
     * client.guild.createGuildBan('guild Id', 'memberId', banData)
     */
    createGuildBan(guildId: string, memberId: string, data?: {
        reason?: string;
        'delete-message-days'?: number;
    }): Promise<void>;
    /**
     * Remove a ban of a user
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {Object} [data] - object with a reason property
     * @param {String} [data.reason] - Audit log reason for the remove of the ban
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | BAN_MEMBERS        |    always |
     */
    removeGuildBan(guildId: string, memberId: string, data?: {
        reason?: string;
    }): Promise<void>;
    /**
     * Get a list of roles for a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Role[]>} - array of [roles](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_ROLES       |    always |
     */
    getGuildRoles(guildId: string): Promise<Role[]>;
    /**
     * Create a new Role
     * @param {String} guildId - Id of the guild
     * @param {Object} [data] - data with role properties
     * @param {String} [data.name] - name of the role
     * @param {Number} [data.permissions] - Number created from combining permission bits
     * @param {Number} [data.color] - rgb color of the role
     * @param {Boolean} [data.hoist] - if the role should be displayed in the sidebar
     * @param {Boolean} [data.mentionable] - if the role should be mentionable
     * @returns {Promise.<Role>} [role](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_ROLES       |    always |
     *
     * @example
     * // Create a role with the name "Nice Role" and a color of a soft blue
     * let client = new SnowTransfer('TOKEN')
     * let roleData = {
     *   name: 'Nice Role',
     *   color: 0x7c7cf8
     * }
     * client.guild.createGuildRole('guild Id', roleData)
     */
    createGuildRole(guildId: string, data?: {
        name?: string;
        permissions?: number;
        color?: number;
        hoist?: boolean;
        mentionable?: boolean;
    }): Promise<Role>;
    /**
     * Batch modify the positions of roles
     * @param {String} guildId - Id of the guild
     * @param {Object[]} data - Array of objects with id and position properties
     * @param {String} data[].id - Id of the role
     * @param {Number} data[].position - new position of the role
     * @returns {Promise.<Role[]>} - array of [roles](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_ROLES       |    always |
     */
    updateGuildRolePositions(guildId: string, data: object[]): Promise<Role[]>;
    /**
     * Update a guild role
     * @param {String} guildId - Id of the guild
     * @param {String} roleId - Id of the role
     * @param {Object} data - updated properties of the role
     * @param {String} [data.name] - new name of the role
     * @param {Number} [data.permissions] - updated permission bit-set
     * @param {Number} [data.color] - rgb color of the role
     * @param {Boolean} [data.hoist] - if the role should be displayed in the sidebar
     * @param {Boolean} [data.mentionable] - if the role should be mentionable
     * @returns {Promise.<Role>} [Updated Role](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_ROLES       |    always |
     */
    updateGuildRole(guildId: string, roleId: string, data: {
        name?: string;
        permissions?: number;
        color?: number;
        hoist?: boolean;
        mentionable?: boolean;
    }): Promise<Role>;
    /**
     * Delete a role from the guild
     * @param {String} guildId - Id of the guild
     * @param {String} roleId - Id of the role
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_ROLES       |    always |
     */
    removeGuildRole(guildId: string, roleId: string): Promise<void>;
    /**
     * Get the amount of members that would be pruned when a prune with the passed amount of days would be started
     * @param {String} guildId - Id of the guild
     * @param {Object} data - Object with a days property
     * @param {Number} data.days - days to count prune for (min 1)
     * @returns {Promise.<{pruned: number}>} - Object with a "pruned" key indicating the amount of members that would be pruned
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | KICK_MEMBERS       |    always |
     */
    getGuildPruneCount(guildId: string, data: {
        days: number;
    }): Promise<{pruned: number}>;
    /**
     * Start a prune
     * @param {String} guildId - Id of the guild
     * @param {Object} data - Object with a days property
     * @param {Number} data.days - days to count prune for (min 1)
     * @returns {Promise.<{pruned: number}>} Object with a "pruned" key indicating the amount of members that were be pruned
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | KICK_MEMBERS       |    always |
     */
    startGuildPrune(guildId: string, data: {
        days: number;
    }): Promise<{pruned: number}>;
    /**
     * Get a list of voice regions for the guild, includes vip-regions unlike voice.getVoiceRegions
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<VoiceRegion[]>} List of [voice regions](https://discordapp.com/developers/docs/resources/voice#voice-region-object)
     */
    getGuildVoiceRegions(guildId: string): Promise<VoiceRegion[]>;
    /**
     * Get invites for a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Invite[]>} List of [invites](https://discordapp.com/developers/docs/resources/invite#invite-object) (with metadata)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_GUILD       |    always |
     */
    getGuildInvites(guildId: string): Promise<Invite[]>;
    /**
     * Get integrations for a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Object[]>} List of [integration objects](https://discordapp.com/developers/docs/resources/guild#integration-object)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_GUILD       |    always |
     */
    getGuildIntegrations(guildId: string): Promise<object[]>;
    /**
     * Attach a integration object from the user to the guild
     * @param {String} guildId - Id of the guild
     * @param {Object} data - Integration object with id and type properties
     * @param {String} data.type - type of the integration
     * @param {String} data.id - Id of the integration
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_GUILD       |    always |
     */
    createGuildIntegration(guildId: string, data: {
        type: string;
        id: string;
    }): Promise<void>;
    /**
     * Update behaviour and settings of an [integration object](https://discordapp.com/developers/docs/resources/guild#integration-object)
     * @param {String} guildId - Id of the guild
     * @param {String} integrationId - Id of the integration
     * @param {Object} data - Data with the properties listed below
     * @param {Number} data.expire_behaviour - Behaviour when a integration subscription expires
     * @param {Number} data.expire_grace_period - Time in seconds for how long to ignore expired subscriptions
     * @param {Boolean} data.enable_emoticons - If emoticons should be synced for this integration (twitch only atm)
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_GUILD       |    always |
     */
    updateGuildIntegration(guildId: string, integrationId: string, data: {
        expire_behaviour: number;
        expire_grace_period: number;
        enable_emoticons: boolean;
    }): Promise<void>;
    /**
     * Delete a guild integratiom
     * @param {String} guildId - Id of the guild
     * @param {String} integrationId - Id of the integration
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_GUILD       |    always |
     */
    removeGuildIntegration(guildId: string, integrationId: string): Promise<void>;
    /**
     * Synchronize a guild integration
     * @param {String} guildId - Id of the guild
     * @param {String} integrationId - Id of the integration
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_GUILD       |    always |
     */
    syncGuildIntegration(guildId: string, integrationId: string): Promise<void>;
    /**
     * Get the guild embed object
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Object>} [Guild Embed](https://discordapp.com/developers/docs/resources/guild#guild-embed-object)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_GUILD       |    always |
     */
    getGuildEmbed(guildId: string): Promise<object>;
    /**
     * Update a guild embed object
     * @param {String} guildId - Id of the guild
     * @param {Object} data - data
     * @param {Boolean} data.enabled - if the embed is enabled
     * @param {String} data.channel_id - channel Id of the embed
     * @returns {Promise.<Object>} - [Guild Embed](https://discordapp.com/developers/docs/resources/guild#guild-embed-object)
     *
     * | Permissions needed | condition |
         |--------------------|----------:|
         | MANAGE_GUILD       |    always |
     */
    updateGuildEmbed(guildId: string, data: {
        enabled: boolean;
        channel_id: string;
    }): Promise<object>;
}

/**
 * @typedef {Object} Guild
 * @property {String} id - guild Id
 * @property {String} name - guild name
 * @property {String} icon - icon hash
 * @property {String} splash - splash image hash
 * @property {String} owner_id - Id of the owner
 * @property {String} region - Id of the voice region
 * @property {String} afk_channel_id - Id of the afk channel
 * @property {Number} afk_timeout - afk timeout in seconds
 * @property {Boolean} embed_enabled - if the guild is embeddable
 * @property {String} embed_channel_id - Id of embedded channel
 * @property {Number} verification level - [verification level](https://discordapp.com/developers/docs/resources/guild#guild-object-verification-level) of the guild
 * @property {Number} default_message_notifications - default
 * [notification level](https://discordapp.com/developers/docs/resources/guild#guild-object-default-message-notification-level) of the guild
 * @property {Number} explicit_content_filter - default [filter level](https://discordapp.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level)
 * @property {Role[]} roles - Array of roles
 * @property {Emoji[]} emojis - Array of emojis
 * @property {String[]} features - Array of enabled guild features
 * @property {Number} mfa_level - required [mfa level](https://discordapp.com/developers/docs/resources/guild#guild-object-mfa-level) for the guild
 * @property {String} [application_id] - application Id of the guild creator, if the guild was created by a bot
 * @property {Boolean} widget_enabled - if the server widget is enabled
 * @property {String} widget_channel_id - channel Id of the server widget
 */
export type Guild = {
    id: string;
    name: string;
    icon: string;
    splash: string;
    owner_id: string;
    region: string;
    afk_channel_id: string;
    afk_timeout: number;
    embed_enabled: boolean;
    embed_channel_id: string;
    verification: number;
    default_message_notifications: number;
    explicit_content_filter: number;
    roles: Role[];
    emojis: Emoji[];
    features: String[];
    mfa_level: number;
    application_id?: string;
    widget_enabled: boolean;
    widget_channel_id: string;
};

/**
 * @typedef {Object} Role
 * @property {String} id - role Id
 * @property {String} name - role name
 * @property {Number} color - integer representation of hexadecimal color code
 * @property {Boolean} hoist - if this role is hoisted
 * @property {Number} position - position of the role
 * @property {Number} permissions - permission bit set
 * @property {Boolean} managed - if this role is managed by an integration
 * @property {Boolean} mentionable - if this role can be mentioned
 */
export type Role = {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: number;
    managed: boolean;
    mentionable: boolean;
};

/**
 * @typedef {Object} GuildMember
 * @property {User} user - user belonging to the member
 * @property {?String} nick - nickname if the member has one
 * @property {String[]} roles - array of role ids
 * @property {String} joined_at - timestamp when the user joined the guild
 * @property {Boolean} deaf - if the user is deafened
 * @property {Boolean} mute - if the user is muted
 */
export type GuildMember = {
    user: User;
    nick: string;
    roles: String[];
    joined_at: string;
    deaf: boolean;
    mute: boolean;
};

/**
 * @typedef {Object} Ban
 * @property {?String} reason - reason of the ban
 * @property {User} user - user that was banned
 */
export type Ban = {
    reason: string;
    user: User;
};

/**
 * Create a new Invite Method Handler
 *
 * Usually SnowTransfer creates a method handler for you, this is here for completion
 *
 * You can access the methods listed via `client.invite.method`, where `client` is an initialized SnowTransfer instance
 * @param {Any} requestHandler - request handler that calls the rest api
 */
export class InviteMethods {
    constructor(requestHandler: Any);
    /**
     * Get the invite data on an invite id
     * @param {String} inviteId - Id of the invite
     * @param {Boolean} [withCounts] - When set to true you get an invite object with additional `approximate_presence_count` and `approximate_member_count` fields
     * @returns {Promise.<Invite>} [Invite Object](https://discordapp.com/developers/docs/resources/invite#invite-object)
     */
    getInvite(inviteId: string, withCounts?: boolean): Promise<Invite>;
    /**
     * Delete an invite
     * @param {String} inviteId
     * @returns {Promise.<Invite>} [Invite Object](https://discordapp.com/developers/docs/resources/invite#invite-object)
     *
     * | Permissions needed | condition |
         |--------------------|-----------:|
         | MANAGE_CHANNELS    | always    |
     */
    deleteInvite(inviteId: string): Promise<Invite>;
}

/**
 * @typedef {Object} Invite
 * @property {String} code - unique id code of the invite
 * @property {Guild} guild - partial guild object of the invite
 * @property {Channel} channel - partial channel object of the invite
 * @property {User} [inviter] - creator of the invite
 * @property {Number} [uses] - how often the invite was used
 * @property {Number} [max_uses] - how often the invite can be used
 * @property {Number} [max_age] - duration in seconds until the invite expires
 * @property {Boolean} [temporary] - if this invite only grants temporary membership
 * @property {Date} [created_at] - when the invite was created
 * @property {Boolean} [revoked] - if this invite has been revoked
 */
export type Invite = {
    code: string;
    guild: Guild;
    channel: Channel;
    inviter?: User;
    uses?: number;
    max_uses?: number;
    max_age?: number;
    temporary?: boolean;
    created_at?: Date;
    revoked?: boolean;
};

/**
 * Create a new Voice Method Handler
 *
 * Usually SnowTransfer creates a method handler for you, this is here for completion
 *
 * You can access the methods listed via `client.voice.method`, where `client` is an initialized SnowTransfer instance
 * @param {Any} requestHandler - request handler that calls the rest api
 */
export class VoiceMethods {
    constructor(requestHandler: Any);
    /**
     * Get currently available voice regions that can be used when creating servers
     * @returns {Promise.<VoiceRegion[]>} Array of [voice region](https://discordapp.com/developers/docs/resources/voice#voice-region-object) objects
     */
    getVoiceRegions(): Promise<VoiceRegion[]>;
}

/**
 * @typedef {Object} VoiceRegion
 * @property {String} id - id of the region
 * @property {String} name - name of the region
 * @property {String} sample_hostname - example hostname of the region
 * @property {Number} sample_port - example port of the region
 * @property {Boolean} vip - if this is a vip region
 * @property {Boolean} optimal - if this region is closest to the user
 * @property {Boolean} deprecated - if this region should not be used anymore
 * @property {Boolean} custom - if this is a custom region (used for events/etc)
 */
export type VoiceRegion = {
    id: string;
    name: string;
    sample_hostname: string;
    sample_port: number;
    vip: boolean;
    optimal: boolean;
    deprecated: boolean;
    custom: boolean;
};

/**
 * Create a new Bot Method Handler
 *
 * Usually SnowTransfer creates a method handler for you, this is here for completion
 *
 * You can access the methods listed via `client.bot.method`, where `client` is an initialized SnowTransfer instance
 * @param {Any} requestHandler request handler that calls the rest api
 */
export class BotMethods {
    constructor(requestHandler: Any);
    /**
     * Get the gateway url to connect to
     * @returns  {Promise.<GatewayData>} [Gateway data](https://discordapp.com/developers/docs/topics/gateway#get-gateway-example-response)
     * @example
     * let client = new SnowTransfer('TOKEN');
     * let result = await client.bot.getGateway();
     * // result should be something like {"url": "wss://gateway.discord.gg"}
     */
    getGateway(): Promise<GatewayData>;
    /**
     * Get the gateway url to connect to and a recommended amount of shards to use
     * @returns {Promise.<GatewayData>} [Gateway data](https://discordapp.com/developers/docs/topics/gateway#get-gateway-example-response)
     * @example
     * let client = new SnowTransfer('TOKEN');
     * let result = await client.bot.getGateway();
     * // result should be something like {"url": "wss://gateway.discord.gg", "shards": 1}
     */
    getGatewayBot(): Promise<GatewayData>;
}

/**
 * @typedef {Object} GatewayData
 * @property {String} url - url to connect to
 * @property {Number} [shards] - number of shards, recommended by discord
 */
export type GatewayData = {
    url: string;
    shards?: number;
};

/**
 * Create a new Audit Log Method Handler
 *
 * Usually SnowTransfer creates a method handler for you, this is here for completion
 *
 * You can access the methods listed via `client.auditLog.method`, where `client` is an initialized SnowTransfer instance
 * @param {Any} requestHandler - request handler that calls the rest api
 */
export class AuditLogMethods {
    constructor(requestHandler: Any);
    /**
     * Get the audit logs of the specified guild id
     * @param {String} guildId - id of a guild
     * @param {Object} [data] - optional audit log filter values
     * @param {String} [data.user_id] - Filter the audit log with the id of a user
     * @param {Number} [data.action_type] - [Type](https://discordapp.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events) of the audit log event
     * @param {String} [data.before] - Filter the audit log before a certain entry id
     * @param {Number} [data.limit=50] - How many entries are returned (min 1, max 100)
     * @returns {Promise.<AuditLogObject>} - An object with audit log data
     *
     * | Permissions needed |
         |--------------------|
         | VIEW_AUDIT_LOG   |
     */
    getAuditLog(guildId: string, data?: {
        user_id?: string;
        action_type?: number;
        before?: string;
        limit?: number;
    }): Promise<AuditLogObject>;
}

/**
 * @typedef {Object} AuditLogObject
 * @description Audit Log Object
 * @property {Any[]} webhooks - list of [webhooks](https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure) found in the audit log
 * @property {User[]} users - list of [users](https://discordapp.com/developers/docs/resources/user#user-object) found in the audit log
 * @property {AuditLogEntry[]} audit_log_entries - list of [audit log entries](https://discordapp.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure)
 */
export type AuditLogObject = {
    webhooks: Any[];
    users: User[];
    audit_log_entries: AuditLogEntry[];
};

/**
 * @typedef {Object} AuditLogEntry
 * @description A single audit log entry object
 * @property {String} target_id - id of the affected entity (webhook, user, role, etc...)
 * @property {AuditLogChange[]} changes - array of changes made to the target_id
 * @property {String} user_id - id of the user who made the changes
 * @property {String} id - id of the entry
 * @property {Number} action_type - [type](https://discordapp.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events) of the action
 * @property {Object} options - [additional info](https://discordapp.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info) for some action types
 * @property {String} reason - reason for the change
 */
export type AuditLogEntry = {
    target_id: string;
    changes: AuditLogChange[];
    user_id: string;
    id: string;
    action_type: number;
    options: any;
    reason: string;
};

/**
 * @typedef {Object} AuditLogChange
 * @description A single audit log change object
 * @property {String|Number|Boolean|Role[]|PermissionOverwrite[]} new_value - new value of the key
 * @property {String|Number|Boolean|Role[]|PermissionOverwrite[]} old_value - old value of the key
 * @property {String} key - type of [audit log change key](https://discordapp.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-key)
 * @type {AuditLogMethods}
 */
export type AuditLogChange = {
    new_value: string | number | boolean | Role[] | PermissionOverwrite[];
    old_value: string | number | boolean | Role[] | PermissionOverwrite[];
    key: string;
};




}