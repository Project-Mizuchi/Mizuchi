import { Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn, type Relation } from "typeorm";
import { UserGuild } from "./UserGuild.js";
import { Transaction } from "./Transaction.js";
import { UserEvent } from "./UserEvent.js";
import { Character } from "./Character.js";
import { UserGuildRole } from "./UserGuildRole.js";
import { Author } from "./Author.js";

@Index("userID_2", ["snowflake"], { unique: true })
@Index("userID", ["snowflake"], {})
@Index("username", ["username"], {})
@Entity("users", { schema: "Tavare" })
export class Users {
  @Column("varchar", {
    name: "snowflake",
    nullable: true,
    unique: true,
    length: 256,
  })
  snowflake: string | null;

  @Column("varchar", { name: "username", nullable: true, length: 40 })
  username: string | null;

  @PrimaryGeneratedColumn({ type: "double", name: "id", precision: 22 })
  id: number;

  @OneToMany(() => UserGuild, (userGuild) => userGuild.user)
  userGuilds: Relation<UserGuild[]>;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Relation<Transaction[]>;

  @OneToMany(() => Transaction, (transaction) => transaction.initatedbyuser)
  transactions2: Relation<Transaction[]>;

  @OneToMany(() => UserEvent, (userEvent) => userEvent.user)
  userEvents: Relation<UserEvent[]>;

  @OneToMany(() => Character, (character) => character.userId)
  characters!: Relation<Character[]>;

  @OneToMany(() => UserGuildRole, (userGuildRole) => userGuildRole.user)
  userGuildRoles: Relation<UserGuildRole[]>;

  @OneToOne(() => Author, (author) => author.user)
  author: Relation<Author>;
}
