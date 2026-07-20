import { Fragment } from 'react';
import { FaToolbox, FaGamepad, FaMagic } from 'react-icons/fa';
import { Profile } from '../../interfaces/profile';
import { SanitizedTool } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

type Props = {
  profile: Profile | null;
  loading: boolean;
  tool: SanitizedTool;
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
 * Renders the tools card component.
 *
 * @param {Object} profile - The profile object.
 * @param {boolean} loading - Indicates whether the data is loading.
 * @param {Object} website - The website object.
 * @return {JSX.Element} The website card component.
 */
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
                  value={tool.magicBox}
                  link={`https://${tool.magicBox}`}
                />
              )}
              {tool?.gameBox && (
                <ListItem
                  icon={<FaGamepad />}
                  title="Game Box"
                  value={tool.gameBox}
                  link={`https://${tool.gameBox}`}
                />
              )}
              {tool?.toolBox && (
                <ListItem
                  icon={<FaToolbox />}
                  title="Tool Box"
                  value={tool.toolBox}
                  link={`https://${tool.toolBox}`}
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
