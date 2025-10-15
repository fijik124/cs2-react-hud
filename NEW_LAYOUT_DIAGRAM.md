# BLAST Match Bar - NEW Layout Structure

## Updated Visual Structure (Completely Reversed)

```
┌═══════════════════════════════════════════════════════════════════════════════════┐
│                              BLAST MATCH BAR (NEW LAYOUT)                          │
├───┬───┬────┬───┬────┬───┬──────────────┬───┬────┬───────────┬───┬────┬───┬───┬───┤
│ | │ 8 │ | │ L  │ | │  TEAM NAME   │ | │■■■○│       │     16/24     │■■■○│ | │  TEAM NAME   │ | │  L │ | │ 7 │ | │
│ | │   │ | │  O │ | │   or BOMB    │ | │    │       │               │    │ | │   or BOMB    │ | │  O │ | │   │ | │
│ | │   │ | │  G │ | │  PROGRESS    │ | │    │       │     1:25      │    │ | │  PROGRESS    │ | │  G │ | │   │ | │
│ | │   │ | │  O │ | │              │ | │    │       │               │    │ | │              │ | │  O │ | │   │ | │
│ | │   │ | │    │ | │              │ | │    │       │               │    │ | │              │ | │    │ | │   │ | │
├───┴───┴────┴───┴────┴───┴──────────────┴───┴────┴───────────┴───┴────┴───┴────┴───┴───┴───┤
│ 2  50  2   70  2    280         2   80        140        80   2    280        2  70  2  50  2│
└═══════════════════════════════════════════════════════════════════════════════════┘
```

## NEW Section Order (Left to Right)

### Left Team Section
1. **Separator** (2px)
2. **Round Score** (50px) - "8" - Next to timer!
3. **Separator** (2px)
4. **Team Logo** (70px) - 40x40 centered
5. **Separator** (2px)
6. **Team Name/Bomb** (280px) - Shows name or bomb progress
7. **Separator** (2px)
8. **Series Wins** (80px) - Colored squares: ■■■○ (3 max)
9. **Team Color Border** (15px) - Solid color at the END

### Center Section (140px)
1. **Round Counter** (Top) - "16/24"
2. **Separator Line**
3. **Round Timer** (Bottom) - "1:25"

### Right Team Section (Mirrored)
1. **Team Color Border** (15px) - Solid color at the START
2. **Series Wins** (80px) - Colored squares: ■■■○
3. **Separator** (2px)
4. **Team Name/Bomb** (280px) - Shows name or bomb progress
5. **Separator** (2px)
6. **Team Logo** (70px) - 40x40 centered
7. **Separator** (2px)
8. **Round Score** (50px) - "7" - Next to timer!
9. **Separator** (2px)

## Series Wins Visualization

### Empty Square (Not Won)
```
┌────┐
│    │  ← Border in team color, transparent fill
└────┘
```

### Filled Square (Won)
```
┌────┐
│████│  ← Filled with team color
└────┘
```

### Example: Team with 2 wins out of 3
```
■ ■ ○
```
(2 filled squares, 1 empty square)

### Best of 3 (BO3)
```
■ ■ ○  ← Team leading 2-0
○ ○ ○  ← Other team 0-2
```

### Best of 5 (BO5)
```
■ ■ ○  ← Team leading 2-1
■ ○ ○  ← Other team 1-2
```

## Complete Layout Flow

```
LEFT SIDE (from center outward):
Timer ← Score ← Logo ← Name ← Squares ← Color Border

RIGHT SIDE (from center outward):
Timer → Score → Logo → Name → Squares → Color Border
```

## Key Changes from Original

| Element | Old Position | New Position |
|---------|-------------|--------------|
| **Round Score** | Far from timer | **Next to timer** ✓ |
| **Team Logo** | After team name | **After score** ✓ |
| **Team Name** | Before logo | **After logo** ✓ |
| **Series Wins** | Numbers (e.g., "1") | **Colored squares (■■■○)** ✓ |
| **Color Border** | At the start | **At the end** ✓ |

## Dimensions

| Section | Width | Description |
|---------|-------|-------------|
| Separator | 2px | Vertical line |
| Round Score | 50px | Current round wins (e.g., "8") |
| Team Logo | 70px | Container for 40x40 logo |
| Team Name | 280px | Team name or bomb progress |
| Series Wins | 80px | 3 squares with gaps (18px each) |
| Color Border | 15px | Solid team color stripe |
| Center Timer | 140px | Round counter + timer |

**Total Width per Side**: ~497px  
**Total Match Bar Width**: ~1134px (with center)

## Animation States

### Normal State
```
| 8 | Logo | TEAM NAME | ■■■○ |███|
```

### Team Names Hidden (Alt+N)
```
| 8 | Logo |           | ■■■○ |███|
```

### Bomb Active (Planting/Defusing)
```
| 8 | Logo | [████ 60%] | ■■■○ |███|
          ← Progress bar wipes from logo →
```

## Color Coding

- **CT Team**: Blue (#28abff)
  - Border: Blue stripe
  - Squares: Blue border and fill
- **T Team**: Yellow (#ffc600)
  - Border: Yellow stripe
  - Squares: Yellow border and fill

## Responsive Behavior

- All widths are fixed for consistency
- Squares scale proportionally
- Bomb progress bar fills the team name container
- Logo remains stationary (40x40) at all times
