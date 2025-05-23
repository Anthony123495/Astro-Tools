import { useState } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import { Clipboard, I24Support, Lock1, Messages1, Profile } from 'iconsax-react';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

export default function SettingTab() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    if (route && route !== '') {
      navigate(route);
    }
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <Link style={{ textDecoration: 'none' }} target="_blank" href="https://davidastro.com/pages/contact">
        <ListItemButton onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <I24Support variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Support" />
        </ListItemButton>
      </Link>
      <Link style={{ textDecoration: 'none' }} target="_blank" href="https://davidastro.com/pages/contact">
        <ListItemButton onClick={(event) => handleListItemClick(event, 3)}>
          <ListItemIcon>
            <Messages1 variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItemButton>
      </Link>
    </List>
  );
}
