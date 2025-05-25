import type { ReactNode } from "react";
import {Helmet} from "react-helmet";


const AuthLayout = ({ title, children, wrapperClass }: { title?: string, children: ReactNode, wrapperClass?: string }) => {
    return (
        <>
        <Helmet>
            <title>{title ? title : "Norma and Corey's Wedding"}</title>
        </Helmet>
        <div className={wrapperClass ? wrapperClass : ''}>
            {children}
        </div>
        </>
    )
}

export default AuthLayout;