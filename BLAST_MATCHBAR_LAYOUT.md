# BLAST Match Bar - Component Layout Reference

## Visual Structure Diagram

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                         OBSERVER TOGGLE BUTTON                                      │
│                    [HIDE TEAM NAMES / SHOW TEAM NAMES]                             │
└────────────────────────────────────────────────────────────────────────────────────┘

┌═══════════════════════════════════════════════════════════════════════════════════┐
│                              BLAST MATCH BAR                                       │
├───┬──────────────┬────┬───┬───┬───┬───────────┬───┬───┬───┬────┬──────────────┬───┤
│ T │              │    │   │ 7 │ | │ 1 │       │     16/30     │       │ 1 │ | │ 8 │   │              │ T │
│ E │  TEAM NAME   │ L  │ | │   │ | │   │       │               │       │   │ | │   │ | │  L  │  TEAM NAME   │ E │
│ A │   or BOMB    │ O  │ | │ S │ | │ S │       │     1:25      │       │ S │ | │ S │ | │  O  │   or BOMB    │ A │
│ M │  PROGRESS    │ G  │ | │ E │ | │ C │       │               │       │ C │ | │ E │ | │  G  │  PROGRESS    │ M │
│   │              │ O  │ | │ R │ | │ O │       │               │       │ O │ | │ R │ | │  O  │              │   │
│ C │              │    │   │ I │ | │ R │       │               │       │ R │ | │ I │ | │    │              │ C │
│ O │              │    │   │ E │ | │ E │       │               │       │ E │ | │ E │ | │    │              │ O │
│ L │              │    │   │ S │ | │   │       │               │       │   │ | │ S │ | │    │              │ L │
│ O │              │    │   │   │ | │   │       │               │       │   │ | │   │ | │    │              │ O │
│ R │              │    │   │   │ | │   │       │               │       │   │ | │   │ | │    │              │ R │
├───┴──────────────┴────┴───┴───┴───┴───────────┴───────────────┴───────┴───┴───┴───┴────┴──────────────┴───┤
│  15px  280px     70px 2px 60px 2px 50px 2px       140px       2px 50px 2px 60px 2px 70px    280px     15px │
└═══════════════════════════════════════════════════════════════════════════════════┘
```

## Section Breakdown

### Left Team (Mirrored Order: Right to Left)
1. **Team Color Border** (15px) - Team's color indicator
2. **Team Name/Bomb Container** (280px) - Shows team name or bomb progress
3. **Team Logo** (70px) - Static 40x40 logo centered
4. **Separator** (2px)
5. **Series Wins** (60px) - Best-of series score (e.g., "1")
6. **Separator** (2px)
7. **Round Score** (50px) - Current map rounds won (e.g., "7")
8. **Separator** (2px)

### Center Section (140px)
1. **Round Counter** (Top) - "16/30"
2. **Separator Line**
3. **Round Timer** (Bottom) - "1:25"

### Right Team (Normal Order: Left to Right)
1. **Separator** (2px)
2. **Round Score** (50px)
3. **Separator** (2px)
4. **Series Wins** (60px)
5. **Separator** (2px)
6. **Team Logo** (70px)
7. **Team Name/Bomb Container** (280px)
8. **Team Color Border** (15px)

## Player Roster Layout

```
┌────────────────────────────────────┐  ┌────────────────────────────────────┐
│        NATUS VINCERE (#FFCC00)     │  │       TEAM VITALITY (#FF6600)      │
├────────────────────────────────────┤  ├────────────────────────────────────┤
│ [S] s1mple        15 / 10 / 3      │  │ [Z] ZywOo         18 / 9 / 2       │
│ [B] b1t           12 / 11 / 4      │  │ [A] apEX           9 / 13 / 7      │
│ [P] Perfecto      10 / 12 / 5      │  │ [M] Magisk        14 / 11 / 3      │
│ [E] electronic    13 / 9 / 2       │  │ [S] Spinx         11 / 12 / 4      │
│ [B] Boombl4       11 / 10 / 6      │  │ [F] flameZ        10 / 11 / 5      │
└────────────────────────────────────┘  └────────────────────────────────────┘
     K  /  D  /  A                            K  /  D  /  A
   (Green/Red/Blue)                        (Green/Red/Blue)
```

## Animation States

### State 1: Default (Team Names Visible)
```
┌───┬──────────────┬────┐
│###│ TEAM NAME    │LOGO│
└───┴──────────────┴────┘
```

### State 2: Bomb Active (Progress Bar Replaces Name)
```
┌───┬──────────────┬────┐
│###│██████ 💣 60% │LOGO│  (Bar grows from logo)
└───┴──────────────┴────┘
```

### State 3: Team Names Hidden (Observer Toggle)
```
┌───┬──────────────┬────┐
│###│              │LOGO│  (Empty space, only logo visible)
└───┴──────────────┴────┘
```

## Component Hierarchy

```
BlastMatchBar
├── observer-toggle-button
├── blast-matchbar
│   ├── TeamScoreSection (left)
│   │   ├── team-color-border
│   │   ├── team-name-container
│   │   │   ├── team-name
│   │   │   └── bomb-progress-container
│   │   │       ├── bomb-progress-bar
│   │   │       └── bomb-progress-label
│   │   ├── team-logo-box
│   │   ├── separator
│   │   ├── series-wins
│   │   ├── separator
│   │   ├── round-score
│   │   └── separator
│   ├── center-timer
│   │   ├── round-counter
│   │   └── round-timer
│   └── TeamScoreSection (right)
├── player-rosters
│   ├── roster-column (left)
│   │   ├── roster-header
│   │   └── roster-list
│   │       └── player-row × 5
│   └── roster-column (right)
│       ├── roster-header
│       └── roster-list
│           └── player-row × 5
└── blast-legend
```

## Color Indicators

| Element | Color | Purpose |
|---------|-------|---------|
| Team Color Border | Dynamic (team.color) | Team identification |
| Panel Background | #1a1a1a | Main surfaces |
| Container Background | #0a0a0a | Match bar background |
| Text Primary | #ffffff | Main text |
| Text Secondary | #999999 | Round counter, stats |
| Separators | #333333 | Visual dividers |
| Bomb Progress | #dc2626 → #ef4444 | Urgent action indicator |
| Stat Kills | #4ade80 (Green) | Positive stat |
| Stat Deaths | #f87171 (Red) | Negative stat |
| Stat Assists | #60a5fa (Blue) | Support stat |

## Responsive Behavior

- **Fixed Width**: Match bar has fixed total width for consistency
- **Centered**: Component centers horizontally on screen
- **Fixed Height**: 70px for match bar consistency
- **Overflow**: Hidden on team name container for clean animations

## Z-Index Layers

1. **Base Layer (z-index: 0)**: Background, borders, separators
2. **Content Layer (z-index: 1)**: Text, logos, scores
3. **Overlay Layer (z-index: 10)**: Bomb progress label

## Font Specifications

- **Font Family**: 'Courier New', Courier, monospace (BLAST competitive feel)
- **Font Weights**:
  - Regular: 400
  - Semibold: 600
  - Bold: 700 (primary use)
