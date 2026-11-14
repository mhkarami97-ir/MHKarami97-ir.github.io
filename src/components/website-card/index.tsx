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
} from 'react-icons/fa';
import { Profile } from '../../interfaces/profile';
import { SanitizedWebsite } from '../../interfaces/sanitized-config';
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
          <span className="text-primary group-hover:scale-110 transition-transform">
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
              {website?.travel && (
                <ListItem
                  icon={<FaCarSide />}
                  title="Travel"
                  value={resolveDisplay(website.travel)}
                  link={resolveLink(website.travel)}
                />
              )}
              {website?.tour && (
                <ListItem
                  icon={<FaCarSide />}
                  title="Tour"
                  value={resolveDisplay(website.tour)}
                  link={resolveLink(website.tour)}
                />
              )}
              {website?.experience && (
                <ListItem
                  icon={<FaWrench />}
                  title="Experience"
                  value={resolveDisplay(website.experience)}
                  link={resolveLink(website.experience)}
                />
              )}
              {website?.shop && (
                <ListItem
                  icon={<FaShoppingBag />}
                  title="Shop"
                  value={resolveDisplay(website.shop)}
                  link={resolveLink(website.shop)}
                />
              )}
              {website?.house && (
                <ListItem
                  icon={<FaHome />}
                  title="House"
                  value={resolveDisplay(website.house)}
                  link={resolveLink(website.house)}
                />
              )}
              {website?.chavooshan && (
                <ListItem
                  icon={<FaHatCowboySide />}
                  title="Chavooshan"
                  value={resolveDisplay(website.chavooshan)}
                  link={resolveLink(website.chavooshan)}
                />
              )}
              {website?.zolfdota && (
                <ListItem
                  icon={<FaSortAmountUp />}
                  title="ZolfDota"
                  value={resolveDisplay(website.zolfdota)}
                  link={resolveLink(website.zolfdota)}
                />
              )}
              {website?.dorgardoon && (
                <ListItem
                  icon={<FaThumbtack />}
                  title="DorGardoon"
                  value={resolveDisplay(website.dorgardoon)}
                  link={resolveLink(website.dorgardoon)}
                />
              )}
              {website?.molkrey && (
                <ListItem
                  icon={<FaMoneyBillWave />}
                  title="MolkRey"
                  value={resolveDisplay(website.molkrey)}
                  link={resolveLink(website.molkrey)}
                />
              )}
              {website?.zamaanak && (
                <ListItem
                  icon={<FaBusinessTime />}
                  title="Zamaanak"
                  value={resolveDisplay(website.zamaanak)}
                  link={resolveLink(website.zamaanak)}
                />
              )}
              {website?.hengam && (
                <ListItem
                  icon={<FaUserClock />}
                  title="Hengam"
                  value={resolveDisplay(website.hengam)}
                  link={resolveLink(website.hengam)}
                />
              )}
              {website?.crm && (
                <ListItem
                  icon={<FaChessBishop />}
                  title="crm"
                  value={resolveDisplay(website.crm)}
                  link={resolveLink(website.crm)}
                />
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebSitesCard;
