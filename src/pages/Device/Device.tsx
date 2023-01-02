import {useEffect} from 'react';
import {ActionIcon, Button, TextInput, ThemeIcon} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useDebouncedValue} from '@mantine/hooks';
import {
  IconCircleCheck,
  IconCircleMinus,
  IconEdit,
  IconEye,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons';
import dayjs from 'dayjs';
import {DataTableColumn} from 'mantine-datatable';
import {useTranslation} from 'react-i18next';
import {generatePath, Link, useSearchParams} from 'react-router-dom';

import {DATE_TIME_FORMAT, DEFAULT_PAGE} from '~/config/system';
import {IDeviceFilter, IDeviceList} from './types/device';
import {APIs, QueryKey} from '~/types/http';

import DataGrid from '~/components/DataGrid';
import {Head} from '~/outlet/Head';
import CommonHeader from '~/layouts/List/CommonHeader';
import {Path} from '~/config/path';

const Device = () => {
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const {values: filterValues, getInputProps} = useForm<IDeviceFilter>({
    initialValues: {
      textSearch: '',
      deviceProfileId: '',
    },
  });
  const [searchDebounced] = useDebouncedValue(filterValues.textSearch, 400);

  const renderBooleanCol = (positive?: boolean) =>
    positive ? (
      <ThemeIcon className="h-full" radius="xl" variant="light" color="green" size="sm">
        <IconCircleCheck />
      </ThemeIcon>
    ) : (
      <ThemeIcon className="h-full" radius="xl" variant="light" color="red" size="sm">
        <IconCircleMinus />
      </ThemeIcon>
    );

  const columnConfig: DataTableColumn<IDeviceList>[] = [
    {accessor: 'name'},
    {accessor: 'deviceProfileName', title: t('device.deviceProfile')},
    {accessor: 'label'},
    {accessor: 'customerTitle', title: t('device.customer')},
    {
      accessor: 'customerIsPublic',
      title: t('device.public'),
      render: ({customerIsPublic}) => renderBooleanCol(customerIsPublic),
      textAlignment: 'center',
    },
    {
      accessor: 'additionalInfo.gateway',
      title: t('device.isGateway'),
      render: ({additionalInfo}) => renderBooleanCol(additionalInfo?.gateway),
      textAlignment: 'center',
    },
    {
      accessor: 'createdTime',
      title: t('device.createAt'),
      render: ({createdTime}) => dayjs(createdTime).format(DATE_TIME_FORMAT),
    },
    {
      accessor: 'actions',
      title: t('common.actions'),
      textAlignment: 'right',
      render: ({id}) =>
        id.id && (
          <div className="flex items-center justify-end">
            <ActionIcon
              component={Link}
              color="green"
              to={generatePath(Path.DEVICE_DETAIL, {id: id.id})}
            >
              <IconEye size={16} />
            </ActionIcon>
            <ActionIcon
              component={Link}
              color="blue"
              to={generatePath(Path.DEVICE_UPDATE, {id: id.id})}
            >
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon color="red">
              <IconTrash size={16} />
            </ActionIcon>
          </div>
        ),
    },
  ];

  useEffect(() => {
    // update URLSearchParams based on debounced textSearch value.
    const {textSearch, page, ...rest} = Object.fromEntries(searchParams);
    const newParams = searchDebounced
      ? {textSearch: searchDebounced, page: DEFAULT_PAGE.toString()}
      : undefined;
    setSearchParams({...rest, ...newParams}, {replace: true});
  }, [searchDebounced]);

  return (
    <>
      <Head title={t('device.pageTitle')} />
      <div className="flex h-full flex-col gap-4">
        <CommonHeader title={t('device.pageTitle')}>
          <div>
            <Button component={Link} to={Path.DEVICE_CREATE} leftIcon={<IconPlus />}>
              {t('device.add')}
            </Button>
          </div>
        </CommonHeader>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,_1fr))] gap-4">
          <TextInput
            placeholder={t('device.filter.keyword')}
            rightSection={
              <ThemeIcon className="cursor-pointer" variant="light">
                <IconSearch size={14} />
              </ThemeIcon>
            }
            maxLength={255}
            aria-label={t('device.filter.keyword')}
            {...getInputProps('textSearch')}
          />
        </div>
        <DataGrid<IDeviceList>
          queryKey={QueryKey.DEVICES}
          api={APIs.DEVICES}
          columns={columnConfig}
        />
      </div>
    </>
  );
};

export default Device;
