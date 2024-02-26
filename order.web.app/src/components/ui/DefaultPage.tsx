import React, {FC} from 'react';
import Nav from './nav/Nav.tsx';
import Footer from "./Futter.tsx";
import './style.scss'

interface IDefaultPageProps {
    children: React.ReactNode
}

const DefaultPage: FC<IDefaultPageProps> = (props) => {
    return (
        <div className='main-wrapper'>
            <Nav/>
            <section className='main-content'>
                {props.children}
            </section>
            <Footer/>
        </div>
    );
};

export default DefaultPage;