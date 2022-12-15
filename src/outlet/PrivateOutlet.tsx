import {Navigate, Outlet} from 'react-router-dom';
import {Path} from '~/config/path';
import {usePersistStore} from '~/store';

const PrivateOutlet = () => {
  const {accessToken} = usePersistStore();

  return accessToken ? (
    <div className="container m-auto h-full">
      <Outlet />
    </div>
  ) : (
    <Navigate to={Path.LOGIN} replace />
  );
};

export default PrivateOutlet;
