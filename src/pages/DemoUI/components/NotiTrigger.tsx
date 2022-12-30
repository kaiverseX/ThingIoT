import {Button} from '@mantine/core';
import {showNotification, updateNotification} from '@mantine/notifications';
import {IconCheck} from '@tabler/icons';

const NotiTrigger = () => {
  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          showNotification({
            title: 'Default notification',
            message: 'Hey there! 🤥',
          })
        }
      >
        Show notification
      </Button>

      <Button
        className="ml-4"
        variant="gradient"
        gradient={{from: 'teal', to: 'lime', deg: 105}}
        onClick={() => {
          showNotification({
            id: 'load-data',
            loading: true,
            title: 'Loading your data',
            message: 'Data will be loaded in 5 seconds, you cannot close this yet',
            autoClose: false,
            disallowClose: true,
          });

          setTimeout(() => {
            updateNotification({
              id: 'load-data',
              color: 'teal',
              title: 'Data was loaded',
              message: 'Notification will close in 3 seconds, you can close this notification now',
              icon: <IconCheck size={16} />,
              autoClose: 3000,
            });
          }, 5000);
        }}
      >
        Show update notification
      </Button>
    </>
  );
};

export default NotiTrigger;
