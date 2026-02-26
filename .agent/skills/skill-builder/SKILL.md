---
name: skill-builder
description: A skill to create other Antigravity skills. It automates directory creation and generates the mandatory SKILL.md file with boilerplate content.
---

# Skill Builder

This skill helps you create other skills systematically according to the Google Antigravity documentation.

## Usage

To create a new skill, run the `setup_skill.py` script provided in this skill's `scripts` directory.

### Command

```bash
python3 ~/.gemini/antigravity/skills/skill-builder/scripts/setup_skill.py --name "your-skill-name" --description "What your skill does"
```

### Options

- `--name`: The unique identifier for the skill (lowercase, hyphens for spaces).
- `--description`: A clear, specific description of the skill's purpose.
- `--global`: (Optional) Create the skill in the global skills directory (`~/.gemini/antigravity/skills/`). This is the default.
- `--workspace`: (Optional) Create the skill in the current workspace (`.agent/skills/`).

## Folder Structure Created

The script will create:
- `SKILL.md`: Pre-populated with name, description, and boilerplate.
- `scripts/`: For helper scripts.
- `examples/`: For reference implementations.
- `resources/`: For templates and assets.
