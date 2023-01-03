import {Breadcrumbs, Button} from '@mantine/core';
import {Link} from 'react-router-dom';
import {IBreadcrumbs} from '~/types/interfaceCommon';

const Breadcrumb = ({data, separator}: IBreadcrumbs) => {
  const renderBreadcrumb = data.map(({title, url}, index) => (
    <Button
      key={index}
      className={url ? '' : 'dark:text-gray-400'}
      component={Link}
      to={url || ''}
      compact
      variant="subtle"
      disabled={!url}
    >
      {title}
    </Button>
  ));

  return (
    <Breadcrumbs className="mb-4" separator={separator}>
      {renderBreadcrumb}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
