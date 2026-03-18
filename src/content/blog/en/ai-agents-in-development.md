---
title: "AI Agents in Development: Building Your AI Team"
date: 2026-03-18
excerpt: "Agents are not just faster chatbots. They are a fundamentally different way of working — closer to delegating to a team member than asking a question. Here's how to use them properly."
tags: ["AI", "Agents", "Productivity", "Developer Tools"]
draft: false
---

In a [previous post](/blog/ai-driven-development) we established the landscape: models, editors, tools, and the mindset of the developer as copilot. That post was about *what exists*. This one is about what happens when you push that paradigm further — when the AI stops being a suggestion engine and starts being something closer to a collaborator.

That shift has a name: agents.

## What Is an Agent

The word gets thrown around loosely. Let's be precise.

A **standard AI interaction** is a single round-trip: you send a message with some context, the model responds, the exchange ends. The model has no memory of the conversation beyond what you've included, no ability to take actions, and no way to verify whether its answer was correct. It's a very sophisticated autocomplete.

An **agent** is a loop. It receives a goal, reasons about what steps are needed to achieve it, executes those steps using available tools, observes the results, and decides what to do next — repeating until the goal is met or it determines it cannot proceed. The key word is *loop*: the agent acts, observes, and adapts.

Concretely, an agent has four components:

- **A model** — the reasoning engine that decides what to do at each step
- **Tools** — capabilities it can invoke: read a file, write a file, run a terminal command, search the web, call an API
- **Memory** — the accumulated context of what it has done and observed so far in the current task
- **A termination condition** — either the goal is achieved, the agent hits a dead end, or a human intervenes

The agent doesn't just answer the question "how do I fix this bug?" — it reads the failing test, finds the relevant code, writes the fix, runs the test, sees if it passes, and iterates if it doesn't. That's a categorically different thing.

## The Real Difference from Chat

The distinction isn't just about power. It's about the shape of the work.

When you use a chat or inline tool, **you are the execution layer**. The AI thinks, you act. You copy the suggestion, paste it, run the command, observe the result, paste the result back, ask a follow-up. Every step requires your attention and your hands. The AI's output is always advisory.

When you use an agent, **the agent is the execution layer**. You define the goal, the agent acts. It writes the files, runs the commands, reads the output, decides what to do next. Your role shifts from operator to supervisor: you define the task, review the plan, approve or redirect, and evaluate the result.

This has profound implications for the type of work you delegate:

| | Chat / Inline | Agent |
|---|---|---|
| Input | Question or short prompt | Goal or task description |
| Output | A suggestion you apply | Changes already applied |
| Iteration | You drive each step | Agent drives, you review |
| Scope | Single file, single function | Multi-file, multi-step |
| Best for | Quick, isolated changes | Complex, sequential tasks |

The practical consequence: agents are not a better version of chat. They are a different tool for different work. Using an agent to generate a one-liner is wasteful. Using chat to refactor a module across twelve files is painful. Match the tool to the task.

## Where Agents Live and Where They Act

This is less obvious than it sounds, and understanding it changes how you think about what an agent can do.

**Agents execute on the machine that runs the tool — but they reason remotely.** Claude Code runs in your terminal, on your machine, with access to your file system, your environment variables, your local git history, and any command your shell can run. The execution is local. The reasoning is not.

Every time the agent decides what to do next, it sends the accumulated context — files it has read, terminal output, task history — to the model provider's servers. The model processes that context and returns the next action. Then the tool executes that action locally, observes the result, and sends everything back again. It's a constant loop: local execution → remote reasoning → local execution.

This has practical implications worth being aware of:
- **You need a network connection** for the agent to function — the model is never running on your machine.
- **Your code leaves your machine** on every reasoning step. The content of the files the agent reads is sent to the model provider. For teams with sensitive codebases or strict data residency requirements, this matters — check your provider's data handling policies.
- **Latency compounds.** Each step in the loop includes a network round-trip to the model. Long agentic tasks can take significantly more wall-clock time than their complexity would suggest.

This means a local agent can:
- Read and write any file in your project
- Execute shell commands (run tests, build, start servers, call CLIs)
- Interact with your version control system
- Access local environment variables and credentials
- Call external APIs your machine has access to

