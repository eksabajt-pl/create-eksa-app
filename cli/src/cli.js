#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

// Helper Function to get available templates
async function getAvailableTemplates(templatesDir) {
  try {
    const entries = await fs.readdir(templatesDir, { withFileTypes: true });
    return entries
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .sort(); // Sort for consistent order
  } catch (error) {
    // Error handling as before
    if (error.code === "ENOENT") {
      console.error(
        chalk.red(`Error: Templates directory not found at ${templatesDir}`)
      );
    } else {
      console.error(chalk.red("Error reading templates directory:"), error);
    }
    return [];
  }
}

program
  .name("@eksabajt/create-starter")
  .description("Scaffold a new project using Eksabajt starter templates")
  .argument("[project-directory]", "The directory to create the project in")
  // Use variadic argument for multiple templates
  .option(
    "-t, --template <template-names...>",
    "Specify one or more templates to use"
  )
  .action(async (projectDirectory, options) => {
    try {
      let targetDir = projectDirectory;
      const templatesDir = path.join(__dirname, "../template");
      const availableTemplates = await getAvailableTemplates(templatesDir);

      if (availableTemplates.length === 0) {
        console.error(
          chalk.red(
            "No templates found. Please ensure the 'templates' directory exists and contains template subdirectories."
          )
        );
        process.exit(1);
      }

      // 1. Prompt for project directory if not provided
      if (!targetDir) {
        const response = await prompts({
          type: "text",
          name: "projectDir",
          message: "Enter the name for your new project:",
          initial: "my-eksabajt-app",
        });
        targetDir = response.projectDir;
        if (!targetDir) {
          console.log(
            chalk.red("Project directory name is required. Aborting.")
          );
          process.exit(1);
        }
      }

      const targetPath = path.resolve(process.cwd(), targetDir);

      // 2. Determine the templates to use
      let selectedTemplates = options.template || []; // Get templates from CLI option (will be an array)

      if (selectedTemplates.length > 0) {
        // Validate CLI template options
        const invalidTemplates = selectedTemplates.filter(
          (t) => !availableTemplates.includes(t)
        );
        if (invalidTemplates.length > 0) {
          console.error(
            chalk.red(
              `Error: Invalid template(s) specified: ${invalidTemplates.join(
                ", "
              )}`
            )
          );
          console.log(
            chalk.yellow(
              `Available templates: ${availableTemplates.join(", ")}`
            )
          );
          process.exit(1);
        }
        console.log(
          chalk.blue(
            `Using specified templates: ${selectedTemplates.join(", ")}`
          )
        );
      } else {
        // Prompt user to select multiple templates if none specified via CLI
        const templateResponse = await prompts({
          type: "multiselect", // Use multiselect
          name: "templates",
          message:
            "Choose template(s) (use spacebar to select, enter to confirm):",
          choices: availableTemplates.map((t) => ({ title: t, value: t })),
          hint: "- Space to select. Return to submit",
          instructions: false, // Hide default instructions if hint is enough
        });

        selectedTemplates = templateResponse.templates; // This will be an array
        if (!selectedTemplates || selectedTemplates.length === 0) {
          console.log(chalk.red("Template selection is required. Aborting."));
          process.exit(1);
        }
      }

      console.log(chalk.blue(`\nScaffolding project in: ${targetPath}`));
      console.log(
        chalk.blue(
          `Using templates: ${chalk.green(selectedTemplates.join(", "))}\n`
        )
      );

      // 3. Check if target directory exists and isn't empty
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
          console.log(
            chalk.yellow(`Overwriting existing directory: ${targetPath}`)
          );
          await fs.emptyDir(targetPath);
        }
      } else {
        await fs.ensureDir(targetPath);
      }

      // --- 4. Copy template files (Iterative Copy) ---
      console.log(chalk.cyan("Copying template files..."));
      if (selectedTemplates.length > 1) {
        console.log(
          chalk.yellow(
            "Warning: Multiple templates selected. Files from later templates will overwrite files from earlier ones if they have the same name."
          )
        );
      }

      for (const templateName of selectedTemplates) {
        const templatePath = path.join(templatesDir, templateName);
        if (!fs.existsSync(templatePath)) {
          // Should have been caught by validation earlier, but double-check
          console.warn(
            chalk.yellow(
              `Warning: Template directory not found at ${templatePath}. Skipping.`
            )
          );
          continue;
        }
        console.log(chalk.cyan(` -> Copying from template: ${templateName}`));
        try {
          // Use overwrite: true to ensure later templates replace files
          await fs.copy(templatePath, targetPath, {
            overwrite: true,
            errorOnExist: false,
          });
        } catch (copyError) {
          console.error(
            chalk.red(`Error copying files from template "${templateName}":`),
            copyError
          );
          // Decide if you want to abort or continue
          console.log(chalk.red("Aborting due to copy error."));
          process.exit(1);
        }
      }

      // --- 5. Update final package.json ---
      const newPackageJsonPath = path.join(targetPath, "package.json");
      if (fs.existsSync(newPackageJsonPath)) {
        console.log(chalk.cyan("Updating final project package.json..."));
        try {
          const packageJson = await fs.readJson(newPackageJsonPath);
          packageJson.name = path.basename(targetPath);

          // Add a note if multiple templates were used, as package.json might have been overwritten
          if (selectedTemplates.length > 1) {
            packageJson.description = `${
              packageJson.description || ""
            } (Generated using templates: ${selectedTemplates.join(", ")})`;
            console.log(
              chalk.yellow(
                "Note: package.json might have been overwritten by the last template containing it. Review dependencies and scripts."
              )
            );
          }

          await fs.writeJson(newPackageJsonPath, packageJson, { spaces: 2 });
        } catch (err) {
          console.warn(
            chalk.yellow(
              `Warning: Could not read or update package.json: ${err.message}`
            )
          );
        }
      } else {
        console.log(
          chalk.yellow("No package.json found in the final project structure.")
        );
      }

      // --- 6. Install dependencies ---
      if (fs.existsSync(newPackageJsonPath)) {
        // Only install if package.json exists
        console.log(
          chalk.cyan("\nInstalling dependencies (this might take a moment)...")
        );
        process.chdir(targetPath);
        try {
          execSync("npm install", { stdio: "inherit" });
        } catch (error) {
          console.error(
            chalk.red("\nFailed to install dependencies:"),
            error.message
          );
          console.log(
            chalk.yellow(
              `\nPlease try running "npm install" manually inside the ${targetDir} directory.`
            )
          );
        }
      } else {
        console.log(
          chalk.yellow(
            "\nSkipping dependency installation because no package.json was found."
          )
        );
      }

      // --- 7. Success Message ---
      console.log(chalk.green("\n✨ Project scaffolded successfully! ✨"));
      console.log(chalk.cyan("\nNext steps:"));
      console.log(chalk.gray(`  cd ${targetDir}`));
      if (fs.existsSync(newPackageJsonPath)) {
        console.log(
          chalk.gray(`  npm run dev   # or npm start, check package.json`)
        );
      }
      console.log(chalk.cyan("\nHappy coding!"));
    } catch (error) {
      console.error(
        chalk.red("\nAn error occurred during scaffolding:"),
        error
      );
      process.exit(1);
    }
  });

program.parse(process.argv);
