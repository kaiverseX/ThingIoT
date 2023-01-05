import {Autocomplete, Loader, ActionIcon} from '@mantine/core';
import {UseFormReturnType} from '@mantine/form';
import {useDebouncedValue} from '@mantine/hooks';
import {IconX} from '@tabler/icons';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {DEBOUNCE_TIME} from '~/config/system';
import {http} from '~/helper/http';
import {QueryKey, APIs} from '~/types/http';
import {IListResponse} from '~/types/interfaceCommon';

/**
 * A single autocomplete select with data list from server.
 * ___
 * @param itemProps define key mapping to values for display and set field value.
 * @description
 *  `value` a string to display on input field
 *
 *  `label` a string to display on autocomplete suggestion
 *
 *  `keyData` key mapping for items value. `itemData[keyData]` value will be set to form.
 *
 */
const AutocompleteAsync = <T, TItem>({
  form,
  controlField,
  queryKey,
  api,
  itemProps,
}: {
  form: UseFormReturnType<T>;
  controlField: keyof T;
  queryKey: QueryKey;
  api: APIs;
  itemProps: {value: keyof TItem; label: keyof TItem; keyData: keyof TItem};
}) => {
  const {t} = useTranslation();
  const [textSearch, setTextSearch] = useState('');
  const [textSearchDebounced] = useDebouncedValue(textSearch, DEBOUNCE_TIME);

  const fieldValue = form.values[controlField];
  const filterAutocomplete = {
    textSearchDebounced,
    page: 0,
    pageSize: 100,
    sortOrder: 'ASC',
    sortProperty: 'name',
  };

  const {data: listDeviceProfiles, isFetching} = useQuery({
    queryKey: [queryKey, textSearchDebounced],
    queryFn: () => http.get<IListResponse<TItem>>(api, {params: filterAutocomplete}),
    keepPreviousData: true,
  });

  const renderRightSection = isFetching ? (
    <Loader size={16} />
  ) : (
    fieldValue && (
      <ActionIcon
        onClick={() => {
          form.setFieldValue(controlField, undefined as never);
          setTextSearch('');
        }}
      >
        <IconX size={16} />
      </ActionIcon>
    )
  );

  return (
    <Autocomplete
      value={textSearch}
      label={t('device.deviceProfile')}
      data={
        listDeviceProfiles?.data?.map((item) => ({
          value: item[itemProps.value] as string,
          label: item[itemProps.label],
          itemData: item[itemProps.keyData],
        })) || []
      }
      onItemSubmit={({itemData}) => itemData && form.setFieldValue(controlField, itemData)}
      onChange={(e) => !fieldValue && setTextSearch(e)} // can't search if an item is selected. Need to de-select first.
      onBlur={() => !fieldValue && setTextSearch('')} // remove textSearch when no item is selected and it be outfocused.
      rightSection={renderRightSection}
      nothingFound={t('common.no_data')}
      withAsterisk
      error={form.errors[controlField]}
    />
  );
};

// The Select component still can't fit with requirement and it has some UI bugs with below implementation.
// <Select
//   label={t('device.deviceProfile')}
//   value={formDeviceValues.deviceProfileId?.id}
//   searchable
//   data={
//     listDeviceProfiles?.data?.map(({id, name}) => ({
//       value: id.id,
//       label: name,
//       deviceProfileId: id,
//     })) || []
//   }
//   onChange={(v) => v && setFieldValue('deviceProfileId', {id: v, entityType: 'DEVICE_PROFILE'})}
//   onSearchChange={setSearchProfile}
//   rightSection={
//     isFetching ? (
//       <Loader size={16} />
//     ) : (
//       formDeviceValues.deviceProfileId && (
//         <ActionIcon
//           onClick={() => {
//             setFieldValue('deviceProfileId', undefined);
//             setSearchProfile('');
//           }}
//         >
//           <IconX size={16} />
//         </ActionIcon>
//       )
//     )
//   }
//   nothingFound={t('common.no_data')}
//   withAsterisk
//   error={errors.deviceProfileId}
// />;

export default AutocompleteAsync;
