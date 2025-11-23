# Spotify Developer Portfolio - Design Guidelines

## Design Approach
**Reference-Based Design**: Exact visual replica of Spotify Desktop Application (Dark Mode). Every visual element, spacing, and interaction should mirror Spotify's interface precisely.

## Color System
- **Background Primary**: #121212 (main content area)
- **Background Secondary**: #000000 (sidebar, player bar)
- **Surface Default**: #181818 (cards, containers)
- **Surface Hover**: #282828 (interactive elements on hover)
- **Accent Primary**: #1ED760 (Spotify green - CTAs, play buttons, highlights)
- **Text Primary**: #FFFFFF (headings, primary content)
- **Text Secondary**: #B3B3B3 (subtext, metadata, secondary information)

## Typography
- **Font Family**: Sans-serif (Inter or system equivalent)
- **Hierarchy**: Bold headings with crisp distinction, regular body text
- **Style**: Clean, modern, highly legible against dark backgrounds

## Layout Structure

### Fixed Sidebar (Left, 280px width)
- Navigation items: Home, Search, Library
- "Connect" section at bottom with GitHub/LinkedIn styled as playlist items
- Background: #000000

### Fixed Player Bar (Bottom, 90px height)
- Left: "Available for Work" status indicator
- Center: Play/Pause controls
- Right: Volume slider
- Background: #000000

### Main Content Area (Scrollable)
- Scrolls independently while sidebar and player remain fixed
- Custom thin dark grey scrollbar matching Spotify aesthetic

### Sticky Header
- Transparent initially, transitions to #070707 on scroll
- Remains at top of main content area during scrolling

## Content Sections

### Hero Section (Artist Profile)
- Large gradient background header
- Circular profile picture (rounded-full)
- Name with verified badge (blue checkmark)
- "Monthly listeners" displaying role/title
- High visual impact, full-width treatment

### Popular Section (Skills as Top Tracks)
- Table format with columns:
  - Index number (#)
  - Skill name (track title)
  - Proficiency level (play count)
  - Experience duration (years)
- Rows with subtle hover state (#282828)

### Discography Section (Projects as Albums)
- Responsive grid layout
- Square album covers with gradient or project imagery
- Project title and tech stack/year as subtitle
- **Critical Interaction**: Green circular play button floats up from bottom-right corner on hover
- Hover effect: Card elevates slightly, play button appears

### About Section (Artist Bio)
- Large card format
- Professional summary and education
- Generous padding, readable text layout

## Component Specifications

### Cards/Containers
- Default background: #181818
- Hover state: #282828
- Rounded corners consistent with Spotify aesthetic
- Subtle shadows for depth

### Buttons
- Primary: #1ED760 background with bold contrast
- Play buttons: Circular, green, with play icon
- Hover: Slight scale increase (1.05)

### Images
- Profile: Circular with clean edge
- Album covers: Perfect squares, aspect ratio 1:1
- All images should have smooth loading states

## Interactions & Animations

### Hover Effects
- Cards: Background color shift to #282828 + subtle elevation
- Album covers: Play button fade-in with slide-up animation
- Navigation items: Brightness increase

### Scroll Behavior
- Sticky header opacity/background transition
- Smooth scrolling in main content area
- Scrollbar always visible but minimal

### Framer Motion Usage
- Subtle scale animations on interactive elements
- Smooth transitions between states
- Page load fade-ins for content sections

## Spacing System
Use Spotify's generous spacing:
- Section padding: py-8 to py-12
- Card gaps: gap-4 to gap-6
- Content margins: Consistent 24-32px gutters

## Images
No hero image needed - the artist profile section uses a gradient background with overlay elements (profile picture, badges, text) creating the visual impact. Album covers in the Discography section should use project-specific imagery or gradients.