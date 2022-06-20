import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAsyncActions } from '../../redux/actions/auth-async-actions';
import { useSelector } from 'react-redux';
import { getAuthorized } from '../../redux/selectors/ops-selectors';

function Header() {
  const dispatch = useDispatch();
  const authorized = useSelector(getAuthorized);
  return (
    <AppBar color="primary" position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="span">
          <EventNoteIcon
            color="inherit"
            sx={{
              width: '30px',
              height: '30px',
            }}
          />
          ManagerZ
        </Typography>
        {!!authorized && (
          <Button type="button" onClick={() => dispatch(logoutAsyncActions())}>
            Выйти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
