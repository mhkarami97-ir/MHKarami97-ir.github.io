import IconGridCard from '../icon-grid-card';
import { SanitizedJetbrains } from '../../interfaces/sanitized-config';

const JetbrainsCard = ({
  jetbrains,
  loading,
}: {
  jetbrains: SanitizedJetbrains;
  loading: boolean;
}) => {
  return (
    <IconGridCard
      items={jetbrains.items}
      loading={loading}
    />
  );
};

export default JetbrainsCard;
