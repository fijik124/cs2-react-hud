# BLAST Match Bar - Integration Guide

## ✅ Integration Complete!

The BLAST Austin Major Match Bar has been successfully integrated into your CS2 React HUD project with the **NEW REVERSED LAYOUT**.

## 🎯 What Was Changed

### Updated Layout Structure

The match bar now follows this order (from center outward):

**Left Side**: Timer ← **Score** ← **Logo** ← **Team Name** ← **Squares** ← **Color Border**  
**Right Side**: Timer → **Score** → **Logo** → **Team Name** → **Squares** → **Color Border**

### Key Layout Changes

1. **Round Score** - Now directly next to the timer (most important info together)
2. **Team Logo** - After the score, before team name
3. **Team Name** - After logo (can be hidden with Alt+N)
4. **Series Wins** - Changed from numbers to **colored squares** (■■■○)
5. **Color Border** - Moved to the **end** of each section (15px stripe)

### Series Wins Display

- Shows up to **3 colored squares** for BO5 matches
- **Filled squares** (■) = Maps won (colored with team color)
- **Empty squares** (○) = Maps not yet won (outlined only)
- Example: `■■○` = Team has won 2 maps

## 🎯 What Was Changed

### Files Created/Modified

1. **`src/HUD/MatchBar/BlastMatchBar.tsx`** - New BLAST match bar component
   - Integrates with existing GSI data
   - Uses real-time game state from CS2
   - Supports bomb progress animations
   - Implements persistent side assignment

2. **`src/HUD/MatchBar/blast-matchbar.scss`** - BLAST styling
   - Professional BLAST theme
   - Monospace fonts for competitive feel
   - Smooth transitions and animations

3. **`src/HUD/Layout/Layout.tsx`** - Updated to use BlastMatchBar
   - BlastMatchBar now replaces the original MatchBar
   - Original MatchBar commented out for reference

4. **`src/API/contexts/keybinds.ts`** - Added new keybind
   - **Alt+N** - Toggle team names on/off

## 🎮 Features Implemented

### ✅ Task 1: Data Structuring & Persistent Side Logic
- Teams are assigned based on GSI `orientation` (left/right)
- Player stats pulled from real CS2 GSI data
- Series wins tracked from match API

### ✅ Task 2: Structural Wireframe & Visual Theme
- **Center-out layout** with perfect mirroring
- **15px team color borders** (CT = Blue, T = Yellow)
- **Center timer** with round counter above
- **Mirrored scores** with separators
- **BLAST theme** with monospace font

### ✅ Task 3: Dynamic Bomb Status Animation
- **Planting**: Progress bar fills during plant
- **Planted**: Bomb icon and countdown shown in center
- **Defusing**: Progress bar fills during defuse
- **Logo-fill effect**: Team name fades out, progress bar wipes from logo

### ✅ Task 4: Observer-Controlled Team Name Toggle
- **Keybind**: Alt+N to toggle team names
- **Smooth fade** animation
- **Maintains logos** when names hidden

## 📝 Usage

### Running the HUD

```bash
npm run dev
```

The BLAST Match Bar will automatically appear when a CS2 game is active with GSI enabled.

### Switching Between Match Bars

To switch back to the original match bar, edit `src/HUD/Layout/Layout.tsx`:

```tsx
{/* Original Match Bar */}
<MatchBar map={game.map} phase={game.phase_countdowns} bomb={game.bomb} match={match} />

{/* BLAST Match Bar - Comment out to use original */}
{/* <BlastMatchBar map={game.map} phase={game.phase_countdowns} bomb={game.bomb} match={match} players={game.players || []} /> */}
```

### Observer Controls

| Keybind | Action |
|---------|--------|
| **Alt+N** | Toggle team names visibility |
| **Alt+C** | Toggle cameras (existing) |
| **Alt+V** | Radar bigger (existing) |
| **Alt+B** | Radar smaller (existing) |

## 🎨 Customization

### Changing Team Colors

Edit `src/HUD/MatchBar/BlastMatchBar.tsx` lines ~138 and ~156:

```tsx
color: leftTeamGSI.side === "CT" ? "#28abff" : "#ffc600",  // CT Blue, T Yellow
```

### Adjusting Match Bar Size

Edit `src/HUD/MatchBar/blast-matchbar.scss`:

```scss
.team-color-border {
  width: 15px;  // Border width
  height: 70px;  // Match bar height
}

.team-name-container {
  width: 280px;  // Team name section width
}
```

### Changing Font

Edit `src/HUD/MatchBar/blast-matchbar.scss`:

```scss
.team-name {
  font-family: 'Courier New', Courier, monospace;  // Change to your preferred font
  font-size: 20px;
}
```

## 🔧 Technical Details

### Data Flow

```
CS2 Game (GSI) 
  ↓
App.tsx (CSGO state)
  ↓
Layout.tsx
  ↓
BlastMatchBar.tsx
  ↓
TeamScoreSection (x2)
```

### State Management

- **GSI.teams.left/right**: Team metadata (name, logo, country)
- **map.team_ct/team_t**: Live game data (scores, side)
- **bomb**: Real-time bomb state (planted, defusing, planting)
- **players**: Individual player stats (kills, deaths, assists)

### Bomb Progress Calculation

| State | Duration | Calculation |
|-------|----------|-------------|
| **Planting** | ~3 seconds | `countdown * 33.33%` |
| **Planted** | 40 seconds | `elapsed / 40 * 100%` |
| **Defusing** | 5s (kit) / 10s (no kit) | `elapsed / defuseTime * 100%` |

## 🐛 Troubleshooting

### Match Bar Not Showing

1. **Check GSI is enabled** in CS2
2. **Verify game state** is being received in console
3. **Ensure match data** is loaded (teams configured in manager)

### Team Names Not Appearing

1. Check that teams are set up in the manager app
2. Verify `GSI.teams.left` and `GSI.teams.right` have data
3. Press **Alt+N** to ensure names aren't toggled off

### Bomb Animation Not Working

1. Verify bomb state in console: `game.bomb.state`
2. Check that bomb progress calculations are running (useEffect)
3. Ensure SCSS animations are loaded

### Colors Not Showing

1. Check that team sides are properly detected
2. Verify SCSS file is imported
3. Look for console errors related to styling

## 📊 Performance

- **Re-renders**: Optimized with React hooks
- **Animation**: CSS transitions (hardware accelerated)
- **Updates**: 10Hz for bomb progress (100ms intervals)
- **Memory**: Minimal state management

## 🔄 Future Enhancements

Potential additions you can implement:

1. **Player Roster Overlay**: Show K/D/A stats below match bar
2. **Win Indicators**: Animate round wins (circles/diamonds)
3. **Timeouts/Pauses**: Visual indicators for tactical timeouts
4. **Series Progress**: Show map wins in BO3/BO5
5. **Custom Team Colors**: Load from team metadata
6. **Animated Transitions**: Side swap animations between halves

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify GSI data in the network tab
3. Review the component props in React DevTools
4. Check that all dependencies are installed

## 🎉 Credits

- **Original HUD**: cs2-react-hud project
- **Design Inspiration**: BLAST Premier broadcasts
- **Implementation**: BLAST Austin Major Match Bar specification

---

**Version**: 1.0.0  
**Date**: October 15, 2025  
**Status**: ✅ Production Ready
