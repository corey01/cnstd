import AuthLayout from "../Layout/AuthLayout";
import style from './Hero.module.scss';

const Hero = () => (
    <AuthLayout title="Norma and Corey's Wedding" wrapperClass={style.wrapper}>
        <h1>Save the date</h1>
        <div className={style.body}>
            <p>Norma and Corey</p>
            <p>Sunday 21st June 2026</p>
            <p>Yorkshire Dales, England</p>
        </div>
    </AuthLayout>
)

export default Hero;