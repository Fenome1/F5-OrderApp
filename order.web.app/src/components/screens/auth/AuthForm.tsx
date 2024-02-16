import {useLoginMutation} from "../../../store/apis/authApi.ts";
import {Button, Stack, TextField} from "@mui/material";
import {IAuthCommand} from "../../../features/commands/IAuthCommand.ts";
import {Person,} from "@mui/icons-material";
import {Colors} from "../../../common/Colors.ts";
import './style.css'
import {Simulate} from "react-dom/test-utils";

const AuthForm = () => {

    const [login, {isLoading}] = useLoginMutation();

    const onSubmit = async (data: IAuthCommand) => {
        await login(data);
    };

    return (
        <form onSubmit={() => onSubmit()}>
            <Stack>
                <span className='auth-label'>
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
                    label="Логин"
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
                        style={{borderRadius: '7px', background: Colors.Secondary, color: Colors.Primary}}>
                    Войти
                </Button>
            </Stack>
        </form>
    );
};

export default AuthForm;