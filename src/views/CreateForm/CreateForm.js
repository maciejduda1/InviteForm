import React from "react";
// import PropTypes from 'prop-types';
import styles from "./CreateForm.module.css";
import InviteForm from "../../components/Invite/InviteForm";
import ButtonsSection from "./ButtonsSection/ButtonsSection";
import FormGenerator from "./FormGenerator/FormGenerator";

const CreateForm = () => {
  const [createdFields, setNewCreatedField] = React.useState([]);
  const [crFLength, setcrFLength] = React.useState(0);

  const sendSelectedField = selectedOption => {
    setNewCreatedField([
      ...createdFields,
      {
        type: selectedOption,
        label: "",
        name: `text.${createdFields.length}`
      }
    ]);
  };

  return (
    <div className={styles.container}>
      <ButtonsSection sendSelectedField={sendSelectedField} />
      <FormGenerator formFields={createdFields} />
    </div>
  );
};

export default CreateForm;
