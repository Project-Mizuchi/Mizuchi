import { Module } from "augurbot-ts";
import * as authorlist from "../commands/authorlist.js";

const AuthorModule = new Module();

AuthorModule.addInteraction({
  id: "1573874583453573213",
  name: authorlist.data.name,
  type: "CommandSlash",
  process: async (interaction) => {
    console.log("authorlist interaction triggered!");
    await authorlist.execute(interaction);
  },
});

export default AuthorModule;
