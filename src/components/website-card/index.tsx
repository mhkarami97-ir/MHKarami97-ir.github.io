import { Fragment } from 'react';
import {
  FaCarSide,
  FaWrench,
  FaShoppingBag,
  FaHome,
} from 'react-icons/fa';
import { Profile } from '../../interfaces/profile';
import {
  SanitizedWebsite,
} from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

type Props = {
  profile: Profile | null;
  loading: boolean;
  website: SanitizedWebsite;
};

const ListItem: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
  link?: string;
  skeleton?: boolean;
}> = ({ icon, title, value, link, skeleton = false }) => {
  return (
    <div className="flex justify-start py-2 px-1 items-center">
      <div className="flex-grow font-medium gap-2 flex items-center my-1">
        {icon} {title}
      </div>
      <div
        className={`${
          skeleton ? 'flex-grow' : ''
        } text-sm font-normal text-right mr-2 ml-3 ${link ? 'truncate' : ''}`}
        style={{
          wordBreak: 'break-word',
        }}
      >
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="flex justify-start py-2 px-1 items-center"
        >
          {value}
        </a>
      </div>
    </div>
  );
};
/**
 * Renders the website card component.
 *
 * @param {Object} profile - The profile object.
 * @param {boolean} loading - Indicates whether the data is loading.
 * @param {Object} website - The website object.
 * @return {JSX.Element} The website card component.
 */
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
        <div className="text-base-content text-opacity-60">
          {loading || !profile ? (
            renderSkeleton()
          ) : (
            <Fragment>            
              {website?.travel && (
                <ListItem
                  icon={<FaCarSide />}
                  title="Travel"
                  value={website.travel}
                  link={`https://${website.travel}`}
                />
              )}
              {website?.tool && (
                <ListItem
                  icon={<FaWrench />}
                  title="Tool"
                  value={website.tool}
                  link={`https://${website.tool}`}
                />
              )}
              {website?.shop && (
                <ListItem
                  icon={<FaShoppingBag />}
                  title="Shop"
                  value={website.shop}
                  link={`https://${website.shop}`}
                />
              )}
              {website?.house && (
                <ListItem
                  icon={<FaHome />}
                  title="House"
                  value={website.house}
                  link={`https://${website.house}`}
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
