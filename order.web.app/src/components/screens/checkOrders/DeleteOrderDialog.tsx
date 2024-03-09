import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from '@mui/material';
import {FC} from "react";

interface DeleteOrderDialogProps {
    open: boolean
    handleClose: () => void
    onDelete: () => void
}

const DeleteOrderDialog: FC<DeleteOrderDialogProps> = ({open, handleClose, onDelete}) => {
    return (
        <div>
            <Dialog open={open}>
                <DialogTitle id="alert-dialog-title">{"Удалить заказ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы действительно хотите удалить заказ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={onDelete}>
                        Да
                    </Button>
                    <Button color="primary" onClick={handleClose}>
                        Нет
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteOrderDialog;