const PasswordFormPage = ({ handleSubmit }: { handleSubmit: (password: string) => void}) => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(e.currentTarget.password.value);
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor='password'>Enter the password</label>
            <br />
            <input name='password' type='text' />
            <br />
            <input type='submit' value='Submit' />
        </form>
    )
}

export default PasswordFormPage;