import {FC} from "react";
import {Colors} from "../../../common/Colors.ts";
import {ICreateClientOrderCommand} from "../../../features/commands/order/ICreateClientOrderCommand.ts";
import {useCreateUserOrderMutation} from "../../../store/apis/orderApi.ts";
import {useForm} from "react-hook-form";
import {
    Button,
    Card,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {IUser} from "../../../features/models/IUser.ts";
import {ICategory} from "../../../features/models/ICategory.ts";

interface ClientOrderFormProps {
    user: IUser
    categories: ICategory[] | null
}

const ClientOrderForm: FC<ClientOrderFormProps> = (props) => {

    const [createOrder, {isLoading}] = useCreateUserOrderMutation();
    const {register, reset, handleSubmit} = useForm<ICreateClientOrderCommand>()

    const onSubmit = async (data: ICreateClientOrderCommand) => {
        data.userId = props.user.userId
        console.log(data)
        await createOrder(data)
        reset()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className='create-order-card' raised sx={{
                filter: `drop-shadow(5 10 0.05rem ${Colors.Fourthly})`
            }}>
                {isLoading ? <CircularProgress sx={{color: `${Colors.Secondary}`}}/> :
                    <div className='create-order-content'>
                        <div className='create-order-form-header'>
                            <p children='Заказать сайт' style={{fontSize: '21pt', color: Colors.Fourthly}}/>
                            <p> Заполните форму заказа сайта и мы обязательно с вами свяжемся</p>
                        </div>
                        <Stack className='create-order-stack'>
                            <FormControl fullWidth style={{
                                marginBottom: "25px"
                            }}>
                                <InputLabel>Тип услуги</InputLabel>
                                <Select label="Тип услуги" {...register('categoryId')}>
                                    <MenuItem value={undefined}>
                                        Тип услуги
                                    </MenuItem>
                                    {props.categories?.map((category) => (
                                        <MenuItem key={category.categoryId} value={category.categoryId}>
                                            {category.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField {...register('comment')} label='Комментарий' sx={{
                                display: 'flex',
                                marginBottom: "25px",
                            }} multiline maxRows={4}>
                            </TextField>
                            <Button type="submit"
                                    variant="contained"
                                    style={{
                                        borderRadius: '7px',
                                        background: Colors.Secondary,
                                        color: Colors.Primary
                                    }}>
                                Отправить
                            </Button>
                        </Stack>
                    </div>
                }
            </Card>
        </form>
    );
};

export default ClientOrderForm;