Cloud-based agents (like Copilot Workspace or Antigravity's cloud agents) operate differently: they typically work on a remote clone of your repository, have access to browser automation, and may run in sandboxed environments. More isolated, but more scalable — useful for tasks you want to run asynchronously without tying up your machine.

The practical difference: **local agents act directly on your working state**; **cloud agents act on a copy and propose changes for you to review and merge**.

## Who Orchestrates: Model or Tool?

A question worth answering clearly, because it affects how you think about agent behavior.

In most agentic systems, **the model does the reasoning and the tool provides the execution environment**. The model decides what to do at each step — which file to read, which command to run, how to interpret the output. The tool (Claude Code, Cursor, Antigravity) provides the infrastructure: the file system access, the terminal, the browser, the permission layer.

But orchestration — the decision of *what step comes next* — lives mostly in the model. When Claude Code decides to run the failing test before attempting a fix, that's the model reasoning about strategy, not the tool prescribing a workflow.

Some tools add an explicit orchestration layer on top:

- **Antigravity's Agent Manager** lets you define multiple agents with separate tasks and models, then manages their parallel execution, dependencies, and artifact handoffs. The *tool* coordinates; each individual *model* reasons within its assigned scope.
- **Multi-agent frameworks** (like Claude's multi-agent API features) allow one model instance to spawn and direct other model instances, creating hierarchies where a "manager" agent decomposes a goal and delegates subtasks.

The nuance: in single-agent systems, the model orchestrates itself. In multi-agent systems, either the tool or a designated orchestrator model coordinates the others. Knowing which is which helps you debug unexpected behavior — if an agent is making poor strategic decisions, you adjust the prompt or model; if the coordination between agents is breaking down, you look at the orchestration layer.

## The Tools That Enable Agents

Not every AI tool is agentic. Here's where agents actually live:

**Claude Code** is the purest example of a local agentic tool. It operates at repository level, has full file system and terminal access, and is designed explicitly for multi-step autonomous tasks. You give it a goal; it works until done or blocked.

**GitHub Copilot Agent Mode** (available in VS Code) extends Copilot from inline suggestions to autonomous task execution. It can read multiple files, run terminal commands, and iterate on its output. Less autonomous than Claude Code by default, but deeply integrated into the VS Code workflow.

**Cursor Composer** is Cursor's multi-file agent mode. It indexes your codebase and can make coordinated changes across many files in a single operation. More constrained than Claude Code — it doesn't run arbitrary shell commands by default — but the codebase awareness is excellent.

**Antigravity Agent Manager** is the most explicit multi-agent interface available in an editor. You spawn named agents, assign them models and tasks, they work in parallel, and produce reviewable artifacts at each step. Designed explicitly for delegation at scale.

**Custom agents via API** — Anthropic, OpenAI, and Google all expose APIs that let you build agents programmatically: define the tools, the system prompt, the loop logic. This is where teams build domain-specific agents tailored to their stack, conventions, and workflows.

## Agents as a Development Team

This is where the methodology matters.

The instinct when you first use an agent is to give it everything and ask for everything. "Refactor this entire codebase to use the new API." That instinct is wrong — not because agents can't handle large tasks, but because *you can't review large outputs effectively*, and agents make mistakes that compound when unchecked.

The better mental model: **treat agents like you would junior developers on a team**. You wouldn't hand a junior engineer a vague ten-day task and walk away. You'd break it down, assign specific pieces, review at checkpoints, and course-correct early.

Apply the same discipline:

**Decompose before delegating.** Before spinning up an agent, spend five minutes breaking the task into discrete, verifiable steps. "Migrate the auth module to the new token format" becomes: (1) identify all call sites of the old format, (2) update the token generation logic, (3) update the validation logic, (4) update the tests. Four focused agent tasks, each reviewable, rather than one opaque one.

**One agent, one concern.** An agent that is also asked to refactor the database layer while updating the API while fixing the tests will make cross-cutting decisions you didn't sanction. Keep scope tight. If you need work done in parallel on independent parts of the codebase, use multiple agents — not one agent with a sprawling brief.

**Define done.** Tell the agent what success looks like: "the tests should pass," "the TypeScript compiler should produce zero errors," "the endpoint should return X given input Y." Agents with a concrete acceptance condition know when to stop; agents without one tend to over-engineer or loop indefinitely.

## Giving Agents Context and Scoping Their Work

An agent is only as good as the context you give it. This is where most people underinvest.

**Project-level context files.** Tools like Claude Code read a `CLAUDE.md` file at the root of your repository. Put your architecture overview, naming conventions, test patterns, and off-limits areas there. The agent reads it before every session. Cursor's `/rules` system works the same way. This is the equivalent of your team's engineering handbook — write it once, every agent session benefits.

**Scoped file access.** Don't let an agent roam freely if the task doesn't require it. Specify which directories or files are in scope. "Only modify files under `src/auth/`" prevents the agent from making well-intentioned changes elsewhere that break unrelated things.

**Explicit constraints.** Tell the agent what *not* to do. "Do not change the public API surface," "do not install new dependencies," "do not modify migration files." Agents are eager — without constraints, they will often do more than you asked, and more is not always better.

**MCP (Model Context Protocol).** A growing standard that lets agents connect to external data sources — your database schema, your API documentation, your internal wiki, your issue tracker. Instead of pasting context into the prompt, you configure an MCP server and the agent pulls relevant information on demand. Claude Code, Cursor, and Antigravity all support MCP. For teams, this is the highest-leverage investment in agent quality: structured, always-current context instead of manually maintained prompt preambles.

## Agent-to-Agent Interaction

Single agents are powerful. Multi-agent systems are where things get genuinely interesting — and genuinely complex.

The basic pattern is **orchestrator + workers**: one agent receives the high-level goal, decomposes it into subtasks, and delegates each subtask to a specialized worker agent. The orchestrator collects results, checks for conflicts, and assembles the final output.

A few patterns that appear repeatedly in practice:

**Sequential pipeline.** Agent A produces output; Agent B takes that output as input. Example: a research agent reads documentation and produces a structured summary, then a coding agent uses that summary to implement the integration. No parallel execution, but clear handoffs.

**Parallel specialization.** Multiple agents work simultaneously on independent parts of the same task. Example: three agents each tackle a different module in a codebase refactor, then a review agent checks for consistency across their outputs before anything is merged.

**Critic pattern.** One agent produces an output; a second agent is tasked specifically with finding problems in it. The critic's output feeds back to the first agent for revision. This is a programmable code review loop — useful for catching issues before they reach a human reviewer.

**Specialist roles.** Rather than one agent that does everything, you maintain a roster: a "researcher" agent with browser access and no write permissions, a "coder" agent with file write access but no browser, a "tester" agent that only runs commands and reads output. Each agent has a system prompt and tool set matched to its role. You route tasks to the right specialist.

The failure mode in multi-agent systems is cascading errors: Agent A produces a subtle mistake, Agent B builds on it, Agent C builds on Agent B's output, and by the time you review, the error is deeply embedded. The mitigation is **reviewable artifacts at each handoff** — don't let agents pass raw outputs to each other without a human checkpoint at meaningful boundaries.

## Practical Examples

**Example 1: Autonomous bug fix.**
You have a failing CI pipeline. You open Claude Code and say: "The test `auth.spec.ts:47` is failing. Find the root cause, fix it, confirm the test passes, and verify no other tests broke." The agent reads the test, traces the failure to a race condition in the token refresh logic, writes the fix, runs the test suite, confirms the fix, and reports back. You review the diff. Total human time: reading the output and approving.

**Example 2: API integration with a pipeline.**
You need to integrate a third-party payment API. You set up two agents in Antigravity: Agent 1 (researcher, Gemini 2.5 Pro, browser access) reads the API documentation and produces a structured integration spec. Agent 2 (coder, Claude Sonnet, file write access) takes the spec and implements the client, the error handling, and the tests. You review Agent 1's spec before Agent 2 starts — catching misunderstandings early, before they become code.

**Example 3: Codebase-wide refactor.**
You're migrating from a deprecated internal library to its replacement. You run Claude Code with: "Find every import of `@internal/old-lib`, understand how each usage works, and replace it with the equivalent from `@internal/new-lib`. Don't change behavior, only the import surface. Run the tests after each file to confirm." The agent works file by file, running tests between each change. You get a commit per file, each independently reviewable.

**Example 4: Living documentation.**
You set up a documentation agent that runs on a schedule (or triggered by CI): it reads the current codebase, compares it against the existing documentation, identifies gaps or outdated sections, and opens a PR with proposed updates. No human writes the documentation draft — a human reviews and approves. The agent is scoped to read access only; it cannot modify source code.

**Example 5: Specialized code reviewer.**
Before opening a PR, you run a review agent: "Read the diff in the current branch against main. Identify potential bugs, missing edge cases, and violations of the patterns defined in CLAUDE.md. Do not suggest style changes — focus only on correctness and consistency." The agent produces a structured review. You address its findings before the code reaches a human reviewer. Your PR quality goes up; your teammates' review time goes down.

## The Mindset Shift

Working effectively with agents requires unlearning some habits from the chat era.

You stop thinking in prompts and start thinking in tasks. You stop expecting immediate output and start expecting asynchronous results you review. You stop being the execution layer and start being the architecture layer — the one who decides what gets built, in what order, with what constraints, and whether the result is acceptable.

The discipline is in the scoping. Agents are powerful enough that a poorly scoped task causes real damage — files overwritten, logic changed in ways you didn't intend, dependencies added without review. The developers who get the most out of agents are the ones who invest in the brief: clear goals, explicit constraints, defined acceptance criteria, and reviewable checkpoints.

It's not a different skill from good engineering. It's the same skill, applied one level up.
