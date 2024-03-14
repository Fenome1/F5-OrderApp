import {Button, Grid, Stack,} from '@mui/material';
import {Colors} from "../../../common/Colors.ts";
import DutyCard from "./DutyCard.tsx";
import './style.scss';
import {useNavigate} from "react-router-dom";
import DefaultPage from "../../ui/DefaultPage.tsx";
import {FC} from "react";
import {useTypedSelector} from "../../../store/hooks/hooks.ts";
import {Roles} from "../../../common/Roles.ts";

const duties = [
    {
        id: 1,
        title: 'Концепция сайта',
        image: "public/Images/conteption.jpg",
        description:
            'Чтобы создать качественный продукт, мы определяем цели проекта и разрабатываем стратегию их достижения. На этом этапе мы выстраиваем эффективную коммуникацию с целевой аудиторией.',
    },
    {
        id: 2,
        title: 'Дизайн сайта',
        image: "public/Images/design.jpg",
        description:
            'Вдохновляясь лучшими мировыми примерами, мы разрабатываем уникальный визуальный стиль для компании. Учитываем потребности аудитории сайта, заботимся об удобстве использования.',
    },
    {
        id: 3,
        title: 'Разработка сайта',
        image: "public/Images/code.jpg",
        description:
            'HTML-верстка, интеграция с системой управления сайтом, тестирование, первичное наполнение информацией.',
    },
    {
        id: 4,
        title: 'Продвижение',
        image: "public/Images/chart.jpg",
        description:
            'Ваша целевая аудитория обязательно должна узнать о вашем новом сайте. Мы поможем осуществить грамотное продвижение по многочисленным каналам, чтобы обеспечить привлечение на сайт только целевых клиентов',
    },
    {
        id: 5,
        title: 'Аналитика и маркетинг',
        image: 'public/Images/analitic.jpg',
        description: 'Мы поможем вам понять, кто ваша целевая аудитория, откуда она приходит и как взаимодействует с вашим сайтом. Разработаем эффективные маркетинговые кампании для привлечения новых клиентов и удержания существующих.'
    },
    {
        id: 6,
        title: 'Поддержка и развитие',
        image: 'public/Images/frend.jpg',
        description: 'Мы всегда готовы помочь вам с любыми техническими проблемами, связанными с вашим сайтом. Регулярно обновляем сайт, добавляя новые функции и улучшая его производительность.'
    }
];

const MainPage: FC = () => {
    const navigate = useNavigate()
    const toOrder = () => navigate("/create-order")

    const {user} = useTypedSelector(state => state.auth)

    return (
        <DefaultPage>
            <Stack className='duties-stack'>
                <div className='duties-stack-header'>
                    <img src='../public/Images/monic.png' alt='img' style={
                        {
                            filter: `drop-shadow(0 0 0.1rem ${Colors.Fourthly})`
                        }
                    }/>
                    <div className='main-duty'>
                        <div>
                            <p>Создание сайтов</p>
                            {(user?.role?.roleId !== Roles.Admin) &&
                                <Button className='main-buttons' variant="outlined"
                                        onClick={toOrder}
                                        size={"large"}
                                        sx={{
                                            color: Colors.Primary,
                                            borderColor: 'transparent',
                                            background: Colors.Secondary,
                                            transition: "all 0.2s .01s",
                                            fontSize: '17px',
                                            marginRight: '10px',
                                            "&:hover": {
                                                color: Colors.Fourthly,
                                                backgroundColor: Colors.Primary,
                                                borderColor: Colors.Secondary,
                                                fontSize: '20px'
                                            }
                                        }}>
                                    Заказать сайт
                                </Button>
                            }
                            <Button className='main-buttons' variant="outlined" href="https://f5-studio.ru/portfolio/"
                                    size={"large"}
                                    sx={{
                                        color: Colors.Primary,
                                        background: Colors.Secondary,
                                        borderColor: 'transparent',
                                        transition: "all 0.2s .01s",
                                        fontSize: '17px',
                                        "&:hover": {
                                            color: Colors.Fourthly,
                                            backgroundColor: Colors.Primary,
                                            borderColor: Colors.Secondary,
                                            fontSize: '20px'
                                        }
                                    }}>
                                Перейти в портфолио
                            </Button>
                        </div>
                        Мы отлично делаем промо и корпоративные сайты, лендинги,
                        интернет-магазины и стартапы, новостные порталы и интернет-сообщества
                    </div>
                </div>
                <Grid container spacing={3} className='duties-grid'>
                    {duties.map((duty) => (
                        <Grid item xs={12} sm={6} md={4} key={duty.id}
                              sx={{
                                  filter: `drop-shadow(0 0 0.15rem ${Colors.Fourthly})`,
                                  transition: "all 0.1s .01s",
                                  "&:hover": {
                                      filter: `drop-shadow(0 0 0.5rem ${Colors.Fourthly})`
                                  }
                              }}>
                            <DutyCard key={duty.id}
                                      title={duty.title}
                                      image={duty.image}
                                      description={duty.description}/>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </DefaultPage>)
};

export default MainPage;