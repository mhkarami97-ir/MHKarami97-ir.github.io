import { Fragment } from 'react';
import {
  FaToolbox,
  FaGamepad,
  FaMagic,
  FaCalendarTimes,
  FaDollarSign,
  FaRunning,
  FaTasks,
  FaCalendarCheck,
  FaCar,
  FaBookOpen,
  FaLink,
  FaMotorcycle,
  FaShopify,
  FaWrench,
  FaBurn,
  FaTelegramPlane,
  FaPlane,
  FaUniversity,
  FaAngleDoubleUp,
  FaTools,
  FaHospitalSymbol,
  FaCloud,
  FaLanguage,
  FaPenNib,
  FaBookReader,
  FaVideo,
} from 'react-icons/fa';
import { Profile } from '../../interfaces/profile';
import { SanitizedTool } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import { getProductById } from '../../data/products';

type Props = {
  profile: Profile | null;
  loading: boolean;
  tool: SanitizedTool;
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

const ToolsCard = ({ profile, loading, tool }: Props) => {
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
            <span className="text-base-content opacity-70">Tools</span>
          </h5>
        </div>
        <div className="text-base-content text-opacity-60">
          {loading || !profile ? (
            renderSkeleton()
          ) : (
            <Fragment>
              {tool?.magicBox && (
                <ListItem
                  icon={<FaMagic />}
                  title="Magic Box"
                  value={resolveDisplay(tool.magicBox)}
                  link={resolveLink(tool.magicBox)}
                />
              )}
              {tool?.gameBox && (
                <ListItem
                  icon={<FaGamepad />}
                  title="Game Box"
                  value={resolveDisplay(tool.gameBox)}
                  link={resolveLink(tool.gameBox)}
                />
              )}
              {tool?.toolBox && (
                <ListItem
                  icon={<FaToolbox />}
                  title="Tool Box"
                  value={resolveDisplay(tool.toolBox)}
                  link={resolveLink(tool.toolBox)}
                />
              )}
              {tool?.calender && (
                <ListItem
                  icon={<FaCalendarTimes />}
                  title="Calender"
                  value={resolveDisplay(tool.calender)}
                  link={resolveLink(tool.calender)}
                />
              )}
              {tool?.finance && (
                <ListItem
                  icon={<FaDollarSign />}
                  title="Finance"
                  value={resolveDisplay(tool.finance)}
                  link={resolveLink(tool.finance)}
                />
              )}
              {tool?.sport && (
                <ListItem
                  icon={<FaRunning />}
                  title="Sport"
                  value={resolveDisplay(tool.sport)}
                  link={resolveLink(tool.sport)}
                />
              )}
              {tool?.task && (
                <ListItem
                  icon={<FaTasks />}
                  title="Task"
                  value={resolveDisplay(tool.task)}
                  link={resolveLink(tool.task)}
                />
              )}
              {tool?.checkList && (
                <ListItem
                  icon={<FaCalendarCheck />}
                  title="CheckList"
                  value={resolveDisplay(tool.checkList)}
                  link={resolveLink(tool.checkList)}
                />
              )}
              {tool?.f1 && (
                <ListItem
                  icon={<FaCar />}
                  title="F1"
                  value={resolveDisplay(tool.f1)}
                  link={resolveLink(tool.f1)}
                />
              )}
              {tool?.motogp && (
                <ListItem
                  icon={<FaMotorcycle />}
                  title="MotoGP"
                  value={resolveDisplay(tool.motogp)}
                  link={resolveLink(tool.motogp)}
                />
              )}
              {tool?.shekaste && (
                <ListItem
                  icon={<FaBookOpen />}
                  title="Shekaste"
                  value={resolveDisplay(tool.shekaste)}
                  link={resolveLink(tool.shekaste)}
                />
              )}
              {tool?.ghazal && (
                <ListItem
                  icon={<FaBookReader />}
                  title="ghazal"
                  value={resolveDisplay(tool.ghazal)}
                  link={resolveLink(tool.ghazal)}
                />
              )}
              {tool?.shortLink && (
                <ListItem
                  icon={<FaLink />}
                  title="ShortLink"
                  value={resolveDisplay(tool.shortLink)}
                  link={resolveLink(tool.shortLink)}
                />
              )}
              {tool?.buy && (
                <ListItem
                  icon={<FaShopify />}
                  title="Buy"
                  value={resolveDisplay(tool.buy)}
                  link={resolveLink(tool.buy)}
                />
              )}
              {tool?.service && (
                <ListItem
                  icon={<FaWrench />}
                  title="Service"
                  value={resolveDisplay(tool.service)}
                  link={resolveLink(tool.service)}
                />
              )}
              {tool?.period && (
                <ListItem
                  icon={<FaBurn />}
                  title="Period"
                  value={resolveDisplay(tool.period)}
                  link={resolveLink(tool.period)}
                />
              )}
              {tool?.safar && (
                <ListItem
                  icon={<FaPlane />}
                  title="Safar"
                  value={resolveDisplay(tool.safar)}
                  link={resolveLink(tool.safar)}
                />
              )}
              {tool?.school && (
                <ListItem
                  icon={<FaUniversity />}
                  title="School"
                  value={resolveDisplay(tool.school)}
                  link={resolveLink(tool.school)}
                />
              )}
              {tool?.nerkh && (
                <ListItem
                  icon={<FaAngleDoubleUp />}
                  title="Nerkh"
                  value={resolveDisplay(tool.nerkh)}
                  link={resolveLink(tool.nerkh)}
                />
              )}
              {tool?.health && (
                <ListItem
                  icon={<FaHospitalSymbol />}
                  title="Health"
                  value={resolveDisplay(tool.health)}
                  link={resolveLink(tool.health)}
                />
              )}
              {tool?.weather && (
                <ListItem
                  icon={<FaCloud />}
                  title="Weather"
                  value={resolveDisplay(tool.weather)}
                  link={resolveLink(tool.weather)}
                />
              )}
              {tool?.english && (
                <ListItem
                  icon={<FaLanguage />}
                  title="english"
                  value={resolveDisplay(tool.english)}
                  link={resolveLink(tool.english)}
                />
              )}
              {tool?.memory && (
                <ListItem
                  icon={<FaPenNib />}
                  title="memory"
                  value={resolveDisplay(tool.memory)}
                  link={resolveLink(tool.memory)}
                />
              )}
              {tool?.habit && (
                <ListItem
                  icon={<FaTasks />}
                  title="habit"
                  value={resolveDisplay(tool.habit)}
                  link={resolveLink(tool.habit)}
                />
              )}
              {tool?.movie && (
                <ListItem
                  icon={<FaVideo />}
                  title="movie"
                  value={resolveDisplay(tool.movie)}
                  link={resolveLink(tool.movie)}
                />
              )}
              {tool?.ai && (
                <ListItem
                  icon={<FaTools />}
                  title="AI"
                  value={resolveDisplay(tool.ai)}
                  link={resolveLink(tool.ai)}
                />
              )}
              {tool?.proxy && (
                <ListItem
                  icon={<FaTelegramPlane />}
                  title="Proxy"
                  value={resolveDisplay(tool.proxy)}
                  link={resolveLink(tool.proxy)}
                />
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsCard;
