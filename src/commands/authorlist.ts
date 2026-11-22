import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import { AppDataSource } from "../database/dataSource.js";
import { Author } from "../database/entities/Author.js";

export const data = new SlashCommandBuilder()
  .setName("authorlist")
  .setDescription("Lists all authors from the database");

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  await interaction.deferReply();

  try {
    const authorRepo = AppDataSource.getRepository(Author);
    const authors = await authorRepo.find({
      select: { name: true },
    });

    if (authors.length === 0) {
      await interaction.editReply("No authors found in the database.");
      return;
    }

    const authorNames = authors.map((author) => `• ${author.name}`).join("\n");

    await interaction.editReply(`**Authors:**\n${authorNames}`);
  } catch (error) {
    console.error("Error fetching authors:", error);
    await interaction.editReply("An error occurred while fetching the author list.");
  }
}
