import * as yup from 'yup';

const Schema = yup.object().shape({
    name: yup.string().required('To pole jest wymagane'),
    login: yup.string().email('Wpisany adres musi być emailem').required('To pole jest wymagane'),
    password: yup.string().min(6, 'Minimalna długość hasła wynosi 6 znaków').required('To pole jest wymagane'),
    confirmPassword: yup.string().min(6, 'Minimalna długość hasła wynosi 6 znaków').oneOf([yup.ref('password'), null], 'Hasła nie są zgodne').required('To pole jest wymagane'),
    url: yup.string().url('Podaj prawidłowy url').notRequired()
})

export default Schema;
