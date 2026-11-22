import { Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn, type Relation } from "typeorm";
import { GuildCurrency } from "./GuildCurrency.js";
import { UserGuild } from "./UserGuild.js";
import { GuildEvent } from "./GuildEvent.js";
import { Webhook } from "./Webhook.js";
import { GuildRole } from "./GuildRole.js";
import { Author } from "./Author.js";

@Index("guild_unique", ["snowflake"], { unique: true })
@Index("guild_unique_1", ["friendlyName"], { unique: true })
@Entity("guild", { schema: "Tavare" })
export class Guild {
  @PrimaryGeneratedColumn({ type: "double", name: "id", precision: 22 })
  id: number;

  @Column("varchar", { name: "snowflake", unique: true, length: 100 })
  snowflake: string;

  @Column("tinyint", { name: "isTestGuild", width: 1, default: () => "'0'" })
  isTestGuild: boolean;

  @Column("varchar", { name: "friendly_name", unique: true, length: 100 })
  friendlyName: string;

  @OneToMany(() => GuildCurrency, (guildCurrency) => guildCurrency.guild)
  guildCurrencies: Relation<GuildCurrency[]>;

  @OneToMany(() => UserGuild, (userGuild) => userGuild.guild)
  userGuilds: Relation<UserGuild[]>;

  @OneToMany(() => GuildEvent, (guildEvent) => guildEvent.guild)
  guildEvents: Relation<GuildEvent[]>;

  @OneToMany(() => Webhook, (webhook) => webhook.guild)
  webhooks: Relation<Webhook[]>;

  @OneToMany(() => GuildRole, (guildRole) => guildRole.guild)
  guildRoles: Relation<GuildRole[]>;

  @OneToMany(() => Author, (author) => author.answerChannelGuild)
  authors: Relation<Author[]>;
}
