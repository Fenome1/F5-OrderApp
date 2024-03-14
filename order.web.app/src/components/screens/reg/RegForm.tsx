import './style.scss'
import {Button, IconButton, InputAdornment, Stack, TextField} from "@mui/material";
import {Person, Visibility, VisibilityOff} from "@mui/icons-material";
import {Colors} from "../../../common/Colors.ts";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useCreateUserMutation} from "../../../store/apis/userApi.ts";
import {message} from "antd";
import {IRegCommand} from "../../../features/commands/reg/IRegCommand.ts";
import {Roles} from "../../../common/Roles.ts";
import {useState} from "react";

interface IRegData {
    email: string
    password: string
    confirmPassword: string
}

const RegForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const {register, reset, resetField, handleSubmit} = useForm<IRegData>();
    const navigate = useNavigate()

    const [createUser] = useCreateUserMutation()

    const toAuth = () => navigate('/auth')
    const toDuties = () => navigate('/duties')
    const onSubmit = async (data: IRegData) => {

        if (data.password !== data.confirmPassword) {
            message.error("Пароли не совпадают", 5)
            return
        }

        const result = await createUser({email: data.email, password: data.password, role: Roles.Client} as IRegCommand)

        if ("data" in result && result.data) {
            reset()
            toDuties()
        }

        resetField("password")
        resetField("confirmPassword")
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <span className='person-header-label'>
                    <Person style={{marginRight: "10px", marginTop: "5px", color: Colors.Fourthly}}/>
                    <h1 children='Регистрация' style={{fontSize: '30pt', color: Colors.Fourthly}}/>
                </span>
                <TextField
                    sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                                borderColor: Colors.Fourthly,
                            }
                        }
                    }}
                    required
                    {...register("email")}
                    label="Email"
                    type='email'
                    size="small"
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
                    required
                    {...register("password")}
                    label="Пароль"
                    type={showPassword ? "text" : "password"}
                    size="small"
                    style={{marginBottom: '30px'}}
                    InputProps={{
                        style: {
                            color: Colors.Fourthly
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        style: {
                            color: Colors.Fourthly,
                        }
                    }}></TextField>
                <TextField
                    sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                                borderColor: Colors.Fourthly,
                            }
                        }
                    }}
                    required
                    {...register("confirmPassword")}
                    label="Подтвердите пароль"
                    type={showConfirmPassword ? "text" : "password"}
                    size="small"
                    style={{marginBottom: '30px'}}
                    InputProps={{
                        style: {
                            color: Colors.Fourthly
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownConfirmPassword}>
                                    {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        style: {
                            color: Colors.Fourthly,
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    style={{
                        borderRadius: '7px',
                        background: Colors.Secondary,
                        color: Colors.Primary,
                        marginBottom: '10px'
                    }}
                >
                    Зарегистрироваться
                </Button>
                <Button
                    variant="text"
                    style={{color: Colors.Fourthly}}
                    onClick={toAuth}
                >
                    Уже есть аккаунт?
                </Button>
            </Stack>
        </form>
    );
};

export default RegForm;