import IconGridCard from '../icon-grid-card';
import { SanitizedSoftware } from '../../interfaces/sanitized-config';

const SoftwareCard = ({
  software,
  loading,
}: {
  software: SanitizedSoftware;
  loading: boolean;
}) => {
  return <IconGridCard items={software.items} loading={loading} />;
};

export default SoftwareCard;
