import * as yup from 'yup';

const Schema = yup.object().shape({
    title: yup.string().required('To pole jest wymagane'),
    description: yup.string().required('To pole jest wymagane'),
    name: yup.string().required('To pole jest wymagane'),
    fields: yup.array().of(yup.object().shape({
        fieldId: yup.string().required('To pole jest wymagane'),
        type: yup.string().required('To pole jest wymagane'),
        label: yup.string().required('To pole jest wymagane'),
        options: yup.array().when('type', {
            is: 'checkbox',
            then: yup.array().of(yup.object().shape({
                fieldId: yup.string().required('To pole jest wymagane'),
                label: yup.string().required('To pole jest wymagane'),
            })).required('To pole jest wymagane'),
            otherwise: yup.array().notRequired()
        })
    }))
});

export default Schema;
