import IconGridCard from '../icon-grid-card';
import { SanitizedGames } from '../../interfaces/sanitized-config';
const NugetCard = ({
  nugets,
  loading,
}: {
  nugets: SanitizedGames;
  loading: boolean;
}) => {
  return <IconGridCard items={nugets.items} loading={loading} />;
};

export default NugetCard;
