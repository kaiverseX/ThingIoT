import {Autocomplete, Loader, ActionIcon, AutocompleteProps} from '@mantine/core';
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

interface IAutocompleteProps<TForm, TItem> {
  form: UseFormReturnType<TForm>;
  controlField: keyof TForm;
  queryKey: QueryKey;
  api: APIs;
  itemProps: {value: keyof TItem; label: keyof TItem; keyData: keyof TItem};
}

/**
 * A single autocomplete select with data list from server.
 * ___
 * @param itemProps define key mapping to values for display and set field value.
 * @description
 *  `value` a string to display on input field
 *
 *  `label` a string to display on autocomplete suggestion
 *
 *  `keyData` key mapping for items value
 * ___
 * Additional Info: Value of `TItem[keyData]` will be used for set form field value which is stored at `itemdata` - a html attribute of each rendered item.
 *
 */
const AutocompleteAsync = <TForm, TItem>({
  form,
  controlField,
  queryKey,
  api,
  itemProps,
  ...props
}: IAutocompleteProps<TForm, TItem> & Omit<AutocompleteProps, 'data' | 'form'>) => {
  const {t} = useTranslation();
  const [textSearch, setTextSearch] = useState('');
  const [textSearchDebounced] = useDebouncedValue(textSearch, DEBOUNCE_TIME);

  const fieldValue = form.values[controlField];

  const {data: listDeviceProfiles, isFetching} = useQuery({
    queryKey: [queryKey, textSearchDebounced],
    queryFn: () =>
      http.get<IListResponse<TItem>>(api, {
        params: {
          textSearchDebounced,
          page: 0,
          pageSize: 100,
          sortOrder: 'ASC',
          sortProperty: 'name',
        },
      }),
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
      data={
        listDeviceProfiles?.data?.map((item) => ({
          value: item[itemProps.value] as string,
          label: item[itemProps.label],
          itemdata: item[itemProps.keyData],
        })) || []
      }
      onItemSubmit={({itemdata}) => itemdata && form.setFieldValue(controlField, itemdata)}
      onChange={(e) => !fieldValue && setTextSearch(e)} // if an item is selected, force de-select before search.
      onBlur={() => !fieldValue && setTextSearch('')} // auto remove textSearch if this field was outfocused when no item is selected.
      rightSection={renderRightSection}
      nothingFound={t('common.no_data')}
      error={form.errors[controlField]}
      {...props}
    />
  );
};

// Mantine v5.10: The Select component still can't fit with requirement and it has some UI bugs with below implementation.
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
