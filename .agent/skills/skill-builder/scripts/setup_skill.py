import os
import argparse
import sys

def main():
    parser = argparse.ArgumentParser(description="Scaffold a new Antigravity skill.")
    parser.add_argument("--name", required=True, help="Name of the skill (e.g., 'my-awesome-skill')")
    parser.add_argument("--description", required=True, help="Description of the skill")
    parser.add_argument("--global_skill", action="store_true", default=True, help="Create as a global skill (default)")
    parser.add_argument("--workspace_skill", action="store_true", help="Create as a workspace skill")

    args = parser.parse_args()

    skill_name = args.name.lower().replace(" ", "-")
    
    if args.workspace_skill:
        # Assuming we are in a workspace where .agent/skills/ is appropriate
        base_path = os.path.abspath(".agent/skills")
    else:
        base_path = os.path.expanduser("~/.gemini/antigravity/skills")

    skill_path = os.path.join(base_path, skill_name)

    if os.path.exists(skill_path):
        print(f"Error: Skill folder '{skill_path}' already exists.")
        sys.exit(1)

    # Create directories
    os.makedirs(os.path.join(skill_path, "scripts"), exist_ok=True)
    os.makedirs(os.path.join(skill_path, "examples"), exist_ok=True)
    os.makedirs(os.path.join(skill_path, "resources"), exist_ok=True)

    # Create SKILL.md
    skill_md_content = f"""---
name: {skill_name}
description: {args.description}
---

# {skill_name.replace('-', ' ').title()}

## Overview
Describe what this skill does and when to use it.

## Instructions
1. Step one...
2. Step two...

## Helper Scripts
- `scripts/...`: Describe scripts here.

## Examples
- `examples/...`: Describe examples here.
"""

    with open(os.path.join(skill_path, "SKILL.md"), "w") as f:
        f.write(skill_md_content)

    print(f"Successfully created skill '{skill_name}' at '{skill_path}'")

if __name__ == "__main__":
    main()
