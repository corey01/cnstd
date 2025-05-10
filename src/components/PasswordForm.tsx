const PasswordForm = ({ handleSubmit }: { handleSubmit: (password: string) => void}) => {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(e.currentTarget.password.value);
    }

    return (
        <form onSubmit={onSubmit}>
        <label htmlFor='password'>Enter the password</label>
        <input name='password' type='text' />
        <input type='submit' value='Submit' />
        </form>
    )
}

export default PasswordForm;