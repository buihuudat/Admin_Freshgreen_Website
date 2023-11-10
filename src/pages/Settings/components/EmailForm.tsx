import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { settingsActions } from "../../../actions/settingActions";
import { EmailPortType } from "../../../utils/api/settingApi";
import { NotificationToast } from "../../../utils/handlers/NotificationToast";

const EmailForm = () => {
  const [loading, setLoading] = useState(false);

  const emailPort = useAppSelector(
    (state: RootState) => state.settings.emailPort
  );
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const data: EmailPortType = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    await dispatch(settingsActions.emailPortAction(data))
      .unwrap()
      .then(() =>
        NotificationToast({
          message: "Email created successfully",
          type: "success",
        })
      )
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Box
      onSubmit={handleSubmit}
      component={"form"}
      sx={{ display: "flex", flexDirection: "column", m: 5, gap: 2 }}
    >
      <Typography textAlign={"center"} fontSize={23} fontWeight={600}>
        Email to send port
      </Typography>
      <TextField name="email" label="Email" defaultValue={emailPort.email} />
      <TextField
        name="password"
        label="Password"
        defaultValue={emailPort.password}
      />
      <LoadingButton
        loading={loading}
        type="submit"
        fullWidth
        variant="contained"
      >
        Submit
      </LoadingButton>
    </Box>
  );
};

export default EmailForm;
