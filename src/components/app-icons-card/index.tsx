import { Fragment } from 'react';
import LazyImage from '../lazy-image';
import { skeleton } from '../../utils';
import { SanitizedApps } from '../../interfaces/sanitized-config';

const AppIconsCard = ({
  apps,
  loading,
}: {
  apps: SanitizedApps;
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 12; index++) {
      array.push(
        <div className="flex flex-col items-center gap-2" key={index}>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            {skeleton({
              widthCls: 'w-full',
              heightCls: 'h-full',
              shape: '',
            })}
          </div>
          <div>
            {skeleton({
              widthCls: 'w-14',
              heightCls: 'h-3',
            })}
          </div>
        </div>,
      );
    }
    return array;
  };

  const renderApps = () => {
    return apps.items.map((item, index) => (
      <a
        className="flex flex-col items-center gap-2 group cursor-pointer"
        key={index}
        href={item.link}
        onClick={(e) => {
          e.preventDefault();

          window?.open(item.link, '_blank');
        }}
      >
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-md ring-2 ring-base-300 ring-offset-2 ring-offset-base-100 group-hover:ring-primary group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
          <LazyImage
            src={item.imageUrl}
            alt={item.name}
            placeholder={skeleton({
              widthCls: 'w-full',
              heightCls: 'h-full',
              shape: '',
            })}
          />
        </div>
        <span className="text-xs text-base-content text-opacity-70 group-hover:text-primary transition-colors duration-300 text-center leading-tight max-w-[4.5rem] truncate">
          {item.name}
        </span>
      </a>
    ));
  };

  return (
    <Fragment>
      <div className="card shadow-lg compact bg-base-100">
        <div className="card-body">
          {apps.header && (
            <div className="mx-3">
              <h5 className="card-title">
                <span className="text-base-content opacity-70">
                  {apps.header}
                </span>
              </h5>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-4 py-2">
            {loading ? renderSkeleton() : renderApps()}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppIconsCard;
