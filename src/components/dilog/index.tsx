import type React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (categoryName: string) => void;
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({ open, onClose, onAdd }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddClick = () => {
    onAdd(categoryName);
    setCategoryName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ангилал нэмэх</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Ангилал нэр"
          type="text"
          fullWidth
          variant="outlined"
          value={categoryName}
          onChange={(e) => { setCategoryName(e.target.value); }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Цуцлах</Button>
        <Button onClick={handleAddClick}>Нэмэх</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCategoryDialog;
