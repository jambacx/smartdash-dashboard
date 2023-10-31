import {useState} from "react";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {IconSwitch } from "@tabler/icons-react";
import {useRouter} from "next/router";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const router = useRouter();

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    router.push("/authentication/login");
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}>
        <Avatar
          src="/images/profile/user-1.png"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
        transformOrigin={{horizontal: "right", vertical: "top"}}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}>
        <MenuItem>
          <ListItemIcon>
            <IconSwitch width={20} />
          </ListItemIcon>
          <ListItemText>Хуудас солих</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button variant="outlined" color="primary" fullWidth onClick={logout}>
            Гарах
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
