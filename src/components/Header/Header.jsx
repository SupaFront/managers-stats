import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import React from 'react';

function Header() {
  return (
    <AppBar color="secondary" position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="span"
          color="primary.contrastText"
          sx={{ textShadow: '3px 1px 2px #000' }}
        >
          <EventNoteIcon
            color="inherit"
            sx={{
              width: '30px',
              height: '30px',
              fill: 'black',
            }}
          />
          ManagerZ
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
