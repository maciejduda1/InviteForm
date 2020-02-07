
import React from 'react';
// import PropTypes from 'prop-types';
import styles from './CreateForm.module.css';
import InviteForm from '../../components/Invite/InviteForm';
import ButtonsSection from './ButtonsSection/ButtonsSection';
import FormGenerator from './FormGenerator/FormGenerator';

const CreateForm = () => {

    const [createdField, setNewCreatedField] = React.useState('')

    const sendSelectedField = (selectedOption) => {
        setNewCreatedField(selectedOption)
    }

    return (
        <div className={styles.container}>
            <ButtonsSection
                sendSelectedField={sendSelectedField}
            />
            <FormGenerator
                createdField={createdField}
            />
        </div>
    )
}

export default CreateForm;
