import {DataTable, DataTableProps} from 'mantine-datatable';
import {useSearchParams} from 'react-router-dom';
import {IFilter} from '~/types/interfaceCommon';
import {safeAnyToNumber} from '~/util/primitiveHandle';
import {paginationConfig} from '~/config/system';

const DataGrid = <T,>({recordCount, ...props}: DataTableProps<T> & {recordCount?: number}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {page, pageSize} = {
    page: safeAnyToNumber(searchParams.get('page')) + 1,
    pageSize: safeAnyToNumber(searchParams.get('pageSize'), paginationConfig.pageSizePool[0]),
    // sortOrder: (searchParams.get('sortOrder') as TSortOrder) || 'DESC',
    // sortProperty: searchParams.get('sortProperty') || '',
  } as IFilter;

  const updateSearchParams = (param: {[k: string]: string | number}) => {
    setSearchParams((v) => ({...v, ...param}), {replace: true});
  };

  return (
    <DataTable
      className="flex-1"
      page={page}
      onPageChange={(p) => updateSearchParams({page: p - 1})}
      totalRecords={recordCount || 0}
      recordsPerPage={pageSize}
      recordsPerPageOptions={paginationConfig.pageSizePool}
      onRecordsPerPageChange={(s) => updateSearchParams({page: 0, pageSize: s})}
      paginationSize="md"
      verticalSpacing="sm"
      highlightOnHover
      {...props}
    />
  );
};

export default DataGrid;
