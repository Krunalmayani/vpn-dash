import { useRef, useState } from 'react';

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ onPressEditRow, onPressManageServer, isManage = false }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);


  const onPressUserRow = () => {
    onPressEditRow()

    setIsOpen(false);
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {isManage && <MenuItem to="#" sx={{ color: 'text.secondary' }} onClick={onPressManageServer}>
          <ListItemIcon>
            <Iconify icon="mdi:server" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Manage Server" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>}
        <MenuItem to="#" sx={{ color: 'text.secondary' }} onClick={onPressUserRow}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>


      </Menu>
    </>
  );
}
