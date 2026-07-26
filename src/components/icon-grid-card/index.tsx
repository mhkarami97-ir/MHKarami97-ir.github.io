import LazyImage from '../lazy-image';
import { skeleton } from '../../utils';

type IconGridItem = {
  name: string;
  imageUrl: string;
  link: string;
};

type Props = {
  header?: string;
  items: IconGridItem[];
  loading: boolean;
};

const IconGridCard = ({ header, items, loading }: Props) => {
  const renderSkeleton = () => {
    return Array.from({ length: 12 }, (_, index) => (
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
      </div>
    ));
  };

  const renderItems = () => {
    return items.map((item, index) => (
      <a
        className="flex flex-col items-center gap-2 group cursor-pointer"
        key={`${item.link}-${index}`}
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
    <div className="col-span-1 lg:col-span-2">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <div className="card compact bg-base-100 shadow bg-opacity-40">
            <div className="card-body rtl">
              {header && (
                <div className="mx-3 flex items-center justify-between mb-2">
                  <h5 className="card-title">
                    <span className="text-base-content opacity-70">{header}</span>
                  </h5>
                </div>
              )}
              <div className="col-span-2">
                <div className="flex flex-wrap justify-center gap-4 py-2">
                  {loading ? renderSkeleton() : renderItems()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconGridCard;
