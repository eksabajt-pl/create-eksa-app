#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import path from "path";
import fs from "fs-extra"; // Use fs-extra
import chalk from "chalk";
import { fileURLToPath } from "url";
import { execSync } from "child_process"; // For running npm install

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name("@eksabajt/create-starter")
  .description("Scaffold a new project using the Eksabajt starter template")
  .argument("[project-directory]", "The directory to create the project in")
  .action(async (projectDirectory) => {
    try {
      let targetDir = projectDirectory;

      // 1. Prompt for project directory if not provided
      if (!targetDir) {
        const response = await prompts({
          type: "text",
          name: "projectDir",
          message: "Enter the name for your new project:",
          initial: "my-eksabajt-app",
        });
        targetDir = response.projectDir; // Use the prompted value
        if (!targetDir) {
          // Handle empty input or cancellation
          console.log(
            chalk.red("Project directory name is required. Aborting.")
          );
          process.exit(1);
        }
      }

      const targetPath = path.resolve(process.cwd(), targetDir);
      const templatePath = path.join(__dirname, "../template");
      const basePath = path.join(templatePath, "base");

      console.log(chalk.blue(`\nScaffolding project in: ${targetPath}\n`));

      // 2. Check if target directory exists and isn't empty
      if (fs.existsSync(targetPath)) {
        const files = await fs.readdir(targetPath);
        if (files.length > 0) {
          const { overwrite } = await prompts({
            type: "confirm",
            name: "overwrite",
            message: `Directory ${chalk.yellow(
              targetDir
            )} already exists and is not empty. Overwrite?`,
            initial: false,
          });
          if (!overwrite) {
            console.log(chalk.red("Aborting."));
            process.exit(1);
          }
          // Optionally, add logic here to clean the directory if overwriting
          console.log(
            chalk.yellow(`Overwriting existing directory: ${targetPath}`)
          );
          await fs.emptyDir(targetPath); // Use fs-extra to empty
        }
      } else {
        await fs.ensureDir(targetPath); // Use fs-extra to create if not exists
      }

      // 3. Copy template files
      console.log(chalk.cyan("Copying template files..."));
      await fs.copy(basePath, targetPath);

      // 4. Update package.json in the new project (optional but recommended)
      const newPackageJsonPath = path.join(targetPath, "package.json");
      if (fs.existsSync(newPackageJsonPath)) {
        console.log(chalk.cyan("Updating project package.json..."));
        const packageJson = await fs.readJson(newPackageJsonPath);
        packageJson.name = path.basename(targetPath); // Set name based on directory
        // You could add more modifications here (description, author, etc.)
        await fs.writeJson(newPackageJsonPath, packageJson, { spaces: 2 });
      }

      // 5. Install dependencies in the new project
      console.log(
        chalk.cyan("\nInstalling dependencies (this might take a moment)...")
      );
      process.chdir(targetPath); // Change directory *into* the new project
      try {
        execSync("npm install", { stdio: "inherit" }); // Show install output
      } catch (error) {
        console.error(chalk.red("Failed to install dependencies:"), error);
        console.log(
          chalk.yellow(
            'Please try running "npm install" manually in the project directory.'
          )
        );
        // Decide if you want to exit or continue
      }

      // 6. Success Message
      console.log(chalk.green("\n✨ Project scaffolded successfully! ✨"));
      console.log(chalk.cyan("\nNext steps:"));
      console.log(chalk.gray(`  cd ${targetDir}`));
      console.log(chalk.gray(`  npm run dev`)); // Or whatever the start command is
      console.log(chalk.cyan("\nHappy coding!"));
    } catch (error) {
      console.error(chalk.red("\nAn error occurred:"), error);
      process.exit(1);
    }
  });

program.parse(process.argv);
