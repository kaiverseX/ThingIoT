import {Title, TextInput, ThemeIcon} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useQuery} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {DataTable, DataTableColumn} from 'mantine-datatable';

import {DATE_TIME_FORMAT, paginationConfig} from '~/config/system';
import {http} from '~/helper/http';

import {Head} from '~/outlet/Head';
import {APIs, QueryKey} from '~/types/http';
import {IDeviceFilter, IDeviceList} from './types/device';
import {IListResponse} from '~/types/interfaceCommon';
import dayjs from 'dayjs';
import {IconCircleCheck, IconSearch} from '@tabler/icons';
import {useDebouncedValue} from '@mantine/hooks';

const Device = () => {
  const {t} = useTranslation();
  const {
    values: filterValues,
    setValues,
    setFieldValue,
  } = useForm<IDeviceFilter>({
    initialValues: {
      textSearch: '',
      deviceProfileId: '',
      page: 0,
      pageSize: paginationConfig.pageSizePool[0],
      sortOrder: 'DESC',
      sortProperty: 'createdTime',
    },
  });
  const [searchDebounced] = useDebouncedValue(filterValues.textSearch, 400);

  const {data: deviceList, isLoading} = useQuery({
    queryKey: [
      QueryKey.DEVICES,
      searchDebounced,
      filterValues.page,
      filterValues.pageSize,
      filterValues.sortOrder,
      filterValues.sortProperty,
    ],
    queryFn: () => http.get<IListResponse<IDeviceList>>(APIs.DEVICES, {params: filterValues}),
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

        <DataTable
          className="flex-1"
          fetching={isLoading}
          records={deviceList?.data}
          columns={columnConfig}
          page={filterValues.page + 1}
          onPageChange={(p) => setFieldValue('page', p - 1)}
          totalRecords={deviceList?.totalElements}
          recordsPerPage={filterValues.pageSize}
          recordsPerPageOptions={paginationConfig.pageSizePool}
          onRecordsPerPageChange={(s) => setValues((v) => ({...v, page: 0, pageSize: s}))}
          paginationSize="md"
          verticalSpacing="sm"
          highlightOnHover
        />
      </div>
    </>
  );
};

export default Device;
