import Player from './SpartansPlayer'
import * as I from 'csgogsi';
import './spartan_players.scss';

interface Props {
  players: I.Player[],
  team: I.Team,
  side: 'right' | 'left',
  current: I.Player | null,
}
const TeamBox = ({players, team, side, current}: Props) => {
  return (
    <div className={`teambox ${team.side} ${side}`}>
      {players.map(player => <Player
        key={player.steamid}
        player={player}
        isObserved={!!(current && current.steamid === player.steamid)}
      />)}
    </div>
  );
}
export default TeamBox;