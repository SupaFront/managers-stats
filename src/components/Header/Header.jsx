import { AppBar, Toolbar, Typography } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import React from 'react';

function Header() {
  return (
    <AppBar color="primary" position="static">
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  );
}

export default Header;
