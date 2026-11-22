import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { GuildCurrency } from "./GuildCurrency.js";
import { GuildEvent } from "./GuildEvent.js";
import { UserEvent } from "./UserEvent.js";

@Entity("event", { schema: "Tavare" })
export class Event {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("date", { name: "start" })
  start: string;

  @Column("date", { name: "end" })
  end: string;

  @Column("tinyint", {
    name: "enabled",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  enabled: boolean | null;

  @Column("varchar", { name: "embed_color", nullable: true, length: 100 })
  embedColor: string | null;

  @Column("longtext", { name: "data", nullable: true })
  data: string | null;

  @Column("text", { name: "announcement_message" })
  announcementMessage: string;

  @OneToMany(() => GuildCurrency, (guildCurrency) => guildCurrency.event)
  guildCurrencies: Relation<GuildCurrency[]>;

  @OneToMany(() => GuildEvent, (guildEvent) => guildEvent.event)
  guildEvents: Relation<GuildEvent[]>;

  @OneToMany(() => UserEvent, (userEvent) => userEvent.event)
  userEvents: Relation<UserEvent[]>;
}
