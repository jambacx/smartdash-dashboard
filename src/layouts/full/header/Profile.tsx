import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemText,
} from '@mui/material';
import nookies from 'nookies';

import { useRouter } from 'next/router';
import { useGetPages } from '@src/lib/hooks/useGetPages';

const Profile = () => {
  const router = useRouter();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [currentPage, setCurrentPage] = useState<any>();
  const [pages, setPages] = useState([]);
  const { loading, onFetch } = useGetPages();

  useEffect(() => {
    const cookies = nookies.get();
    const email = cookies?.email;
    const isExpired = cookies?.expire === 'expired';

    if (email && !isExpired) {
      const fetch = async () => {
        const pages = await onFetch(email);
        setPages(pages);
      };

      fetch();
    }
  }, []);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const logout = () => {
    nookies.destroy(null, 'authToken', { path: '/' });
    nookies.destroy(null, 'email', { path: '/' });
    nookies.destroy(null, 'pageId', { path: '/' });
    nookies.destroy(null, 'expire', { path: '/' });
    router.push('/authentication/login');
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
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
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
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}>
        {pages?.map((page: { page_id: string; label: string }) => (
          <MenuItem
            selected={currentPage === page.page_id}
            key={page.page_id}
            onClick={() => {
              setCurrentPage(page?.page_id);
              nookies.set(null, 'pageId', page.page_id, { path: '/' });
              router.reload();
            }}>
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
