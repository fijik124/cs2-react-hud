# BLAST Match Bar - FINAL Layout Structure

## Final Visual Structure

```
┌═══════════════════════════════════════════════════════════════════════════════════════════════┐
│                              BLAST MATCH BAR (FINAL LAYOUT)                                    │
├───┬───┬────┬───┬────┬───┬──────────────┬───┬────┬───────────┬────┬───────────┬────┬──────────────┬───┬────┬───┬───┬───┤
│ | │ 8 │ | │ L  │ | │  TEAM NAME   │███│■■■○│   16/24   │■■■○│███│  TEAM NAME   │ | │  L │ | │ 7 │ | │
│ | │   │ | │  O │ | │   or BOMB    │   │    │           │    │   │   or BOMB    │ | │  O │ | │   │ | │
│ | │   │ | │  G │ | │  PROGRESS    │   │    │   1:25    │    │   │  PROGRESS    │ | │  G │ | │   │ | │
│ | │   │ | │  O │ | │              │   │    │           │    │   │              │ | │  O │ | │   │ | │
├───┴───┴────┴───┴────┴───┴──────────────┴───┴────┴───────────┴────┴───────────┴────┴──────────────┴───┴────┴───┴───┴───┤
│ 2  50  2   70  2    280        15  80     140     80  15    280        2  70  2  50  2 │
└═══════════════════════════════════════════════════════════════════════════════════════════════┘
```

## Section Breakdown

### Left Side (Left to Right)
1. **Separator** (2px) - Thin vertical line
2. **Round Score** (50px) - "8" rounds won
3. **Separator** (2px)
4. **Team Logo** (70px) - 40x40 logo centered
5. **Separator** (2px)
6. **Team Name** (280px) - Shows team name or bomb progress
7. **Color Border** (15px) - Solid team color stripe

### Center Section
1. **Left Series Squares** (80px) - "■■■○" (3 filled, 1 empty)
2. **Round Counter + Timer** (140px)
   - Top: "16/24" (round counter)
   - Bottom: "1:25" (timer)
3. **Right Series Squares** (80px) - "■■■○"

### Right Side (Left to Right)
1. **Color Border** (15px) - Solid team color stripe
2. **Team Name** (280px) - Shows team name or bomb progress
3. **Separator** (2px)
4. **Team Logo** (70px) - 40x40 logo centered
5. **Separator** (2px)
6. **Round Score** (50px) - "7" rounds won
7. **Separator** (2px)

## Complete Flow Diagram

```
LEFT TEAM                    CENTER                      RIGHT TEAM
┌─────────────────────────┐ ┌────────────────────┐ ┌─────────────────────────┐
│ | Score | Logo | Name |█│■■■○│ Timer │■■■○│█| Name | Logo | Score | │
└─────────────────────────┘ └────────────────────┘ └─────────────────────────┘
```

## Series Squares Detail

### Positioning
- **Left Team Squares**: Immediately to the LEFT of the timer
- **Right Team Squares**: Immediately to the RIGHT of the timer
- **Count**: 3 squares per team (for BO5)

### Visual Examples

#### Team Leading 2-0
```
■ ■ ○  [TIMER]  ○ ○ ○
```

#### Tied 1-1
```
■ ○ ○  [TIMER]  ■ ○ ○
```

#### Close Match 2-1
```
■ ■ ○  [TIMER]  ■ ○ ○
```

### Square States

**Won (Filled)**
```
■  ← Filled with team color
   Border: team color
   Fill: team color
```

**Not Won (Empty)**
```
○  ← Outlined only
   Border: team color
   Fill: transparent
```

## Layout Order Summary

