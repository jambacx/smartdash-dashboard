import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import nookies from 'nookies'

import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";

import CustomTextField from "@components/forms/theme-elements/CustomTextField";
import useLogin from "@src/lib/hooks/useLogin";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

interface FormInput {
  email: string;
  password: string;
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { register, handleSubmit, setError, formState } =
    useForm<FormInput>();
  const { errors } = formState;
  const { login, loading } = useLogin();
  const router = useRouter();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const loginResponse: any = await login(data);

      if (loginResponse.data?.token !== null) {
        const token = loginResponse?.data?.token;
        const pages = loginResponse?.data?.company?.pages;

        nookies.set(null, 'authToken', token, {
          maxAge: 24 * 60 * 60,
          path: '/',
        });


        if (Array.isArray(pages) && pages?.length > 0) {
          nookies.set(null, 'pages', JSON.stringify(pages), {
            maxAge: 24 * 60 * 60,
            path: '/',
          });

          nookies.set(null, 'pageId', pages[0]?.page_id, {
            maxAge: 24 * 60 * 60,
            path: '/',
          });
        }
        await router.push("/");
      }
    } catch (err) {
      setError("email", { type: "manual", message: "Нэвтрэх нэр буруу." });
      setError("password", { type: "manual", message: "Нууц үг буруу." });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {title !== null
        ? (
          <Typography fontWeight="700" variant="h2" mb={1}>
            {title}
          </Typography>
        )
        : null}
      {subtext}
      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px">
            Нэвтрэх нэр
          </Typography>
          <CustomTextField
            {...register("email", { required: "Email is required" })}
            placeholder="Мэйл хаяг"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px">
            Нууц үг
          </Typography>
          <CustomTextField
            {...register("password", { required: "Password is required" })}
            placeholder="Нууц үг"
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Нууц үг санах"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}>
            Нууц үг мартсан?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={loading}>
          {loading
            ? (
              <>
                <CircularProgress
                  size={24}
                  color="inherit"
                  style={{ marginRight: 10 }}
                />
                Нэвтрэх
              </>
            )
            : (
              "Нэвтрэх"
            )}
        </Button>
      </Box>
    </form>
  );
};

export default AuthLogin;
