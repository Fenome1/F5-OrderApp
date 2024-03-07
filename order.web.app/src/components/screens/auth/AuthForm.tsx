import {Button, Stack, TextField} from "@mui/material";
import {IAuthCommand} from "../../../features/commands/auth/IAuthCommand.ts";
import {Person,} from "@mui/icons-material";
import {Colors} from "../../../common/Colors.ts";
import './style.scss'
import {useLoginMutation} from "../../../store/apis/authApi.ts";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {Roles} from "../../../common/Roles.ts";

const AuthForm = () => {
    const navigate = useNavigate()

    const toReg = () => navigate('/reg')

    const {register, resetField, handleSubmit} = useForm<IAuthCommand>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const [login, {isLoading}] = useLoginMutation();

    const onSubmit = async (data: IAuthCommand) => {
        const result = await login(data)
        if ("data" in result && result.data) {
            switch (result.data.user.role.roleId) {
                case Roles.Client:
                    navigate("/duties")
                    break
                case Roles.Admin:
                    navigate("/check-orders")
                    break
            }
        }
        resetField("password")
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <span className='person-header-label'>
                    <Person style={{marginRight: "10px", marginTop: "5px", color: Colors.Fourthly}}/>
                    <h1 children='Авторизация' style={{fontSize: '30pt', color: Colors.Fourthly}}/>
                </span>
                <TextField
                    sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                                borderColor: Colors.Fourthly,
                            }
                        }
                    }}
                    required={true}
                    {...register("email")}
                    label="Email"
                    type='email'
                    size={"small"}
                    style={{marginBottom: '30px'}}
                    InputProps={{
                        style: {
                            color: Colors.Fourthly
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            color: Colors.Fourthly
                        }
                    }}
                />
                <TextField
                    sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                                borderColor: Colors.Fourthly,
                            }
                        }
                    }}
                    {...register("password")}
                    required={true}
                    label="Пароль"
                    type="password"
                    size={"small"}
                    style={{marginBottom: '30px'}}
                    InputProps={{
                        style: {
                            color: Colors.Fourthly
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            color: Colors.Fourthly,
                        }
                    }}
                />
                <Button type="submit"
                        disabled={isLoading}
                        variant="contained"
                        style={{
                            borderRadius: '7px',
                            background: Colors.Secondary,
                            color: Colors.Primary,
                            marginBottom: '10px'
                        }}>
                    Войти
                </Button>
                <Button
                    variant="text"
                    style={{color: Colors.Fourthly}}
                    onClick={toReg}
                >
                    Зарегистрироваться
                </Button>
            </Stack>
        </form>
    );
};

export default AuthForm;