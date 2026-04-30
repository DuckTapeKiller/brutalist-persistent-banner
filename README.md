[![GitHub Repo stars](https://img.shields.io/github/stars/DuckTapeKiller/brutalist-persistent-banner?style=flat&logo=obsidian&color=%23c0392b)](https://github.com/DuckTapeKiller/brutalist-persistent-banner/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/DuckTapeKiller/brutalist-persistent-banner?logo=obsidian&color=%23c0392b)](https://github.com/DuckTapeKiller/brutalist-persistent-banner/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/DuckTapeKiller/brutalist-persistent-banner?logo=obsidian&color=%23c0392b)](https://github.com/DuckTapeKiller/brutalist-persistent-banner/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub manifest version](https://img.shields.io/github/manifest-json/v/DuckTapeKiller/brutalist-persistent-banner?logo=obsidian&color=%23c0392b)](https://github.com/DuckTapeKiller/brutalist-persistent-banner/blob/main/manifest.json)
[![Downloads](https://img.shields.io/github/downloads/DuckTapeKiller/brutalist-persistent-banner/total?logo=obsidian&color=%23c0392b)](https://github.com/DuckTapeKiller/brutalist-persistent-banner/releases)

# Persistent Banner

An ultra-minimalistic Obsidian plugin designed exclusively for the **[Brutalist Theme](https://github.com/DuckTapeKiller/Brutalist)**.

## What It Does

Keeps banner images visible while scrolling in long notes.

Without this plugin, Obsidian's content virtualization removes banner callouts from the DOM when you scroll down, causing the banner to disappear. This plugin clones the banner to a fixed position outside the virtualized container.

## Requirements

- **Brutalist Theme** (this plugin is built specifically for its dashboard/banner system)
- A note with `cssclass: dashboard` in frontmatter
- A banner callout: `> [!banner]` containing an image

## Installation

1. Download `main.js` and `manifest.json`
2. Create folder: `YourVault/.obsidian/plugins/persistent-banner/`
3. Place both files inside
4. Reload Obsidian
5. Enable in Settings → Community Plugins

## Usage

Just use banners as normal in your Brutalist dashboard notes:

```markdown
---
cssclass: dashboard
---

> [!banner]
> ![[your-banner-image.png]]

Rest of your note...
```

The plugin handles the rest automatically.

## Technical Details

~90 lines of plain JavaScript. No build step, no dependencies, no settings.

## License

MIT
