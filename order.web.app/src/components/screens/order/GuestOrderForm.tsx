import {ICategory} from "../../../features/models/ICategory.ts";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {useCreateGuestOrderMutation} from "../../../store/apis/guestOrderApi.ts";
import {ICreateGuestOrderCommand} from "../../../features/commands/ICreateGuestOrderCommand.ts";
import {Colors} from "../../../common/Colors.ts";
import {
    Box,
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

interface IGuestOrderFormProps {
    categories: ICategory[] | null
}

const GuestOrderForm: FC<IGuestOrderFormProps> = (props) => {
    const [createOrder, {isLoading}] = useCreateGuestOrderMutation();
    const {register, reset, handleSubmit} = useForm<ICreateGuestOrderCommand>()
    const onSubmit = async (data: ICreateGuestOrderCommand) => {
        console.log(data)
        await createOrder(data)
        reset()
    };

    return (
        <Box sx={{height: "100%"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className='order-card' raised sx={{
                    filter: `drop-shadow(5 10 0.05rem ${Colors.Fourthly})`
                }}>
                    {isLoading ? <CircularProgress sx={{color: `${Colors.Secondary}`}}/> :
                        <div className='order-content'>
                            <div className='form-header'>
                                <p children='Заказать сайт' style={{fontSize: '21pt', color: Colors.Fourthly}}/>
                                <p> Заполните форму заказа сайта и мы обязательно с вами свяжемся</p>
                            </div>
                            <Stack className='order-stack'>
                                <TextField required {...register('email')} label='Email' sx={{
                                    display: 'flex',
                                    marginBottom: "25px",
                                }}/>
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
        </Box>
    );
};

export default GuestOrderForm;