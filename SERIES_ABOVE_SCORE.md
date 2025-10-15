# BLAST Match Bar - Series Squares Above Score

## Updated Visual Structure

```
┌═══════════════════════════════════════════════════════════════════════════════════┐
│                         BLAST MATCH BAR (Series Above Score)                       │
├───┬──────┬───┬────┬───┬──────────────┬───┬───────────┬───┬──────────────┬───┬────┬───┬──────┬───┤
│ | │ ■■■○ │ | │ L  │ | │  TEAM NAME   │███│           │███│  TEAM NAME   │ | │  L │ | │ ■■■○ │ | │
│ | │  8   │ | │  O │ | │   or BOMB    │   │   16/24   │   │   or BOMB    │ | │  O │ | │  7   │ | │
│ | │      │ | │  G │ | │  PROGRESS    │   │           │   │  PROGRESS    │ | │  G │ | │      │ | │
│ | │      │ | │  O │ | │              │   │   1:25    │   │              │ | │  O │ | │      │ | │
│ | │      │ | │    │ | │              │   │           │   │              │ | │    │ | │      │ | │
├───┴──────┴───┴────┴───┴──────────────┴───┴───────────┴───┴──────────────┴───┴────┴───┴──────┴───┤
│ 2   50   2   70  2    280        15      140      15    280        2  70  2   50   2 │
└═══════════════════════════════════════════════════════════════════════════════════┘
```

## Layout Breakdown

### Left Side (Reversed - Reads Right to Left)
1. **Separator** (2px)
2. **Score with Series** (50px)
   - **Series Squares** (top) - 3 small squares (10x10px)
   - **Round Score** (bottom) - Large number "8"
3. **Separator** (2px)
4. **Team Logo** (70px) - 40x40 centered
5. **Separator** (2px)
6. **Team Name** (280px) - Can show bomb progress
7. **Color Border** (15px) - Team color stripe

### Center Section
- **Round Counter** (top) - "16/24"
- **Round Timer** (bottom) - "1:25"
- Width: 140px

### Right Side (Normal - Reads Left to Right)
1. **Color Border** (15px) - Team color stripe
2. **Team Name** (280px) - Can show bomb progress
3. **Separator** (2px)
4. **Team Logo** (70px) - 40x40 centered
5. **Separator** (2px)
6. **Score with Series** (50px)
   - **Series Squares** (top) - 3 small squares (10x10px)
   - **Round Score** (bottom) - Large number "7"
7. **Separator** (2px)

## Series Squares Detail

### Size and Appearance
- **Dimensions**: 10x10 pixels (smaller than before)
- **Border**: 1.5px solid in team color
- **Gap**: 3px between squares
- **Position**: Centered above the score number

### Visual Examples

#### Empty Square (Not Won)
```
□  10x10px
   Border: team color
   Fill: transparent
```

#### Filled Square (Won)
```
■  10x10px
   Border: team color
   Fill: team color
```

### Score Display Examples

#### Team Leading 2-0, Round Score 8
```
■ ■ □  ← 2 wins (filled), 1 pending (empty)
  8    ← Round score
```

#### Team with 1-1, Round Score 12
```
■ □ □  ← 1 win (filled), 2 pending (empty)
  12   ← Round score
```

#### Team with 0-2, Round Score 7
```
□ □ □  ← 0 wins (all empty)
  7    ← Round score
```

## Complete Visual Flow

```
LEFT TEAM                  CENTER           RIGHT TEAM
┌────────────────────┐   ┌──────┐   ┌────────────────────┐
│█| Name | Logo | ■■□│   │Timer │   │■■□ | Logo | Name |█│
│                 8  │             │ 7                    │
└────────────────────┘             └────────────────────┘
```

## Stacked Score Section

```
┌──────────┐
│  ■ ■ □   │  ← Series squares (small, on top)
│          │
│    8     │  ← Round score (large, below)
└──────────┘
```

### Dimensions
- **Container Width**: ~50px (flexible with padding)
- **Container Height**: 70px
- **Top Section** (Series): ~16px height
  - 3 squares × 10px + 2 gaps × 3px = 36px width
- **Bottom Section** (Score): ~50px height
  - Font size: 24px
  - Line height: 1

## Key Changes from Previous Version

| Feature | Previous | New |
|---------|----------|-----|
| **Series Position** | Center (flanking timer) | Above team score |
| **Series Size** | 18x18px | **10x10px** (smaller) |
| **Series Gap** | 6px | **3px** (tighter) |
| **Layout** | Horizontal next to timer | **Stacked with score** |
| **Visibility** | Always visible in center | Part of team section |

## Color Coding

### CT Team (Blue)
```
┌──────────┐
│  ■ ■ □   │  ← Blue squares (#28abff)
│    8     │  ← White text
└──────────┘
```

### T Team (Yellow/Gold)
```
┌──────────┐
│  ■ ■ □   │  ← Yellow squares (#ffc600)
│    7     │  ← White text
└──────────┘
```

## Animation States

### Normal State
```
█| Name | Logo | ■■□ | [Timer] | ■■□ | Logo | Name |█
                  8               7
```

### Team Names Hidden (Alt+N)
```
█|      | Logo | ■■□ | [Timer] | ■■□ | Logo |      |█
                  8               7
```

### Bomb Active
```
█| [Progress] | Logo | ■■□ | [Timer] | ■■□ | Logo | [Progress] |█
                        8               7
```

## Advantages of This Layout

✅ **Compact** - Series info directly above score (saves horizontal space)  
✅ **Logical Grouping** - Score and series wins together (both team performance metrics)  
✅ **Cleaner Center** - Timer section uncluttered  
✅ **Smaller Squares** - Less visual noise, more professional  
✅ **Easy to Read** - Clear hierarchy (series → score → logo → name)

## Implementation Details

### HTML Structure
```html
<div class="score-with-series">
  <div class="series-squares-top">
    <div class="series-square won"></div>  <!-- Filled -->
    <div class="series-square won"></div>  <!-- Filled -->
    <div class="series-square"></div>      <!-- Empty -->
  </div>
  <div class="round-score">8</div>
</div>
```

### CSS Key Properties
```scss
.score-with-series {
  flex-direction: column;  // Stack vertically
  height: 70px;
  min-width: 50px;
}

.series-square {
  width: 10px;              // Small squares
  height: 10px;
  border: 1.5px solid;      // Thinner border
}

.series-squares-top {
  gap: 3px;                 // Tight spacing
  margin-bottom: 4px;       // Space before score
}

.round-score {
  font-size: 24px;          // Large score
  line-height: 1;           // Tight line height
}
```

Perfect! 🎯
