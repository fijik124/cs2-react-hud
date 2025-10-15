# BLAST Austin Major - CS2 Observer HUD Match Bar

A fully-featured CS2 Observer HUD Match Bar component implementing the BLAST visual theme with advanced features including persistent side assignment, dynamic bomb animations, and observer controls.

## 🎯 Features Implemented

### ✅ Task 1: Data Structuring and Persistent Side Logic
- **Persistent Side Assignment**: Teams are assigned to left/right sides based on `teamConfig.leftTeamId` and `teamConfig.rightTeamId`
- Teams maintain their assigned sides throughout the match
- Player rosters are correctly sorted and displayed based on team sides

### ✅ Task 2: Structural Wireframe and Visual Theme
- **Center-out Layout**: Perfectly mirrored design expanding from center
- **Centerpiece**: Round timer in large, bold font
- **Round Counter**: Positioned above timer with separator
- **Scores & Separators**: Mirrored layout with:
  - Vertical separators between sections
  - Round win counters
  - Series win counters
  - Team logos (40x40px, stationary)
  - Team names
- **Team Color Indicators**: 15px wide border on absolute edges
- **BLAST Theme**: Bold, clean, high-contrast, professional design with monospace font

### ✅ Task 3: Dynamic Bomb Status Animation
- **Logo-Fill Effect**: Team name smoothly transitions to bomb progress bar
- **Progress Animation**: Bar expands from team logo outward, filling the name space
- **Smooth Transitions**: Progress bar uses smooth animations
- **Auto-cleanup**: Progress bar hides and team name returns after completion

### ✅ Task 4: Observer-Controlled Team Name Toggle
- **Toggle Button**: Simulates observer keybind
- **Two States**:
  - Default (True): Show team names + logos
  - Toggled (False): Hide team names, show only logos and scores
- **Smooth Animation**: Fade in/out transition for team names

### ✅ Additional Features
- **Player Rosters**: Displayed below match bar with:
  - Team headers with color coding
  - Player avatars
  - Kill/Death/Assist stats with color indicators
  - Clean, readable layout

## 📁 File Structure

```
src/
├── HUD/
│   └── MatchBar/
│       ├── BlastMatchBar.tsx       # Main component
│       └── blast-matchbar.scss     # Styling
├── BlastMatchBarDemo.tsx           # Demo wrapper
└── App.tsx                         # Integration point
```

## 🚀 Usage

### Testing the Component

To test the BLAST Match Bar component, uncomment the following line in `src/App.tsx`:

```tsx
// Line 9-10 in App.tsx
import BlastMatchBarDemo from './BlastMatchBarDemo';

// Line 17 in App.tsx
return <BlastMatchBarDemo />;
```

Then run the dev server:

```bash
npm run dev
```

### Integration

To integrate into your existing HUD:

```tsx
import BlastMatchBar from './HUD/MatchBar/BlastMatchBar';

function YourComponent() {
  return <BlastMatchBar />;
}
```

## 🎨 Visual Design

### Color Scheme
- **Background**: Dark gradient (#000000 to #1a1a1a)
- **Panel Color**: #1a1a1a
- **Text**: White (#ffffff)
- **Separators**: #333333
- **Bomb Progress**: Red gradient (#dc2626 to #ef4444)

### Typography
- **Font Family**: 'Courier New', Courier, monospace
- **Timer**: 32px, bold
- **Team Names**: 20px, bold
- **Scores**: 20-24px, bold
- **Stats**: 14px

## 📊 Mock Data Structure

The component includes comprehensive mock data with:
- 2 teams (NATUS VINCERE vs TEAM VITALITY)
- 5 players per team with stats
- Team configuration for persistent sides
- Round timer and counter
- Bomb status simulation

## 🔄 Animation Timeline

1. **Initial Load**: Component renders with default state
2. **3 seconds**: Bomb activation begins
3. **3-8 seconds**: Bomb progress bar animates from 0% to 100%
4. **8+ seconds**: Bomb completes, bar hides, team name returns

## 🎮 Observer Controls

- **Toggle Button**: "HIDE TEAM NAMES" / "SHOW TEAM NAMES"
- **Effect**: Globally hides/shows team names while keeping logos visible
- **Use Case**: Reduces visual clutter during intense moments

## 🏗️ Component Architecture

### Main Component: `BlastMatchBar`
- Manages game state
- Handles bomb activation simulation
- Coordinates team assignment

### Sub-Component: `TeamScoreSection`
- Renders team information
- Handles bomb progress animation
- Manages team name visibility

### Styling: `blast-matchbar.scss`
- BLAST theme implementation
- Responsive layouts
- Animation definitions

## 🎯 Key Implementation Details

### Persistent Side Assignment
```tsx
// Teams are assigned based on teamConfig
const left = team1.id === teamConfig.leftTeamId ? team1 : team2;
const right = team2.id === teamConfig.rightTeamId ? team2 : team1;
```

### Bomb Progress Animation
```tsx
// Progress bar grows from logo outward
<div 
  className={`bomb-progress-bar ${isLeft ? 'left' : 'right'}`}
  style={{ width: `${bombProgress}%` }}
/>
```

### Team Name Toggle
```tsx
// Smooth opacity transition
<div className={`team-name ${!showTeamNames || (isBombActive && isActiveTeam) ? 'hidden' : ''}`}>
  {team.name}
</div>
```

## 📝 Customization

### Changing Team Colors
Edit the `mockGameState` object:
```tsx
team1: {
  color: '#YOUR_COLOR_HEX',
  // ...
}
```

### Adjusting Dimensions
Modify values in `blast-matchbar.scss`:
```scss
.team-color-border {
  width: 15px; // Team color indicator width
  height: 70px; // Match bar height
}
```

### Animation Speed
Adjust the interval in `BlastMatchBar.tsx`:
```tsx
const progressInterval = setInterval(() => {
  progress += 2; // Increase for faster animation
  // ...
}, 100); // Decrease for faster updates
```

## 🐛 Troubleshooting

### Component Not Displaying
1. Ensure SCSS files are imported correctly
2. Check that mock data is properly structured
3. Verify React and TypeScript are configured

### Animations Not Working
1. Check CSS transition properties in SCSS
2. Ensure state updates are triggering re-renders
3. Verify browser supports CSS transitions

### Team Assignment Issues
1. Verify `teamConfig.leftTeamId` matches team IDs
2. Check that team objects have correct `id` properties
3. Ensure state is being set in `useEffect`

## 📄 License

This component is part of the cs2-react-hud project and follows the project's MIT license.

## 🙏 Acknowledgments

- BLAST Premier for visual design inspiration
- CS2 GSI for game state integration patterns
- The CS2 Observer HUD community

---

**Note**: This is a standalone implementation with mock data. For production use, integrate with your CS2 GSI (Game State Integration) system to receive real-time game data.
