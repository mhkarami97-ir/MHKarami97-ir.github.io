import { Fragment } from 'react';
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillMediumSquare,
} from 'react-icons/ai';
import { CgDribbble } from 'react-icons/cg';
import {
  FaBehanceSquare,
  FaDev,
  FaFacebook,
  FaGlobe,
  FaLinkedin,
  FaMastodon,
  FaReddit,
  FaSkype,
  FaStackOverflow,
  FaTelegram,
  FaYoutube,
  FaVideo,
  FaCode,
  FaEdge,
  FaWhatsapp,
} from 'react-icons/fa';
import { FaSquareThreads, FaBagShopping } from 'react-icons/fa6';
import { RiMailFill, RiPhoneFill } from 'react-icons/ri';
import { SiResearchgate, SiX, SiUdemy } from 'react-icons/si';
import { SiEitaa, SiBale, SiGap, SiSoroush, SiRubika } from './icons';
import { Profile } from '../../interfaces/profile';
import {
  SanitizedGithub,
  SanitizedSocial,
} from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

type Props = {
  profile: Profile | null;
  loading: boolean;
  social: SanitizedSocial;
  github: SanitizedGithub;
};

const getFormattedMastodonValue = (
  mastodonValue: string,
  isLink: boolean,
): string => {
  const [username, server] = mastodonValue.split('@');

  if (isLink) {
    return `https://${server}/@${username}`;
  } else {
    return `${username}@${server}`;
  }
};

const getFormattedEdgeAddons = (
  edgeValue: string,
): { value: string; link: string } => {
  if (edgeValue.includes('developer=')) {
    const dev = edgeValue.split('developer=')[1]?.split('&')[0];
    return {
      value: dev ? decodeURIComponent(dev) : edgeValue,
      link: edgeValue.startsWith('http') ? edgeValue : `https://${edgeValue}`,
    };
  }
  return {
    value: edgeValue,
    link: `https://microsoftedge.microsoft.com/addons/search?developer=${encodeURIComponent(
      edgeValue,
    )}`,
  };
};

