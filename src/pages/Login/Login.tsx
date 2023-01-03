import {useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Title,
  Button,
  BackgroundImage,
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
  LoadingOverlay,
} from '@mantine/core';
import {z} from 'zod';
import {usePersistStore} from '~/store';
import {Path} from '~/config/path';
import {Head} from '~/outlet/Head';
import {IconMoonStars, IconSun} from '@tabler/icons';
import {useTranslation} from 'react-i18next';
import {useForm, zodResolver} from '@mantine/form';
import {ILoginForm, ILoginResponse} from './types/login';
import {useMutation} from '@tanstack/react-query';
import {http} from '~/helper/http';
import {APIs} from '~/types/http';

import LoginBgImg from '~/assets/img/iot.webp';

const Login = () => {
  const navigate = useNavigate();
  const {accessToken, setToken} = usePersistStore();
  const {t} = useTranslation();
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const {isLoading, mutate} = useMutation({
    mutationFn: (payload: ILoginForm) => http.post<ILoginResponse>(APIs.LOGIN, payload),
    onSuccess: ({token, refreshToken}) => {
      setToken({accessToken: token, refreshToken});
      navigate(Path.HOMEPAGE, {replace: true});
    },
  });

  const validationSchema = useMemo(
    () =>
      z.object({
        username: z.string().email(),
        password: z.string().min(8, t('auth.validation.password')),
      }),
    [],
  );

  const loginForm = useForm<ILoginForm>({
    initialValues: {username: '', password: ''},
    validate: zodResolver(validationSchema),
    validateInputOnChange: true,
  });

  const handleLogin = (values: ILoginForm) => {
    mutate(values);
  };

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    navigate(Path.HOMEPAGE, {replace: true});
  }, [accessToken]);

  return (
    <BackgroundImage src={LoginBgImg}>
      <Head title="Login" />
      <LoadingOverlay overlayOpacity={1} visible={!!accessToken} />
      <div className="dark:bg-slate-900/40">
        <div className="relative ml-auto flex h-screen w-[clamp(24rem,40vw,30rem)] items-center bg-white p-4 dark:bg-slate-900">
          <Tooltip withArrow label={t(`common.theme.${colorScheme}`)}>
            <ActionIcon
              className="fixed top-4 right-4"
              variant="outline"
              size="lg"
              radius="xl"
              color={isDarkMode ? 'yellow' : ''}
              onClick={() => toggleColorScheme()}
            >
              {isDarkMode ? <IconMoonStars size={18} /> : <IconSun size={18} />}
            </ActionIcon>
          </Tooltip>
          <div className="w-full">
            <Title align="center">Welcome back!</Title>
            <form id="form-login" className="my-4" onSubmit={loginForm.onSubmit(handleLogin)}>
              <TextInput
                label="Email"
                placeholder="you@gmail.com"
                withAsterisk
                {...loginForm.getInputProps('username')}
              />
              <PasswordInput
                className="mt-4"
                label="Password"
                placeholder="Your password"
                withAsterisk
                {...loginForm.getInputProps('password')}
              />
            </form>

            <div className="my-4 text-center">
              <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                Forgot password?
              </Anchor>
            </div>

            <Button fullWidth type="submit" form="form-login" loading={isLoading}>
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default Login;
