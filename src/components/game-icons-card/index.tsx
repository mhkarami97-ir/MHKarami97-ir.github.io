import IconGridCard from '../icon-grid-card';
import { SanitizedGames } from '../../interfaces/sanitized-config';
const GameIconsCard = ({
  games,
  loading,
}: {
  games: SanitizedGames;
  loading: boolean;
}) => {
  return <IconGridCard items={games.items} loading={loading} />;
};

export default GameIconsCard;
