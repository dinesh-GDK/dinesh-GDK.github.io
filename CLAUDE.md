# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal blog hosted on GitHub Pages. The site focuses on technical posts about deep learning, computer vision, and algorithmic solutions. The blog uses the Minima theme with custom styling and includes Google Analytics integration.

## Architecture

### Jekyll Structure
- **Posts**: Located in `_posts/` with markdown files using YYYY-MM-DD-title format
- **Layouts**: HTML templates in `_layouts/` (default, home, page, post)
- **Includes**: Reusable components in `_includes/` (header, footer, analytics, social icons)
- **Sass**: Styling in `_sass/minima/` with main entry point at `assets/main.scss`
- **Images**: Blog post images stored in `_img/` with subdirectories for each post
- **Config**: Site configuration in `_config.yml`

### Key Features
- KaTeX plugin for mathematical equations in posts
- Google Analytics integration (G-4D8BGE23PT)
- Social media links (Twitter, GitHub)
- RSS feed support
- Custom 404 page
- Dark/Light theme toggle with localStorage persistence

## Development Commands

### Local Development
```bash
# Install dependencies
bundle install

# Start local development server
bundle exec jekyll serve

# Build site for production
bundle exec jekyll build
```

### Content Creation
- Blog posts go in `_posts/` with front matter including layout, title, date, and categories
- Images for posts should be organized in `_img/post-name/` subdirectories
- Use KaTeX syntax for mathematical expressions (enabled via jekyll-katex plugin)

## Site Configuration

### Important Config Values
- Title: "Dinesh's blog"
- Theme: Minima
- Plugins: jekyll-feed, jekyll-katex
- Social: Twitter (@dineshkumar_GDK), GitHub (dinesh-GDK)

### Theme System
The site includes a dark/light theme toggle system:
- CSS custom properties in `_sass/minima.scss` define theme colors
- Theme toggle button in header with sun/moon icons
- JavaScript in `assets/theme-toggle.js` handles switching and persistence
- Respects system color scheme preference by default
- User choice persisted in localStorage

### Deployment
This site is designed for GitHub Pages deployment. The main branch contains the source code, and GitHub Pages automatically builds and deploys the site using Jekyll.