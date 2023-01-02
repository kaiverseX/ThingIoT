import {useTranslation} from 'react-i18next';
import Breadcrumb from '~/components/Breadcrumb';
import {Path} from '~/config/path';
import CommonHeader from '~/layouts/List/CommonHeader';
import {Head} from '~/outlet/Head';
import {IBreadcrumbs} from '~/types/interfaceCommon';

const DeviceCreate = () => {
  const {t} = useTranslation();

  const breadcrumbData: IBreadcrumbs['data'] = [
    {title: t('device.pageTitle'), url: Path.DEVICES},
    {title: t('device.add')},
  ];

  return (
    <>
      <Head title={t('device.add')} />
      <div>
        <Breadcrumb data={breadcrumbData} />
        <CommonHeader title={t('device.add')} />
      </div>
    </>
  );
};

export default DeviceCreate;
