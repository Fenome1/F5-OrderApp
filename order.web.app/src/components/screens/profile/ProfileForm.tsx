import {Button, CircularProgress, Stack, TextField} from "@mui/material";
import {Person} from "@mui/icons-material";
import {Colors} from "../../../common/Colors.ts";
import './style.css'
import {useUpdateUserMutation} from "../../../store/apis/userApi.ts";
import {useTypedSelector} from "../../../store/hooks/hooks.ts";
import {useForm} from "react-hook-form";
import {IUserUpdateCommand} from "../../../features/commands/user/IUserUpdateCommand.ts";


const ProfileForm = () => {
    const [updateUser, {isLoading}] = useUpdateUserMutation();
    const {user} = useTypedSelector(state => state.auth)

    const {register, handleSubmit} = useForm<IUserUpdateCommand>({
        defaultValues: {
            login: user?.login,
            firstName: user?.firstName,
            secondName: user?.secondName,
            middleName: user?.middleName
        }
    })

    const onSubmit = async (userCommand: IUserUpdateCommand) => {
        userCommand.userId = user!.userId
        await updateUser(userCommand)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isLoading ? <CircularProgress/>
                :
                <Stack>
                    <span className='auth-label'>
                    <Person style={{marginRight: "10px", marginTop: "5px", color: Colors.Fourthly}}/>
                    <h1 children='Профиль' style={{fontSize: '30pt', color: Colors.Fourthly}}/>
                </span>
                    <TextField
                        required={true}
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": {
                                    borderColor: Colors.Fourthly,
                                }
                            }
                        }}
                        {...register("login")}
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
                        label="Имя"
                        {...register("firstName")}
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
                    <TextField
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": {
                                    borderColor: Colors.Fourthly,
                                }
                            }
                        }}
                        label="Фамилия"
                        {...register("secondName")}
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
                    <TextField
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": {
                                    borderColor: Colors.Fourthly,
                                }
                            }
                        }}
                        label="Отчество"
                        {...register("middleName")}
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
                            variant="contained"
                            style={{borderRadius: '7px', background: Colors.Secondary, color: Colors.Primary}}>
                        Сохранить
                    </Button>
                </Stack>
            }
        </form>
    );
};

export default ProfileForm;