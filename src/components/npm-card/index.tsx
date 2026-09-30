import IconGridCard from '../icon-grid-card';
import { SanitizedNpm } from '../../interfaces/sanitized-config';

const NpmCard = ({
  npms,
  loading,
}: {
  npms: SanitizedNpm;
  loading: boolean;
}) => {
  return <IconGridCard items={npms.items} loading={loading} halfWidth />;
};

export default NpmCard;
