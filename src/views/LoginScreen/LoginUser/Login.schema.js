import * as yup from 'yup';

const Schema = yup.object().shape({
    login: yup.string().email('Wpisany adres musi być emailem').required('To pole jest wymagane'),
    password: yup.string().min(6, 'Minimalna długość hasła wynosi 6 znaków').required('To pole jest wymagane'),
});

export default Schema;
