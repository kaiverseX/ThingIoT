import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {DataTable, DataTableProps} from 'mantine-datatable';
import {showNotification} from '@mantine/notifications';
import {useSearchParams} from 'react-router-dom';

import {http} from '~/helper/http';
import {findNotiConfig} from '~/helper/notification';
import {APIs, ENotiCode, QueryKey} from '~/types/http';
import {IFilter, IListResponse} from '~/types/interfaceCommon';
import {safeAnyToNumber} from '~/util/primitiveHandle';
import {DEFAULT_PAGE, DEFAULT_PAGESIZE, PAGESIZE_OPTIONS} from '~/config/system';
import {useTranslation} from 'react-i18next';

interface IDataGridProps {
  queryKey: QueryKey;
  api: APIs;
}

const DataGrid = <T,>({columns, api, queryKey, ...props}: IDataGridProps & DataTableProps<T>) => {
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const getParamsObject = Object.fromEntries(searchParams);

  const queryParams = useMemo<IFilter>(
    () => ({
      ...getParamsObject,
      page: safeAnyToNumber(getParamsObject.page, DEFAULT_PAGE) - 1,
      pageSize: safeAnyToNumber(getParamsObject.pageSize, DEFAULT_PAGESIZE),
      sortOrder: getParamsObject.sortOrder !== 'DESC' ? 'ASC' : 'DESC',
      sortProperty: getParamsObject.sortProperty || '',
    }),
    [searchParams],
  );

  const {data: listData, isFetching} = useQuery({
    queryKey: [queryKey, queryParams],
    queryFn: () => http.get<IListResponse<T>>(api, {params: queryParams}),
    keepPreviousData: true,
    onSuccess: ({totalElements}) => {
      if (totalElements === undefined || !queryParams.page) {
        return;
      }

      const isPagingOutRange = queryParams.page * queryParams.pageSize + 1 > totalElements;
      if (!isPagingOutRange) {
        return;
      }
      showNotification(findNotiConfig(ENotiCode.PAGING_OUT_RANGE));
      updateSearchParams({page: DEFAULT_PAGE.toString()});
    },
  });

  const updateSearchParams = (param: {[k: string]: string}) => {
    setSearchParams({...getParamsObject, ...param}, {replace: true});
  };

  return (
    <DataTable<T>
      fetching={isFetching}
      columns={columns}
      records={listData?.data}
      totalRecords={listData?.totalElements}
      page={queryParams.page + 1}
      onPageChange={(p) => updateSearchParams({page: p.toString()})}
      recordsPerPage={queryParams.pageSize}
      recordsPerPageOptions={PAGESIZE_OPTIONS}
      onRecordsPerPageChange={(s) =>
        updateSearchParams({page: DEFAULT_PAGE.toString(), pageSize: s.toString()})
      }
      paginationSize="md"
      paginationText={({from, to, totalRecords}) =>
        `${t('common.pagination.info', {from, to, totalRecords})}`
      }
      verticalSpacing="sm"
      verticalAlignment="center"
      // highlightOnHover
      {...props}
    />
  );
};

export default DataGrid;
