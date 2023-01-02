import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath, useParams} from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import {Path} from '~/config/path';
import {http} from '~/helper/http';
import CommonHeader from '~/layouts/List/CommonHeader';
import {Head} from '~/outlet/Head';
import {APIs, QueryKey} from '~/types/http';
import {IBreadcrumbs} from '~/types/interfaceCommon';
import {IDeviceDetail} from './types/device';

const DeviceDetail = () => {
  const {t} = useTranslation();
  const {id: deviceId} = useParams();

  const {data: deviceData, isLoading} = useQuery({
    enabled: !!deviceId,
    queryKey: [QueryKey.DEVICE_DETAIL, deviceId],
    queryFn: () => http.get<IDeviceDetail>(generatePath(APIs.DEVICE_DETAIL, {id: deviceId || ''})),
  });
  const pageTitle = deviceData?.name || `${t('device.detail')}`;

  const breadcrumbData: IBreadcrumbs['data'] = [
    {title: t('device.pageTitle'), url: Path.DEVICES},
    {title: pageTitle},
  ];

  useEffect(() => {
    console.log(deviceData);
  }, [deviceData]);

  return (
    <>
      <Head title={pageTitle} />
      <div>
        <Breadcrumb data={breadcrumbData} />
        <CommonHeader title={pageTitle} />
        {isLoading ? 'Loading' : 'Details'}
      </div>
    </>
  );
};

export default DeviceDetail;
