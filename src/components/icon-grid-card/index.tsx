import LazyImage from '../lazy-image';
import { skeleton } from '../../utils';

type IconGridItem = {
  name: string;
  imageUrl: string;
  link: string;
};

type Props = {
  items: IconGridItem[];
  loading: boolean;
  halfWidth?: boolean;
};

const SKELETON_COUNT = 12;

const SPAN_CLASSES = {
  full: 'col-span-1 lg:col-span-2',
  half: 'col-span-1',
} as const;

const IconGridCard = ({ items, loading, halfWidth = false }: Props) => {
  const renderSkeleton = () =>
    Array.from({ length: SKELETON_COUNT }, (_, index) => (
      <div className="flex flex-col items-center gap-2" key={index}>
        <div className="w-16 h-16 rounded-full overflow-hidden">
          {skeleton({ widthCls: 'w-full', heightCls: 'h-full', shape: '' })}
        </div>
        {skeleton({ widthCls: 'w-14', heightCls: 'h-3' })}
      </div>
    ));

  const renderItems = () =>
    items.map((item, index) => (
      <a
        className="flex flex-col items-center gap-2 group cursor-pointer"
        key={`${item.link}-${index}`}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
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

  return (
    <div className={SPAN_CLASSES[halfWidth ? 'half' : 'full']}>
      <div className="card compact bg-base-100 shadow bg-opacity-40 h-full">
        <div className="card-body rtl">
          <div className="flex flex-wrap justify-center gap-4 py-2">
            {loading ? renderSkeleton() : renderItems()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconGridCard;
