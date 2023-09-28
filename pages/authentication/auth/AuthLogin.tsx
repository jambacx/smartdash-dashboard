import React from "react";
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
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import withAuth from "@src/context/withAuth";

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
  const { register, handleSubmit, setError, formState } = useForm<FormInput>();
  const { errors } = formState;
  const { login, loading, error } = useLogin();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data);
    } catch (err) {
      setError("email", { type: "manual", message: "Login failed." });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            // color={loginError ? "error" : "inherit"}
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Нэвтрэх нэр
          </Typography>
          <CustomTextField
            {...register("email", { required: "Email is required" })}
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
            mb="5px"
          >
            Нууц үг
          </Typography>
          <CustomTextField
            {...register("password", { required: "Password is required" })}
            type="password"
            variant="outlined"
            fullWidth
            error={true}
            helperText={errors.password?.message}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
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
            }}
          >
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
          disabled={loading}
        >
          {loading ? (
            <>
              <CircularProgress size={24} color="inherit" />
              Нэвтрэх
            </>
          ) : (
            "Нэвтрэх"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default AuthLogin;
