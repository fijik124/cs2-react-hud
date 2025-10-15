import React from 'react';
import BlastMatchBar from './HUD/MatchBar/BlastMatchBar';

/**
 * Demo page for the BLAST Austin Major CS2 Observer HUD Match Bar
 * 
 * This standalone demo showcases:
 * - Persistent side assignment (teams stay on their assigned sides)
 * - Center-out layout with timer, scores, and team info
 * - Dynamic bomb progress animation (logo-fill effect)
 * - Observer-controlled team name toggle
 * - Player rosters sorted by team side
 */
const BlastMatchBarDemo: React.FC = () => {
  return <BlastMatchBar />;
};

export default BlastMatchBarDemo;
