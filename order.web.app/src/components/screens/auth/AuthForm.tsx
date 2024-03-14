import {Button, IconButton, InputAdornment, Stack, TextField} from "@mui/material";
import {IAuthCommand} from "../../../features/commands/auth/IAuthCommand.ts";
import {Person, Visibility, VisibilityOff,} from "@mui/icons-material";
import {Colors} from "../../../common/Colors.ts";
import './style.scss'
import {useLoginMutation} from "../../../store/apis/authApi.ts";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {Roles} from "../../../common/Roles.ts";
import {useState} from "react";

const AuthForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
                    type={showPassword ? "text" : "password"}
                    required={true}
                    label="Пароль"
                    size={"small"}
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
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
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