import IconGridCard from '../icon-grid-card';
import { SanitizedApps } from '../../interfaces/sanitized-config';
const AppIconsCard = ({ apps, loading }: { apps: SanitizedApps; loading: boolean; }) => {
  return <IconGridCard items={apps.items} loading={loading} />;
};

export default AppIconsCard;
