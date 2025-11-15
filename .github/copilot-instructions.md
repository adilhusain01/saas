

## Project Features to Include
- **SEO**: Entire blog structure, all meta tags for Google ranking, OpenGraph tags for social media sharing, automated sitemap generation, structured data markup for Rich Snippets, SEO-optimized UI components.
- **Mails**: Send transactional emails, DNS setup (DKIM, DMARC, SPF in subdomain) to avoid spam, webhook to receive & forward emails.
- **Automatic Dark Mode**: Implement automatic dark mode toggle.
- **Payments**: Create checkout sessions, handle webhooks to update user's account for subscriptions and one-time payments.

- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [x] Clarify Project Requirements
	Project requirements specified: Full-stack SaaS template with Next.js frontend (client), Node.js backend (server), payments (Dodo Payments), mail (Mailgun), auth (NextAuth.js with Google), database (Supabase), styling (Tailwind, DaisyUI), additional packages (Zustand, Framer Motion, Lucide React, TanStack), and features like SEO, mails, dark mode, payments webhooks.

- [x] Scaffold the Project
	Created Next.js client with TypeScript, Tailwind CSS, DaisyUI, and additional packages. Created Node.js server with Express, TypeScript, and initial dependencies for auth, database, mail, and payments.

- [x] Customize the Project
	Implemented all major features: NextAuth.js with Google OAuth and Supabase, Dodo Payments integration, Mailgun setup, SEO with sitemap and meta tags, automatic dark mode with next-themes, Zustand store, TanStack Query provider, DaisyUI styling, and basic blog structure.

- [x] Install Required Extensions
	No extensions required.

- [x] Compile the Project
	Both client and server compile successfully without errors.

- [x] Create and Run Task
	No specific task needed.

- [x] Launch the Project
	To launch, run `npm run dev` in client and server directories.

- [x] Ensure Documentation is Complete
	README.md and copilot-instructions.md exist and are up to date.

<!--
## Execution Guidelines
PROGRESS TRACKING:
- If any tools are available to manage the above todo list, use it to track progress through this checklist.
- After completing each step, mark it complete and add a summary.
- Read current todo list status before starting each new step.

COMMUNICATION RULES:
- Avoid verbose explanations or printing full command outputs.
- If a step is skipped, state that briefly (e.g. "No extensions needed").
- Do not explain project structure unless asked.
- Keep explanations concise and focused.

DEVELOPMENT RULES:
- Use '.' as the working directory unless user specifies otherwise.
- Avoid adding media or external links unless explicitly requested.
- Use placeholders only with a note that they should be replaced.
- Use VS Code API tool only for VS Code extension projects.
- Once the project is created, it is already opened in Visual Studio Code—do not suggest commands to open this project in vscode.
- If the project setup information has additional rules, follow them strictly.

FOLDER CREATION RULES:
- Always use the current directory as the project root.
- If you are running any terminal commands, use the '.' argument to ensure that the current working directory is used ALWAYS.
- Do not create a new folder unless the user explicitly requests it besides a .vscode folder for a tasks.json file.
- If any of the scaffolding commands mention that the folder name is not correct, let the user know to create a new folder with the correct name and then reopen it again in vscode.

EXTENSION INSTALLATION RULES:
- Only install extension specified by the get_project_setup_info tool. DO NOT INSTALL any other extensions.

PROJECT CONTENT RULES:
- If the user has not specified project details, assume they want a "Hello World" project as a starting point.
- Avoid adding links of any type (URLs, files, folders, etc.) or integrations that are not explicitly required.
- Avoid generating images, videos, or any other media files unless explicitly requested.
- If you need to use any media assets as placeholders, let the user know that these are placeholders and should be replaced with the actual assets later.
- Ensure all generated components serve a clear purpose within the user's requested workflow.
- If a feature is assumed but not confirmed, prompt the user for clarification before including it.
- If you are working on a VS Code extension, use the VS Code API tool with a query to find relevant VS Code API references and samples related to that query.

TASK COMPLETION RULES:
- Your task is complete when:
  - Project is successfully scaffolded and compiled without errors
  - copilot-instructions.md file in the .github directory exists in the project
  - README.md file exists and is up to date
  - User is provided with clear instructions to debug/launch the project

Before starting a new task in the above plan, update progress in the plan.
-->
- Work through each checklist item systematically.
- Keep communication concise and focused.
- Follow development best practices.