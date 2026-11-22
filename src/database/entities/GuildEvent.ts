import { Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, type Relation } from "typeorm";
import { GuildEventRoleMap } from "./GuildEventRoleMap.js";
import { Event } from "./Event.js";
import { Guild } from "./Guild.js";
import { Webhook } from "./Webhook.js";

@Index("guild_event_guild_FK", ["guildId"], {})
@Index("guild_event_event_FK", ["eventId"], {})
@Index("guild_event_webhook_FK", ["announcementWebhookId"], {})
@Entity("guild_event", { schema: "Tavare" })
export class GuildEvent {
  @PrimaryGeneratedColumn({ type: "double", name: "id", precision: 22 })
  id: number;

  @Column("int", { name: "event_id", unsigned: true })
  eventId: number;

  @Column("double", { name: "guild_id", precision: 22 })
  guildId: number;

  @Column("bigint", {
    name: "announcement_webhook_id",
    nullable: true,
    unsigned: true,
  })
  announcementWebhookId: string | null;

  @Column("longtext", { name: "data", nullable: true })
  data: string | null;

  @OneToMany(
    () => GuildEventRoleMap,
    (guildEventRoleMap) => guildEventRoleMap.guildEvent
  )
  guildEventRoleMaps: Relation<GuildEventRoleMap[]>;

  @ManyToOne(() => Event, (event) => event.guildEvents, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "event_id", referencedColumnName: "id" }])
  event: Relation<Event>;

  @ManyToOne(() => Guild, (guild) => guild.guildEvents, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "guild_id", referencedColumnName: "id" }])
  guild: Relation<Guild>;

  @ManyToOne(() => Webhook, (webhook) => webhook.guildEvents, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "announcement_webhook_id", referencedColumnName: "id" }])
  announcementWebhook: Relation<Webhook>;
}
