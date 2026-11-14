import { Fragment } from 'react';
import {
  FaCarSide,
  FaWrench,
  FaShoppingBag,
  FaHome,
  FaHatCowboySide,
  FaSortAmountUp,
  FaThumbtack,
  FaMoneyBillWave,
  FaBusinessTime,
  FaUserClock,
  FaChessBishop,
  FaGlobe,
  FaBookOpen,
  FaVideo,
} from 'react-icons/fa';
import { Profile } from '../../interfaces/profile';
import {
  SanitizedWebsite,
  LinkItemValue,
} from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import { getProductById } from '../../data/products';

type Props = {
  profile: Profile | null;
  loading: boolean;
  website: SanitizedWebsite;
};

const resolveLink = (val?: string) => {
  if (!val) return '';
  if (
    val.startsWith('/') ||
    val.startsWith('http://') ||
    val.startsWith('https://')
  ) {
    return val;
  }
  return `https://${val}`;
};

const resolveDisplay = (val?: string) => {
  if (!val) return '';
  if (val.startsWith('/p/')) {
    const slug = val.replace('/p/', '');
    const product = getProductById(slug);
    return product ? product.name : slug;
  }
  return val.replace(/^https?:\/\//, '');
};

const ICON_MAP: Record<string, React.ReactNode> = {
  travel: <FaCarSide />,
  tour: <FaCarSide />,
  experience: <FaWrench />,
  shop: <FaShoppingBag />,
  house: <FaHome />,
  chavooshan: <FaHatCowboySide />,
  zolfdota: <FaSortAmountUp />,
  dorgardoon: <FaThumbtack />,
  molkrey: <FaMoneyBillWave />,
  zamaanak: <FaBusinessTime />,
  hengam: <FaUserClock />,
  crm: <FaChessBishop />,
  blog: <FaBookOpen />,
  video: <FaVideo />,
};

const TITLE_MAP: Record<string, string> = {
  travel: 'Travel',
  tour: 'Tour',
  experience: 'Experience',
  shop: 'Shop',
  house: 'House',
  chavooshan: 'Chavooshan',
  zolfdota: 'ZolfDota',
  dorgardoon: 'DorGardoon',
  molkrey: 'MolkRey',
  zamaanak: 'Zamaanak',
  hengam: 'Hengam',
  crm: 'CRM',
};

const humanizeKey = (key: string): string => {
  const spaced = key.replace(/([a-z])([A-Z])/g, '$1 $2');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

const ListItem: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
  link?: string;
  skeleton?: boolean;
}> = ({ icon, title, value, link, skeleton = false }) => {
  const isInternal = link?.startsWith('/');

  if (link && !skeleton) {
    return (
      <a
        href={link}
        target={isInternal ? undefined : '_blank'}
        rel={isInternal ? undefined : 'noreferrer'}
        className="flex justify-between items-center py-1.5 px-2 rounded-xl hover:bg-base-200/60 transition-colors group cursor-pointer"
      >
        <div className="flex-grow font-medium gap-2 flex items-center text-base-content group-hover:text-primary transition-colors">
          <span className="text-primary group-hover:scale-110 transition-transform flex items-center justify-center">
            {icon}
          </span>
          <span>{title}</span>
        </div>
        <div
          className="text-sm font-normal text-right mr-2 ml-3 truncate opacity-70 group-hover:opacity-100 group-hover:text-primary transition-colors"
          style={{
            wordBreak: 'break-word',
          }}
        >
          {value}
        </div>
      </a>
    );
  }

  return (
    <div className="flex justify-between items-center py-1.5 px-2">
      <div className="flex-grow font-medium gap-2 flex items-center">
        {icon} {title}
      </div>
      <div
        className={`${
          skeleton ? 'flex-grow' : ''
        } text-sm font-normal text-right mr-2 ml-3`}
        style={{
          wordBreak: 'break-word',
        }}
      >
        {value}
      </div>
    </div>
  );
};

const WebSitesCard = ({ profile, loading, website }: Props) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 4; index++) {
      array.push(
        <ListItem
          key={index}
          skeleton={true}
          icon={skeleton({ widthCls: 'w-4', heightCls: 'h-4' })}
          title={skeleton({ widthCls: 'w-24', heightCls: 'h-4' })}
          value={skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
        />,
      );
    }
    return array;
  };

  const resolveItem = (key: string, itemVal: LinkItemValue | undefined) => {
    if (!itemVal) return null;
    const link = typeof itemVal === 'string' ? itemVal : itemVal.link;
    if (!link) return null;

    const customTitle =
      typeof itemVal === 'object' ? itemVal.title || itemVal.name : undefined;
    const customIcon = typeof itemVal === 'object' ? itemVal.icon : undefined;

    let product = null;
    if (link.startsWith('/p/')) {
      const slug = link.replace('/p/', '');
      product = getProductById(slug);
    }

    const title =
      customTitle ||
      TITLE_MAP[key.toLowerCase()] ||
      (product ? product.name : humanizeKey(key));

    const value = product ? product.name : resolveDisplay(link);

    let iconNode: React.ReactNode = null;
    if (customIcon) {
      if (customIcon.startsWith('/') || customIcon.startsWith('http')) {
        iconNode = (
          <img
            src={customIcon}
            alt={title}
            className="w-4 h-4 object-contain rounded-sm"
          />
        );
      }
    }
    if (!iconNode && ICON_MAP[key.toLowerCase()]) {
      iconNode = ICON_MAP[key.toLowerCase()];
    }
    if (!iconNode && product?.icon) {
      iconNode = (
        <img
          src={product.icon}
          alt={title}
          className="w-4 h-4 object-contain rounded-sm"
        />
      );
    }
    if (!iconNode) {
      iconNode = <FaGlobe />;
    }

    return {
      key,
      title,
      value,
      link: resolveLink(link),
      icon: iconNode,
    };
  };

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body">
        <div className="mx-3">
          <h5 className="card-title">
            <span className="text-base-content opacity-70">Sites</span>
          </h5>
        </div>
        <div className="text-base-content text-opacity-60">
          {loading || !profile ? (
            renderSkeleton()
          ) : (
            <Fragment>
              {website &&
                Object.entries(website).map(([key, val]) => {
                  const item = resolveItem(key, val);
                  if (!item) return null;
                  return (
                    <ListItem
                      key={item.key}
                      icon={item.icon}
                      title={item.title}
                      value={item.value}
                      link={item.link}
                    />
                  );
                })}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebSitesCard;
