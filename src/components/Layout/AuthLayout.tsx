import type { ReactNode } from "react";
import {Helmet} from "react-helmet";


const AuthLayout = ({ title, children }: { title?: string, children: ReactNode}) => {
    return (
        <>
        <Helmet>
            <title>{title ? title : "Norma and Corey's Wedding"}</title>
        </Helmet>
        <div>
            {children}
        </div>
        </>
    )
}

export default AuthLayout;