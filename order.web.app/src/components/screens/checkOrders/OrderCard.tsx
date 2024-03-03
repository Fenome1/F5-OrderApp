import {FC} from 'react';
import {Box, Card, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import {Divider} from "antd";
import {DeleteOutline} from "@mui/icons-material";
import {IOrder} from "../../../features/models/IOrder.ts";
import {Colors} from "../../../common/Colors.ts";

interface OrderCardProps {
    item: IOrder
    onDelete: (orderId: number) => void
}

const OrderCard: FC<OrderCardProps> = ({item, onDelete}) => {

    const isClientOrder = item.guest === null;

    return (
        <Card className="order-card" sx={{filter: `drop-shadow(0 0 0.1rem ${Colors.Fourthly})`}}>
            <CardHeader
                title={item.category?.title ?? "Неизвестно"}
                className="order-card-title"
            />
            <CardContent className="order-card-content">
                <Divider/>
                {item.comment && <Typography sx={{marginBottom: '15px', fontSize: '12px'}}
                                             variant="body2"><i>Описание</i></Typography>}
                <Typography sx={{fontSize: '16px'}} className="order-card-comment" color={`${Colors.Fourthly}`}>
                    <Box>
                        {item?.comment ? item.comment :
                            <Typography sx={{fontSize: '18px'}} variant="body1">Описание отсутствует</Typography>}
                    </Box>
                </Typography>
                <Box className="order-card-futter">
                    <Box sx={{
                        padding: '10px',
                        background: `${Colors.Primary}`,
                        border: `${Colors.Thirdly} 2px solid`,
                        borderRadius: '11px'
                    }}>
                        <Typography sx={{marginBottom: '5px', fontSize: '12px'}}
                                    variant="body2"><i>{isClientOrder ? 'Контакты' : 'Почта для связи'}</i></Typography>
                        {isClientOrder ?
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <a href={`mailto:${item.user.email}`}
                                   style={{marginBottom: '5px'}}>{item.user.email} </a>
                                <i>{item.user.secondName} {item.user.firstName} {item.user.middleName} </i>
                            </Box>
                            :
                            <a href={`mailto:${item.guest.email}`}>{item.guest.email}</a>
                        }
                    </Box>
                    <Box>
                        <Typography sx={{marginBottom: '5px', fontSize: '12px'}} variant="body2"><i>Дата создания
                            заявки</i></Typography>
                        <Typography variant="body2">{new Date((item.creationDate)).toLocaleDateString()}</Typography>
                    </Box>
                    <IconButton edge="end" onClick={() => onDelete(item.orderId)}>
                        <DeleteOutline/>
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default OrderCard;
