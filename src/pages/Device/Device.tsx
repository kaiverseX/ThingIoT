import {TextInput, ThemeIcon, Title} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useDebouncedValue} from '@mantine/hooks';
import {IconCircleCheck, IconSearch} from '@tabler/icons';
import {useQuery} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {DataTableColumn} from 'mantine-datatable';
import {useTranslation} from 'react-i18next';
import {useSearchParams} from 'react-router-dom';

import {DATE_TIME_FORMAT, paginationConfig} from '~/config/system';
import {http} from '~/helper/http';
import {safeAnyToNumber} from '~/util/primitiveHandle';

import {APIs, QueryKey} from '~/types/http';
import {IFilter, IListResponse, TSortOrder} from '~/types/interfaceCommon';
import {IDeviceFilter, IDeviceList} from './types/device';

import DataGrid from '~/components/DataGrid';
import {Head} from '~/outlet/Head';

const Device = () => {
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = {
    page: safeAnyToNumber(searchParams.get('page')),
    pageSize: safeAnyToNumber(searchParams.get('pageSize'), paginationConfig.pageSizePool[0]),
    sortOrder: (searchParams.get('sortOrder') as TSortOrder) || 'DESC',
    sortProperty: searchParams.get('sortProperty') || '',
  } as IFilter;

  const {values: filterValues, setFieldValue} = useForm<IDeviceFilter>({
    initialValues: {
      ...queryParams,
      textSearch: '',
      deviceProfileId: '',
    },
  });
  const [searchDebounced] = useDebouncedValue(filterValues.textSearch, 400);

  const {data: deviceList, isLoading} = useQuery({
    queryKey: [QueryKey.DEVICES, searchDebounced, queryParams],
    queryFn: () =>
      http.get<IListResponse<IDeviceList>>(APIs.DEVICES, {
        params: {...filterValues, ...queryParams},
      }),
    keepPreviousData: true,
  });

  const columnConfig: DataTableColumn<IDeviceList>[] = [
    {accessor: 'name'},
    {accessor: 'deviceProfileName', title: t('device.deviceProfile')},
    {accessor: 'label'},
    {accessor: 'customerTitle', title: t('device.customer')},
    {
      accessor: 'customerIsPublic',
      title: t('device.public'),
      render: ({customerIsPublic}) =>
        customerIsPublic && (
          <ThemeIcon radius="xl" variant="light" color="green">
            <IconCircleCheck />
          </ThemeIcon>
        ),
      textAlignment: 'center',
    },
    {
      accessor: 'additionalInfo.gateway',
      title: t('device.isGateway'),
      render: ({additionalInfo}) =>
        additionalInfo?.gateway && (
          <ThemeIcon radius="xl" variant="light" color="green">
            <IconCircleCheck />
          </ThemeIcon>
        ),
      textAlignment: 'center',
    },
    {
      accessor: 'createdTime',
      title: t('device.createAt'),
      render: ({createdTime}) => dayjs(createdTime).format(DATE_TIME_FORMAT),
    },
  ];

  return (
    <>
      <Head title={t('device.pageTitle')} />
      <div className="flex flex-col gap-4">
        <Title>{t('device.pageTitle')}</Title>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,_1fr))] gap-4">
          <TextInput
            placeholder={t('device.filter.keyword')}
            value={filterValues.textSearch}
            onChange={(event) => setFieldValue('textSearch', event.currentTarget.value)}
            rightSection={<IconSearch size={14} />}
            maxLength={255}
            aria-label="Filter by device name input"
          />
        </div>
        <DataGrid
          fetching={isLoading}
          columns={columnConfig}
          records={deviceList?.data}
          recordCount={deviceList?.totalElements}
        />
      </div>
    </>
  );
};

export default Device;
