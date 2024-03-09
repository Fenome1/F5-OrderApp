import {FC, useState} from 'react';
import {Box, Card, CardContent, CardHeader, IconButton, Typography,} from '@mui/material';
import {Divider} from 'antd';
import {DeleteOutline} from '@mui/icons-material';
import {IOrder} from '../../../features/models/IOrder.ts';
import {Colors} from '../../../common/Colors.ts';
import DeleteOrderDialog from "./DeleteOrderDialog.tsx";

interface OrderCardProps {
    item: IOrder;
    onDelete: (orderId: number) => void;
}

const OrderCard: FC<OrderCardProps> = ({item, onDelete}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const isClientOrder = item.guest === null;

    const clientName =
        isClientOrder && item.user
            ? `${item.user.secondName || ''} ${item.user.firstName || ''}`
            : '';
    const clientEmail = isClientOrder && item.user?.email ? item.user.email : '';
    const guestEmail = isClientOrder ? '' : item.guest?.email || '';

    const formattedDate = new Date(item.creationDate).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <DeleteOrderDialog open={dialogOpen} handleClose={handleCloseDialog}
                               onDelete={() => onDelete(item.orderId)}/>
            <Card className="order-card" sx={{filter: `drop-shadow(0 0 0.1rem ${Colors.Fourthly})`}}>
                <CardHeader title={item.category?.title || 'Неизвестно'} className="order-card-title"/>
                <CardContent className="order-card-content">
                    <Divider/>
                    {item.comment && (
                        <Typography sx={{marginBottom: '15px', fontSize: '12px'}} variant="body2">
                            <i>Описание</i>
                        </Typography>
                    )}
                    <Typography sx={{fontSize: '16px'}} className="order-card-comment" color={`${Colors.Fourthly}`}>
                        <Box>
                            {item?.comment ? (
                                item.comment
                            ) : (
                                <Typography sx={{fontSize: '18px'}} variant="body1">
                                    Описание отсутствует
                                </Typography>
                            )}
                        </Box>
                    </Typography>
                    <Box className="order-card-futter">
                        <Box sx={{
                            padding: '10px',
                            background: `${Colors.Primary}`,
                            border: `${Colors.Thirdly} 2px solid`,
                            borderRadius: '11px',
                            marginRight: '10px'
                        }}>
                            <Typography sx={{marginBottom: '5px', fontSize: '12px'}} variant="body2">
                                <i>{isClientOrder ? 'Контакты' : 'Почта для связи'}</i>
                            </Typography>
                            {isClientOrder ? (
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <a href={`mailto:${clientEmail}`} style={{marginBottom: '5px'}}>
                                        {clientEmail}
                                    </a>
                                    {clientName && <i aria-live="polite">{clientName}</i>}
                                </Box>
                            ) : (
                                <a href={`mailto:${guestEmail}`}>{guestEmail}</a>
                            )}
                        </Box>
                        <Box sx={{marginRight: '10px'}}>
                            <Typography sx={{marginBottom: '5px', fontSize: '12px'}} variant="body2">
                                <i>Дата создания заявки</i>
                            </Typography>
                            <Typography variant="body2">{formattedDate}</Typography>
                        </Box>
                        <IconButton edge="end" onClick={() => handleOpenDialog()}>
                            <DeleteOutline/>
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default OrderCard;