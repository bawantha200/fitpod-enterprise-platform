/**
 * cafeTheme.js
 * ------------------------------------------------------------------
 * One place for the look of the cafe portal (black / white / lime,
 * taken from the group's draft website). Components import these
 * Tailwind class strings instead of repeating colours everywhere,
 * so changing the theme later means editing this file only.
 *
 * Colours used:
 *   page background  #0a0a0a      card background  #171717
 *   border           #303030      muted text       #a0a0a0
 *   accent (lime)    #b6ff00
 * ------------------------------------------------------------------
 */
export const cafeTheme = {
  // Page and surfaces
  page: 'min-h-screen bg-[#0a0a0a] text-white font-sans',
  card: 'rounded-2xl border border-[#303030] bg-[#171717]',

  // Text
  title: 'text-2xl font-bold tracking-tight text-white',
  muted: 'text-sm text-[#a0a0a0]',

  // Buttons
  buttonPrimary:
    'inline-flex items-center gap-2 rounded-lg bg-[#b6ff00] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#c8ff3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6ff00]',
  buttonGhost:
    'inline-flex items-center gap-2 rounded-lg border border-[#303030] px-4 py-2 text-sm font-medium text-white transition hover:border-[#b6ff00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6ff00]',

  // Sidebar links
  navLink:
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#a0a0a0] transition hover:bg-[#171717] hover:text-white',
  navLinkActive:
    'flex items-center gap-3 rounded-lg bg-[#b6ff00] px-3 py-2.5 text-sm font-semibold text-black',
};
