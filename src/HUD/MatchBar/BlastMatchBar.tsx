import React, { useState, useEffect } from 'react';
import * as I from "csgogsi";
import './blast-matchbar.scss';
import { Match } from './../../API/types';
import { GSI } from './../../API/HUD';
import { useAction } from '../../API/contexts/actions';
import BombIcon from './BombIcon';
import { Defuse } from '../../assets/Icons';

// ===== TYPE DEFINITIONS =====
interface BlastPlayer {
  id: string;
  name: string;
  avatar: string;
  kills: number;
  deaths: number;
  assists: number;
}

interface BlastTeam {
  id: string;
  name: string;
  logo: string;
  color: string;
  score: number;
  seriesWins: number;
  players: BlastPlayer[];
  side: "CT" | "T";
}

interface IProps {
  match: Match | null;
  map: I.Map;
  phase: I.CSGO["phase_countdowns"];
  bomb: I.Bomb | null;
  players: I.Player[];
}

// ===== TEAM SCORE COMPONENT =====
interface TeamScoreProps {
  team: BlastTeam;
  isLeft: boolean;
  isBombActive: boolean;
  bombProgress: number;
  isActiveTeam: boolean;
  showTeamNames: boolean;
  bombState: string | null;
  playerName?: string;
}

const TeamScoreSection: React.FC<TeamScoreProps> = ({
  team,
  isLeft,
  isBombActive,
  bombProgress,
  isActiveTeam,
  showTeamNames,
  bombState,
  playerName,
}) => {
  // Generate series squares for this team
  const maxSeries = 3;
  const seriesSquares = [];
  
  for (let i = 0; i < maxSeries; i++) {
    seriesSquares.push(
      <div 
        key={i} 
        className={`series-square ${i < team.seriesWins ? 'won' : ''}`}
        style={{ 
          backgroundColor: i < team.seriesWins ? team.color : 'transparent',
          borderColor: team.color
        }}
      />
    );
  }

  return (
    <div className={`blast-team-section ${isLeft ? 'left' : 'right'}`}>
      {/* Vertical Separator */}
      <div className="separator" />

      {/* Round Win Counter with Series Squares on Top */}
      <div className="score-with-series">
        {/* Series Squares - On Top */}
        <div className="series-squares-top">
          {seriesSquares}
        </div>
        
        {/* Round Score - Below */}
        <div className="round-score">
          {team.score}
        </div>
      </div>

      {/* Vertical Separator */}
      <div className="separator" />

      {/* Team Logo - Second */}
      <div className="team-logo-box">
        {team.logo ? (
          <img src={team.logo} alt={team.name} />
        ) : (
          <div className="fallback-logo">
            <span>{team.name.substring(0, 2).toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Vertical Separator */}
      <div className="separator" />

      {/* Team Name / Bomb Progress Container - Last */}
      <div className="team-name-container">
        {/* Team Name */}
        <div className={`team-name ${!showTeamNames || (isBombActive && isActiveTeam) ? 'hidden' : ''}`}>
          {team.name}
        </div>

        {/* Bomb Progress Bar */}
        {isBombActive && isActiveTeam && (
          <div className="bomb-progress-container">
            <div
              className={`bomb-progress-bar ${
                bombState === 'planting' ? 'planting' : 
                bombState === 'planted' ? 'planted' : 
                'defusing'
              } ${isLeft ? 'left' : 'right'}`}
              style={
                bombState === 'planting'
                  ? {
                      width: '100%',
                      transform: `scaleX(${bombProgress / 100})`,
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }
                  : { width: `${bombProgress}%` }
              }
            />
            <div className={`bomb-progress-label ${isLeft ? 'left' : 'right'}`}>
              {bombState === 'planting' && playerName ? (
                <>
                  {playerName}
                  <br />
                  <span className="planting-text">PLANTING</span>
                </>
              ) : bombState === 'planted' ? 'PLANTED' : 
                bombState === 'defusing' && playerName ? (
                  <>
                    {playerName}
                    <br />
                    <span className="defusing-text">DEFUSING</span>
                  </>
                ) : 'DEFUSING'}
            </div>
          </div>
        )}
        
        {/* Bomb Icon - shown when planting, planted, or defusing */}
        {(bombState === 'planting' || bombState === 'planted' || bombState === 'defusing') && isActiveTeam && (
          <div className={`bomb-icon-side ${isLeft ? 'right' : 'left'} ${bombState === 'defusing' ? 'defusing' : ''}`}>
            {bombState === 'defusing' ? (
              <Defuse style={{ width: 48, height: 48 }} className="defuse-svg" />
            ) : (
              <BombIcon 
                size={48} 
                className={`bomb-svg ${bombState === 'planting' ? 'filling' : ''}`} 
                fillProgress={bombState === 'planting' ? bombProgress : 100}
                defuseProgress={0}
              />
            )}
          </div>
        )}
      </div>

      {/* Team Color Border Indicator - 15px at the end - Hide during planting or planted */}
      <div 
        className={`team-color-border ${isBombActive && isActiveTeam && (bombState === 'planting' || bombState === 'planted') ? 'hidden' : ''}`}
        style={{ backgroundColor: team.color }} 
      />
    </div>
  );
};

// ===== MAIN MATCH BAR COMPONENT =====
const BlastMatchBar: React.FC<IProps> = ({ match, map, phase, bomb, players }) => {
  const [showTeamNames, setShowTeamNames] = useState(true);
  const [bombProgress, setBombProgress] = useState(0);

  // Toggle team names visibility via keybind (Alt+N)
  useAction('toggleTeamNames', () => {
    setShowTeamNames(prev => !prev);
  });

  // ===== TASK 1: Persistent Side Assignment =====
  // Determine left and right teams based on orientation
  const leftTeamGSI = map.team_ct.orientation === "left" ? map.team_ct : map.team_t;
  const rightTeamGSI = map.team_ct.orientation === "left" ? map.team_t : map.team_ct;

  // Get team data from GSI
  const leftGSITeam = GSI.teams.left;
  const rightGSITeam = GSI.teams.right;

  // Get players for each team
  const leftPlayers = players.filter(p => p.team.side === leftTeamGSI.side);
  const rightPlayers = players.filter(p => p.team.side === rightTeamGSI.side);

  // Convert to BlastTeam format
  const teamLeft: BlastTeam = {
    id: leftGSITeam?.id || leftTeamGSI.side,
    name: leftGSITeam?.name || leftTeamGSI.name || leftTeamGSI.side,
    logo: leftGSITeam?.logo || '',
    color: leftTeamGSI.side === "CT" ? "#28abff" : "#ffc600",
    score: leftTeamGSI.score,
    seriesWins: leftGSITeam?.map_score || (match?.left.wins || 0),
    side: leftTeamGSI.side,
    players: leftPlayers.map(p => ({
      id: p.steamid,
      name: p.name,
      avatar: p.avatar || '',
      kills: p.stats.kills,
      deaths: p.stats.deaths,
      assists: p.stats.assists
    }))
  };

  const teamRight: BlastTeam = {
    id: rightGSITeam?.id || rightTeamGSI.side,
    name: rightGSITeam?.name || rightTeamGSI.name || rightTeamGSI.side,
    logo: rightGSITeam?.logo || '',
    color: rightTeamGSI.side === "CT" ? "#28abff" : "#ffc600",
    score: rightTeamGSI.score,
    seriesWins: rightGSITeam?.map_score || (match?.right.wins || 0),
    side: rightTeamGSI.side,
    players: rightPlayers.map(p => ({
      id: p.steamid,
      name: p.name,
      avatar: p.avatar || '',
      kills: p.stats.kills,
      deaths: p.stats.deaths,
      assists: p.stats.assists
    }))
  };

  // ===== TASK 3: Bomb Progress Tracking =====
  useEffect(() => {
    if (!bomb) {
      setBombProgress(0);
      return;
    }

    if (bomb.state === "planted") {
      const timer = setInterval(() => {
        const countdown = bomb.countdown || 40;
        const progress = Math.min(100, Math.max(0, (countdown / 40) * 100)); // Countdown from 100% to 0%
        setBombProgress(progress);
      }, 100);
      return () => clearInterval(timer);
    } else if (bomb.state === "defusing") {
      const timer = setInterval(() => {
        const defuseTime = bomb.player?.state.defusekit ? 5 : 10;
        const elapsed = Date.now() / 1000 - (bomb.countdown || 0);
        const progress = Math.min(100, Math.max(0, (elapsed / defuseTime) * 100));
        setBombProgress(progress);
      }, 100);
      return () => clearInterval(timer);
    } else if (bomb.state === "planting") {
      const timer = setInterval(() => {
        const progress = Math.min(100, Math.max(0, (bomb.countdown || 0) * 33.33)); // ~3 seconds to plant
        setBombProgress(progress);
      }, 100);
      return () => clearInterval(timer);
    }

    setBombProgress(0);
  }, [bomb]);

  // Format timer to MM:SS
  const formatTimer = (timeString: string | number): string => {
    let seconds: number;
    if (typeof timeString === "string") {
      seconds = parseFloat(timeString);
    } else {
      seconds = timeString;
    }
    const countdown = Math.abs(Math.ceil(seconds));
    const mins = Math.floor(countdown / 60);
    const secs = countdown - mins * 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRoundLabel = (mapRound: number): string => {
    const round = mapRound + 1;
    if (round <= 24) {
      return `${round}/24`;
    }
    const additionalRounds = round - 24;
    const OT = Math.ceil(additionalRounds / 6);
    return `OT${OT} ${additionalRounds - (OT - 1) * 6}/6`;
  };

  // Determine if bomb is active and which team
  const isBombActive = bomb && (bomb.state === "planted" || bomb.state === "defusing" || bomb.state === "planting");
  const activeTeamId = bomb?.state === "defusing" ? 
    (leftTeamGSI.side === "CT" ? teamLeft.id : teamRight.id) : 
    (leftTeamGSI.side === "T" ? teamLeft.id : teamRight.id);

  const isPlanted = bomb && (bomb.state === "defusing" || bomb.state === "planted");
  
  // Determine which side the T team is on for bomb icon positioning
  const isTerroristOnLeft = leftTeamGSI.side === "T";
  
  // Get player name from bomb (for planting/defusing)
  const bombPlayer = bomb?.player;
  const bombPlayerName = bombPlayer ? players.find(p => p.steamid === bombPlayer.steamid)?.name : undefined;

  return (
    <>
      {/* ===== TASK 2: MATCH BAR STRUCTURE ===== */}
      <div className="blast-matchbar">
        {/* Left Team */}
        <TeamScoreSection
          team={teamLeft}
          isLeft={true}
          isBombActive={!!isBombActive}
          bombProgress={bombProgress}
          isActiveTeam={activeTeamId === teamLeft.id}
          showTeamNames={showTeamNames}
          bombState={bomb?.state || null}
          playerName={bombPlayerName}
        />

        {/* ===== CENTER TIMER SECTION ===== */}
        <div className="center-timer">
          {/* Round Counter - Top (always visible) */}
          <div className="round-counter">
            {getRoundLabel(map.round)}
          </div>

          {/* Round Timer - Center (show dash when planted) */}
          <div className={`round-timer ${isPlanted ? 'planted' : ''}`}>
            {isPlanted ? '-' : formatTimer(phase.phase_ends_in)}
          </div>
        </div>

        {/* Right Team */}
        <TeamScoreSection
          team={teamRight}
          isLeft={false}
          isBombActive={!!isBombActive}
          bombProgress={bombProgress}
          isActiveTeam={activeTeamId === teamRight.id}
          showTeamNames={showTeamNames}
          bombState={bomb?.state || null}
          playerName={bombPlayerName}
        />
      </div>

    </>
  );
};

export default BlastMatchBar;
