import { Fragment } from 'react';
import { FaTelegram } from 'react-icons/fa';
import { skeleton, normalizeTelegramIdentifier } from '../../utils';

type Props = {
  header: string;
  items: Array<{
    name: string;
    id: string;
  }>;
  loading: boolean;
};

const ListItem: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
  link?: string;
  skeleton?: boolean;
}> = ({ icon, title, value, link, skeleton = false }) => {
  return (
    <div className="flex justify-start py-1 px-1 items-center">
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
          className="flex justify-start py-1 px-1 items-center"
        >
          {value}
        </a>
      </div>
    </div>
  );
};

const TelegramListCard = ({ header, items, loading }: Props) => {
  const renderSkeleton = () => {
    return Array.from({ length: 4 }, (_, index) => (
      <ListItem
        key={index}
        skeleton={true}
        icon={skeleton({ widthCls: 'w-4', heightCls: 'h-4' })}
        title={skeleton({ widthCls: 'w-24', heightCls: 'h-4' })}
        value={skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
      />
    ));
  };

  const renderItems = () => {
    return items.map((item, index) => {
      const telegramId = normalizeTelegramIdentifier(item.id);

      return (
        <ListItem
          key={`${telegramId}-${index}`}
          icon={<FaTelegram />}
          title={item.name}
          value={`@${telegramId}`}
          link={`https://t.me/${telegramId}`}
        />
      );
    });
  };

  return (
    <Fragment>
      <div className="card shadow-lg compact bg-base-100">
        <div className="card-body">
          <div className="mx-3">
            <h5 className="card-title">
              <span className="text-base-content opacity-70">{header}</span>
            </h5>
          </div>
          <div className="text-base-content text-opacity-60">
            {loading ? renderSkeleton() : renderItems()}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TelegramListCard;
