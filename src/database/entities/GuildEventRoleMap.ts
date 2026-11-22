import { Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, type Relation } from "typeorm";
import { EventRoleTemplate } from "./EventRoleTemplate.js";
import { GuildEvent } from "./GuildEvent.js";
import { GuildRole } from "./GuildRole.js";

@Index("role_map_ge_FK", ["guildEventId"], {})
@Index("role_map_gr_FK", ["guildRoleId"], {})
@Index("guild_event_role_map_event_role_template_FK", ["templateId"], {})
@Entity("guild_event_role_map", { schema: "Tavare" })
export class GuildEventRoleMap {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: string;

  @Column("double", { name: "guild_event_id", precision: 22 })
  guildEventId: number;

  @Column("double", { name: "guild_role_id", precision: 22 })
  guildRoleId: number;

  @Column("double", { name: "template_id", nullable: true, precision: 22 })
  templateId: number | null;

  @Column("longtext", { name: "original_discord_state", nullable: true })
  originalDiscordState: string | null;

  @ManyToOne(
    () => EventRoleTemplate,
    (eventRoleTemplate) => eventRoleTemplate.guildEventRoleMaps,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "template_id", referencedColumnName: "id" }])
  template: Relation<EventRoleTemplate>;

  @ManyToOne(() => GuildEvent, (guildEvent) => guildEvent.guildEventRoleMaps, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "guild_event_id", referencedColumnName: "id" }])
  guildEvent: Relation<GuildEvent>;

  @ManyToOne(() => GuildRole, (guildRole) => guildRole.guildEventRoleMaps, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "guild_role_id", referencedColumnName: "id" }])
  guildRole: Relation<GuildRole>;
}
