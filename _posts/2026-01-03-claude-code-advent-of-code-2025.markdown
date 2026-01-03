---
layout: post
title: "Using Claude Code using Advent of Code 2025"
date: 2026-01-02 10:00:00 -0700
categories: Claude Code, AI, Advent of Code - 2025
---

## Introduction

Let's be honest: with LLMs, the fun of Advent of Code is gone. You can paste any puzzle into ChatGPT or Claude and get a working solution in seconds. So I did it anyway, but to run a different experiment with [Advent of Code 2025](https://adventofcode.com/2025): what if I didn't write a single line of code? Instead, I gave [Claude Code](https://claude.ai/code) a single instruction file and let it solve the puzzles completely autonomously.

The result: **20 out of 22 challenges solved (91% success rate)** with zero human-written code.

<video src="https://github.com/user-attachments/assets/bbb2d8fa-72dc-4224-acbf-43486058dc24" controls="controls" style="max-width: 100%;">
</video>

## The Setup

I created a single file called [`INSTRUCTIONS.md`](https://github.com/dinesh-GDK/claude-code-advent-of-code-2025/blob/main/INSTRUCTIONS.md) with a 12-step process for each day:

1. Create a folder `./day_xx/`
2. Navigate to the Advent of Code puzzle page
3. Save the input to `./day_xx/input.txt`
4. Read Part 1, write strategy in `./day_xx/README.md`
5. Write `./day_xx/part1.py`
6. Test with examples
7. Run against actual input and submit
8. Write Part 2 strategy in README
9. Write `./day_xx/part2.py`
10. Test Part 2
11. Run Part 2
12. Submit Part 2 answer

Then I ran: `claude --chrome --dangerously-skip-permissions`

**Note:** The `--dangerously-skip-permissions` flag bypasses all safety checks. This is terrible for production use, but necessary for this experiment where the agent needed to navigate websites and submit answers autonomously.

## What Happened

Claude Code executed the entire workflow independently:

- Used Chrome integration to navigate Advent of Code
- Read puzzle descriptions on its own
- Developed solution strategies and documented them
- Wrote and tested Python code
- Submitted answers to the website
- Self-corrected when answers were wrong

**Zero lines of code written by me.** Just the instruction file.

## Results

**Completed:** Days 2-8 (both parts), Day 9 Part 1, Days 10-11 (both parts), Day 12 Part 1

**Failed:** Day 9 Part 2, Day 12 Part 2

**Total:** 20/22 challenges = 91% autonomous completion

The repository generated approximately **42 Python files** across days 2-12, each with full solution code, test files, and documented reasoning.

## Example: Day 2 Strategy

Here's how Claude Code documented its approach for Day 2 (from the auto-generated README):

**Part 1:** Detect product IDs where "any substring starting from position 0 appears immediately after itself" (exactly twice repetition).

**Part 2:** Expand to catch IDs where "the entire string can be formed by repeating that substring at least 2 times."

The agent independently reasoned through the problem, identified the algorithmic approach, and implemented it - all without human guidance beyond the instruction template.

## Limitations

Even with 91% success, the agent failed on 2 challenges. Looking at the failures:

- **Day 9 Part 2:** Complex disk defragmentation problem that likely needed algorithmic insight the agent couldn't generate
- **Day 12 Part 2:** Blocked by Day 9 Part 2's failure (dependency issue)

Some problems still require human algorithmic intuition and creative problem-solving. The agent excels at execution but can struggle with novel algorithmic insights.

## Conclusion

This wasn't about pair programming or AI assistance. This was about **autonomous execution** from start to finish.

The agent navigated websites, read natural language descriptions, formulated strategies, wrote code, debugged failures, and submitted results - all independently. The only human input was a procedural instruction file.

Are we ready for fully autonomous development? Not quite. That 9% failure rate matters, especially when complex algorithmic thinking is required. But 91% autonomous completion on varied programming challenges suggests we're closer than I expected.

The future isn't AI replacing developers. It's developers orchestrating autonomous agents - providing high-level direction while the agent handles execution, testing, and iteration.

As I watched Claude Code navigate Advent of Code independently, I realized: the question isn't "can AI code?" anymore. It's "what level of abstraction should humans work at when AI handles the implementation?"

---

Check out the [full repository](https://github.com/dinesh-GDK/claude-code-advent-of-code-2025) to see all the auto-generated code and conversation transcripts.
