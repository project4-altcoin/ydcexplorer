import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <ViewInArIcon />
      </ListItemIcon>
      <ListItemText primary="Blocks" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PublishedWithChangesIcon />
      </ListItemIcon>
      <ListItemText primary="Transcations" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShowChartIcon />
      </ListItemIcon>
      <ListItemText primary="Charts" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primary="My Wallet" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    
     */}
  </React.Fragment>
);