| Position | Left Side | Center Left | Center | Center Right | Right Side |
|----------|-----------|-------------|---------|--------------|------------|
| 1 | Separator | Left Squares | | Right Squares | Color Border |
| 2 | **Score** | | Round Counter | | Team Name |
| 3 | Separator | | | | Separator |
| 4 | **Logo** | | Round Timer | | Logo |
| 5 | Separator | | | | Separator |
| 6 | **Team Name** | | | | Score |
| 7 | **Color Border** | | | | Separator |

## Key Features

✅ **Round Score** - First element after separator (most visible)  
✅ **Team Logo** - Second element (team identity)  
✅ **Team Name** - Last element before color border (can hide with Alt+N)  
✅ **Series Squares** - Flanking the timer in center (easy to see)  
✅ **Color Border** - At the edges (15px team color stripe)

## Dimensions

| Element | Width | Description |
|---------|-------|-------------|
| Separator | 2px | Vertical divider |
| Round Score | 50px | Current rounds won |
| Team Logo | 70px | Logo container (40x40 image) |
| Team Name | 280px | Team name or bomb progress |
| Color Border | 15px | Solid color stripe |
| Series Squares | 80px | 3 squares + gaps |
| Center Timer | 140px | Round counter + timer |

**Total Width**: ~1,270px

## Animation States

### Normal State
```
| Score | Logo | TEAM NAME |█ ■■■○ [TIMER] ■■■○ █| TEAM NAME | Logo | Score |
```

### Team Names Hidden (Alt+N)
```
| Score | Logo |           |█ ■■■○ [TIMER] ■■■○ █|           | Logo | Score |
```

### Bomb Active (Progress Bar)
```
| Score | Logo | [███ 60%] |█ ■■■○ [TIMER] ■■■○ █| [███ 60%] | Logo | Score |
```

### Bomb Planted (Center Changes)
```
| Score | Logo | TEAM NAME |█ ■■■○ [💣 0:35] ■■■○ █| TEAM NAME | Logo | Score |
```

## Color Coding

### CT Team (Blue)
- **Color Border**: #28abff (bright blue)
- **Series Squares**: Blue border + blue fill when won
- **Text**: White on dark background

### T Team (Yellow/Gold)
- **Color Border**: #ffc600 (bright yellow)
- **Series Squares**: Yellow border + yellow fill when won
- **Text**: White on dark background

## Responsive Design

- Fixed widths for consistency across resolutions
- Series squares scale proportionally
- Logo remains fixed at 40x40px
- Bomb progress bar fills entire team name container
- All animations use CSS transitions (smooth)

## Comparison with Previous Layouts

| Feature | Original | V1 Update | V2 Final |
|---------|----------|-----------|----------|
| Round Score Position | Far from timer | Next to timer | ✅ First element |
| Logo Position | After name | After score | ✅ Second element |
| Team Name Position | First | Last | ✅ Third element |
| Series Display | Numbers | End squares | ✅ **Center squares** |
| Color Border | Start | End | ✅ Edge (left=end, right=start) |

## Visual Hierarchy

### Most Important (Always Visible)
1. **Round Timer** - Center, largest font
2. **Round Score** - Next to timer, first on sides
3. **Series Squares** - Next to timer, center

### Secondary (Important)
4. **Team Logo** - Second element, team identity
5. **Round Counter** - Above timer

### Tertiary (Can Hide)
6. **Team Name** - Can be hidden with Alt+N
7. **Color Border** - Visual accent at edges

## Usage Example

**BO3 Match - Team A leading 2-0 on current map, score 8-7**

```
┌───────────────────────────────────────────────────────────────────────┐
│ | 8 | 🟦 | TEAM A |█ ■■○ [ 12/24 ] ○○○ █| TEAM B | 🟨 | 7 | │
│                           [ 1:25 ]                                    │
└───────────────────────────────────────────────────────────────────────┘
```

- Team A: 8 rounds won, leading 2-0 in series (2 filled squares)
- Team B: 7 rounds won, losing 0-2 in series (0 filled squares)
- Current round: 12/24, time: 1:25 remaining

Perfect! 🎯
