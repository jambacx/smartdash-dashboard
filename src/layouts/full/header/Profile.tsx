import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemText,
} from "@mui/material";

import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const [pages, setPages] = useState<any>([]);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [currentPage, setCurrentPage] = useState<any>();

  useEffect(() => {
    if (router.query.page_id) {
      setCurrentPage(router.query.page_id)
    }
  }, [router.query]);

  useEffect(() => {
    const value = localStorage.getItem('pages');

    if (value) {
      setPages(JSON.parse(value))
    }
  }, []);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("pages");
    localStorage.removeItem("currentPage");
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
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}>
        {pages?.map((page: { page_id: string, label: string }) => (
          // eslint-disable-next-line @typescript-eslint/promise-function-async
          <MenuItem selected={currentPage === page.page_id} key={page.page_id} href={`/${page.page_id}`} onClick={() => router.push({
            query: { page_id: page.page_id }
          })}>
            <ListItemText>{page.label}</ListItemText>
          </MenuItem>
        ))}
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