const getFormattedWhatsApp = (
  whatsappValue: string,
): { value: string; link: string } => {
  if (whatsappValue.includes('|')) {
    const [val, link] = whatsappValue.split('|');
    return {
      value: val.trim(),
      link: link.trim().startsWith('http')
        ? link.trim()
        : `https://${link.trim()}`,
    };
  }

  if (whatsappValue.includes('whatsapp.com/channel/')) {
    return {
      value: 'mhkarami_97',
      link: whatsappValue.startsWith('http')
        ? whatsappValue
        : `https://${whatsappValue}`,
    };
  }

  if (whatsappValue.startsWith('0029')) {
    return {
      value: 'mhkarami_97',
      link: `https://whatsapp.com/channel/${whatsappValue}`,
    };
  }

  const clean = whatsappValue.replace(/^@/, '').replace(/\s+/g, '');
  if (/^\+?\d+$/.test(clean)) {
    return {
      value: whatsappValue,
      link: `https://wa.me/${clean.replace(/^\+/, '')}`,
    };
  }

  return {
    value: whatsappValue,
    link: `https://whatsapp.com/channel/${whatsappValue}`,
  };
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
        <span className="text-primary flex items-center justify-center">
          {icon}
        </span>
        <span>{title}</span>
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
/**
 * Renders the details card component.
 *
 * @param {Object} profile - The profile object.
 * @param {boolean} loading - Indicates whether the data is loading.
 * @param {Object} social - The social object.
 * @param {Object} github - The GitHub object.
 * @return {JSX.Element} The details card component.
 */
const DetailsCard = ({ profile, loading, social, github }: Props) => {
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
              <ListItem
                icon={<AiFillGithub />}
                title="GitHub"
                value={github.username}
                link={`https://github.com/${github.username}`}
              />
              {social?.researchGate && (
                <ListItem
                  icon={<SiResearchgate />}
                  title="ResearchGate"
                  value={social.researchGate}
                  link={`https://www.researchgate.net/profile/${social.researchGate}`}
                />
              )}
              {social?.mastodon && (
                <ListItem
                  icon={<FaMastodon />}
                  title="Mastodon"
                  value={getFormattedMastodonValue(social.mastodon, false)}
                  link={getFormattedMastodonValue(social.mastodon, true)}
                />
              )}
              {social?.linkedin && (
                <ListItem
                  icon={<FaLinkedin />}
                  title="LinkedIn"
                  value={social.linkedin}
                  link={`https://www.linkedin.com/in/${social.linkedin}`}
                />
              )}
              {social?.dribbble && (
                <ListItem
                  icon={<CgDribbble />}
                  title="Dribbble"
                  value={social.dribbble}
                  link={`https://dribbble.com/${social.dribbble}`}
                />
              )}
              {social?.behance && (
                <ListItem
                  icon={<FaBehanceSquare />}
                  title="Behance"
                  value={social.behance}
                  link={`https://www.behance.net/${social.behance}`}
                />
              )}
              {social?.facebook && (
                <ListItem
                  icon={<FaFacebook />}
                  title="Facebook"
                  value={social.facebook}
                  link={`https://www.facebook.com/${social.facebook}`}
                />
              )}
              {social?.instagram && (
                <ListItem
                  icon={<AiFillInstagram />}
                  title="Instagram"
                  value={social.instagram}
                  link={`https://www.instagram.com/${social.instagram}`}
                />
              )}
              {social?.reddit && (
                <ListItem
                  icon={<FaReddit />}
                  title="Reddit"
                  value={social.reddit}
                  link={`https://www.reddit.com/user/${social.reddit}`}
                />
              )}
              {social?.threads && (
                <ListItem
                  icon={<FaSquareThreads />}
                  title="Threads"
                  value={social.threads}
                  link={`https://www.threads.net/@${social.threads.replace('@', '')}`}
                />
              )}
              {social?.youtube && (
                <ListItem
                  icon={<FaYoutube />}
                  title="YouTube"
                  value={`${social.youtube}`}
                  link={`https://www.youtube.com/@${social.youtube}`}
                />
              )}
              {social?.aparat && (
                <ListItem
                  icon={<FaVideo />}
                  title="Aparat"
                  value={`${social.aparat}`}
                  link={`https://aparat.com/${social.aparat}`}
                />
              )}
              {social?.udemy && (
                <ListItem
                  icon={<SiUdemy />}
                  title="Udemy"
                  value={social.udemy}
                  link={`https://www.udemy.com/user/${social.udemy}`}
                />
              )}
              {social?.medium && (
                <ListItem
                  icon={<AiFillMediumSquare />}
                  title="Medium"
                  value={social.medium}
                  link={`https://medium.com/@${social.medium}`}
                />
              )}
              {social?.dev && (
                <ListItem
                  icon={<FaDev />}
                  title="Dev"
                  value={social.dev}
                  link={`https://dev.to/${social.dev}`}
                />
              )}
              {social?.stackoverflow && (
                <ListItem
                  icon={<FaStackOverflow />}
                  title="Stack Overflow"
                  value={social.stackoverflow.split('/').slice(-1)}
                  link={`https://stackoverflow.com/users/${social.stackoverflow}`}
                />
              )}
              {social?.website && (
                <ListItem
                  icon={<FaGlobe />}
                  title="Website"
                  value={social.website
                    .replace('https://', '')
                    .replace('http://', '')}
                  link={
                    !social.website.startsWith('http')
                      ? `http://${social.website}`
                      : social.website
                  }
                />
              )}
              {social?.skype && (
                <ListItem
                  icon={<FaSkype />}
                  title="Skype"
                  value={social.skype}
                  link={`skype:${social.skype}?chat`}
                />
              )}
              {social?.telegram && (
                <ListItem
                  icon={<FaTelegram />}
                  title="Telegram"
                  value={social.telegram}
                  link={`https://t.me/${social.telegram.replace(/^@/, '')}`}
                />
              )}
              {social?.whatsapp && (
                <ListItem
                  icon={<FaWhatsapp />}
                  title="WhatsApp"
                  value={getFormattedWhatsApp(social.whatsapp).value}
                  link={getFormattedWhatsApp(social.whatsapp).link}
                />
              )}
              {social?.eitaa && (
                <ListItem
                  icon={<SiEitaa />}
                  title="Eitaa"
                  value={social.eitaa}
                  link={`https://eitaa.com/${social.eitaa.replace(/^@/, '')}`}
                />
              )}
              {social?.rubika && (
                <ListItem
                  icon={<SiRubika />}
                  title="Rubika"
                  value={social.rubika}
                  link={`https://rubika.ir/${social.rubika.replace(/^@/, '')}`}
                />
              )}
              {social?.bale && (
                <ListItem
                  icon={<SiBale />}
                  title="Bale"
                  value={social.bale}
                  link={`https://ble.ir/${social.bale.replace(/^@/, '')}`}
                />
              )}
              {social?.gap && (
                <ListItem
                  icon={<SiGap />}
                  title="Gap"
                  value={social.gap}
                  link={`https://gap.im/${social.gap.replace(/^@/, '')}`}
                />
              )}
              {social?.soroush && (
                <ListItem
                  icon={<SiSoroush />}
                  title="Soroush Plus"
                  value={social.soroush}
                  link={`https://splus.ir/${social.soroush.replace(/^@/, '')}`}
                />
              )}
              {social?.phone && (
                <ListItem
                  icon={<RiPhoneFill />}
                  title="Phone"
                  value={social.phone}
                  link={`tel:${social.phone}`}
                />
              )}
              {social?.x && (
                <ListItem
                  icon={<SiX />}
                  title="X"
                  value={social.x}
                  link={`https://x.com/${social.x}`}
                />
              )}
              {social?.leetCode && (
                <ListItem
                  icon={<FaCode />}
                  title="LeetCode"
                  value={social.leetCode}
                  link={`https://leetcode.com/u/${social.leetCode}`}
                />
              )}
              {social?.cafebazaar && (
                <ListItem
                  icon={<FaBagShopping />}
                  title="CafeBazaar"
                  value={social.cafebazaar}
                  link={`https://cafebazaar.ir/developer/${social.cafebazaar}`}
                />
              )}
              {(social?.edgeAddons || social?.microsoftEdge) && (
                <ListItem
                  icon={<FaEdge />}
                  title="Edge Add-ons"
                  value={
                    getFormattedEdgeAddons(
                      (social.edgeAddons || social.microsoftEdge)!,
                    ).value
                  }
                  link={
                    getFormattedEdgeAddons(
                      (social.edgeAddons || social.microsoftEdge)!,
                    ).link
                  }
                />
              )}
              {social?.email && (
                <ListItem
                  icon={<RiMailFill />}
                  title="Email"
                  value={social.email}
                  link={`mailto:${social.email}`}
                />
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
