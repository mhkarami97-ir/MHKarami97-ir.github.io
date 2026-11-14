import { ReactNode } from 'react';
import { SanitizedEducation } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const ListItem = ({
  time,
  degree,
  institution,
}: {
  time: ReactNode;
  degree?: ReactNode;
  institution?: ReactNode;
}) => (
  <li className="mb-5 ml-4">
    <div
          className="absolute w-2 h-2 bg-primary rounded-full border border-primary mt-1.5"
          style={{ left: '-4.5px' }}
        ></div>
    <div className="my-0.5 text-xs">{time}</div>
    <h3 className="font-semibold">{degree}</h3>
    <div className="mb-4 font-normal">{institution}</div>
  </li>
);

const EducationCard = ({ educations, loading }: {
  educations: SanitizedEducation[];
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    var array = [];
    for (var index = 0; index < 2; index++) {
      array.push(
        <ListItem
          key={index}
          time={skeleton({ widthCls: 'w-5/12', heightCls: 'h-4' })}
          degree={skeleton({
            widthCls: 'w-6/12',
            heightCls: 'h-4',
            className: 'my-1.5',
          })}
          institution={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
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
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">Education</span>
            )}
          </h5>
        </div>
        <div className="text-base-content text-opacity-60">
          <ol className="relative border-l border-base-300 border-opacity-30 my-2 mx-4">
            {loading ? renderSkeleton() : educations.map((item, index) => (
              <ListItem
                key={index}
                time={`${item.from} - ${item.to}`}
                degree={item.degree}
                institution={item.institution}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
