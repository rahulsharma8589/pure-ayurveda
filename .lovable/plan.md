# Add Dark / Light Mode Toggle

## Goal
Let visitors switch the whole website between light mode (current warm cream look) and dark mode (deep green night look), with their choice remembered between visits.

## Good news
The project is already theme-ready:
- `src/index.css` defines a complete `.dark` color palette (deep greens, dark browns) alongside the light palette.
- Tailwind is configured with `darkMode: ["class"]`, and all components use semantic color tokens (`bg-primary`, `text-foreground`, etc.) — including the hero section — so everything adapts automatically once a `dark` class is set.

## What will change

1. **New file `src/context/ThemeContext.tsx`**
   - Provides `theme` ("light" | "dark") and `toggleTheme()`.
   - On load: reads saved choice from localStorage; if none, falls back to the visitor's device (system) preference.
   - Applies/removes the `dark` class on `<html>` and saves the choice to localStorage.

2. **New component `src/components/ThemeToggle.tsx`**
   - Small circular button showing a Sun icon in dark mode and Moon icon in light mode, styled like the existing search/profile header buttons.

3. **`src/App.tsx`** — wrap the app in `ThemeProvider` (next to `CartProvider`).

4. **`src/components/layout/Header.tsx`** — add the toggle button in the desktop header (next to search/cart/profile icons) and in the mobile menu row.

## Technical details
- No new libraries needed — plain React context + a single class on `<html>`.
- localStorage key: `theme`. Respects `prefers-color-scheme` on first visit.
- No database or backend changes.

## What stays the same
- All pages, layouts, colors, and content — nothing visual changes unless the user clicks the toggle.
