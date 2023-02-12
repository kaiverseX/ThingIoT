import {TextInput} from '@mantine/core';
import {useForm, zodResolver} from '@mantine/form';
import {t} from 'i18next';
import {z} from 'zod';
import HorizonField from '~/components/inputs/HorizonField';
import {IDeviceProfileCreate} from '../types/deviceProfile';

const validationSchema = z.object({
  name: z.string().min(1, t('device.validation.name')),
  defaultQueueName: z.string().optional(),
  defaultRuleChainId: z.object({id: z.string(), entityType: z.string()}).optional(),
});

export const DeviceProfileForm = () => {
  const deviceProfileForm = useForm<IDeviceProfileCreate>({
    initialValues: {
      name: '',
      defaultRuleChainId: undefined,
      defaultQueueName: '',
      transportType: 'DEFAULT',
      type: 'DEFAULT',
      provisionType: 'DISABLED',
      profileData: {
        configuration: {
          type: 'DEFAULT',
        },
        transportConfiguration: {
          type: 'DEFAULT',
        },
        alarms: null,
        provisionConfiguration: {
          type: 'DISABLED',
        },
      },
    },
    validate: zodResolver(validationSchema),
    validateInputOnChange: true,
  });
  const {values, getInputProps, onSubmit} = deviceProfileForm;

  const handleCreateDeviceProfile = (values: IDeviceProfileCreate) => {
    console.log(values);
    // @todo: modify additionalInfo.overwriteActivityTime = false if additionalInfo.gateway = false

    // mutate(values);
  };

  return (
    <form className="flex" onSubmit={onSubmit(handleCreateDeviceProfile)}>
      <HorizonField label={t('device.deviceProfileName')} withAsterisk>
        
      </HorizonField>
      <TextInput
        placeholder={t('device.deviceProfileName')}
        withAsterisk
        {...getInputProps('name')}
      />
    </form>
  );
};
