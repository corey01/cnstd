import AuthLayout from "../Layout/AuthLayout";
import style from './SaveTheDate.module.scss';

const SaveTheDate = () => (
    <AuthLayout title="Save the date">
        <h1>Save the date</h1>
        <div className={style.body}>
            <p>Norma and Corey</p>
            <p>Sunday 21st June 2026</p>
            <p>Yorkshire Dales, England</p>
        </div>
    </AuthLayout>
)

export default SaveTheDate;