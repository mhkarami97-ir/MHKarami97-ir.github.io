import IconGridCard from '../icon-grid-card';
import { SanitizedBrowserExtensions } from '../../interfaces/sanitized-config';

const BrowserExtensionsCard = ({
  browserExtensions,
  loading,
}: {
  browserExtensions: SanitizedBrowserExtensions;
  loading: boolean;
}) => {
  return (
    <IconGridCard
      items={browserExtensions.items}
      loading={loading}
    />
  );
};

export default BrowserExtensionsCard;
