export const userInfoRegex = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,128}$/,
    phone: /^(\+84|0)[0-9]{9}$/,
}