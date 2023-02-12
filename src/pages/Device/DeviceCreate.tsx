import {useMemo} from 'react';
import {Button, Checkbox, Divider, Select, Textarea, TextInput} from '@mantine/core';
import {useForm, zodResolver} from '@mantine/form';
import {z} from 'zod';
import {useTranslation} from 'react-i18next';
import {Path} from '~/config/path';
import CommonHeader from '~/layouts/Common/CommonHeader';
import {Head} from '~/outlet/Head';
import {IBreadcrumbs} from '~/types/interfaceCommon';
import {IDeviceMutateForm} from './types/device';
import {useMutation} from '@tanstack/react-query';
import {APIs, QueryKey} from '~/types/http';
import {http} from '~/helper/http';
import {useNavigate} from 'react-router-dom';
import StickyFooter from '~/layouts/Common/StickyFooter';
import {IDeviceInfoList} from './types/deviceProfile';
import AutocompleteAsync from '~/components/inputs/AutocompleteAsync';

const DeviceCreate = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const breadcrumbData: IBreadcrumbs['data'] = [
    {title: t('device.pageTitle'), url: Path.DEVICES},
    {title: t('device.add')},
  ];

  const validationSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t('device.validation.name')),
        label: z.string().min(1, t('device.validation.label')),
        deviceProfileId: z.object(
          {
            id: z.string(),
            entityType: z.string(),
          },
          {required_error: t('device.validation.deviceProfile')},
        ),
      }),
    [],
  );

  const {isLoading, mutate} = useMutation({
    mutationFn: (payload: z.infer<typeof validationSchema>) =>
      http.post(APIs.DEVICE_MUTATE, payload),
    onSuccess: () => {
      navigate(Path.DEVICES);
    },
  });

  const deviceCreateForm = useForm<IDeviceMutateForm>({
    initialValues: {
      name: '',
      type: '',
      label: '',
      additionalInfo: {
        gateway: false,
        overwriteActivityTime: false,
      },
      deviceProfileControl: 'existing',
    },
    validate: zodResolver(validationSchema),
    validateInputOnChange: true,
  });
  const {values: formDeviceValues, getInputProps, onSubmit} = deviceCreateForm;
  const isGateway = formDeviceValues.additionalInfo?.gateway;

  const handleCreateDevice = (values: IDeviceMutateForm) => {
    console.log(values);
    // @todo: modify additionalInfo.overwriteActivityTime = false if additionalInfo.gateway = false

    // mutate(values);
  };

  return (
    <>
      <Head title={t('device.add')} />
      <div>
        <CommonHeader title={t('device.add')} breadcrumbData={breadcrumbData} />
        <form className="my-4" onSubmit={onSubmit(handleCreateDevice)}>
          <Divider my="sm" variant="dashed" label="Basic Info" />
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              placeholder={t('device.name')}
              label={t('common.name')}
              withAsterisk
              {...getInputProps('name')}
            />
            <TextInput label={t('common.label')} withAsterisk {...getInputProps('label')} />
          </div>
          <Textarea
            className="my-4"
            placeholder={t('common.description')}
            label={t('common.description')}
            {...getInputProps('additionalInfo.description')}
            autosize
            minRows={2}
          />

          {/* 
            StoryTelling - a form component
            story: {type: narration | plot | choices, }[]
           */}
          <div className="flex flex-wrap items-center gap-4">
            <Select
              className="flex items-center gap-4"
              classNames={{wrapper: 'w-28'}}
              label="Use"
              data={[
                {value: 'existing', label: 'existing'},
                {value: 'new', label: 'new'},
              ]}
              {...getInputProps('deviceProfileControl')}
            />
            {formDeviceValues.deviceProfileControl === 'existing' ? (
              <AutocompleteAsync<IDeviceMutateForm, IDeviceInfoList>
                className="flex items-center gap-4"
                form={deviceCreateForm}
                label={t('device.deviceProfile').toLowerCase() + ': '}
                controlField="deviceProfileId"
                queryKey={QueryKey.DEVICE_PROFILE_LIST}
                api={APIs.DEVICE_PROFILE_LIST}
                itemProps={{value: 'name', label: 'name', keyData: 'id'}}
                withAsterisk
              />
            ) : (
              <div>New</div>
            )}
          </div>
          <div className="my-4 flex gap-4">
            <Checkbox
              label={t('device.isGateway')}
              {...getInputProps('additionalInfo.gateway', {type: 'checkbox'})}
            />

            {isGateway && (
              <Checkbox
                label={t('device.overwriteActivityTime')}
                {...getInputProps('additionalInfo.overwriteActivityTime', {type: 'checkbox'})}
              />
            )}
          </div>
          <Divider my="sm" variant="dashed" />
        </form>
        <StickyFooter>
          <Button type="submit" form="form-login" loading={isLoading}>
            {t('common.create')}
          </Button>
        </StickyFooter>
      </div>
    </>
  );
};

export default DeviceCreate;
