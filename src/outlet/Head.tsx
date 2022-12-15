import {Helmet} from 'react-helmet-async';
import {SERVICE_NAME} from '~/config/system';

export const Head = ({title, description}: {title?: string; description?: string}) => {
  const headTitle = `${title || 'ThingIoT'} | ${SERVICE_NAME}`;
  const headDesc = description ?? `This is ${SERVICE_NAME}`;
  return (
    <Helmet>
      <title>{headTitle}</title>
      <meta name="description" content={headDesc} />
      <meta property="og:title" content={headTitle} />
      <meta property="og:description" content={headDesc} />
      <meta name="robots" content="noindex" />
    </Helmet>
  );
};
