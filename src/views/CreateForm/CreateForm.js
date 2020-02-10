import React from "react";
// import PropTypes from 'prop-types';
import styles from "./CreateForm.module.css";
import ButtonsSection from "./ButtonsSection/ButtonsSection";
import FormGenerator from "./FormGenerator/FormGenerator";
import uuid from 'uuid/v4'

const CreateForm = () => {
	const [createdFields, setNewCreatedField] = React.useState({});

	const sendSelectedField = selectedOption => {
		const fieldId = uuid();
		let newField = {
			...createdFields,
			[fieldId]: {
				fieldId: fieldId,
				type: selectedOption,
				label: "",
				name: `fields.${fieldId}`,
			}
		}

		let optionFiled = {
			fieldId: fieldId,
			name: `fields.${fieldId}`,
			label: "",
		}

		if (selectedOption === 'checkbox') newField[fieldId].options = [
			optionFiled, optionFiled, optionFiled
		]

		setNewCreatedField(
			newField
		);
	};

	const deleteField = nameOfFiled => {
		const newFields = Object.keys(createdFields).reduce((object, key) => {
			if (key !== nameOfFiled) {
				object[key] = createdFields[key]
			}
			return object
		}, {})

		setNewCreatedField({
			...newFields
		})
	}

	return (
		<div className={styles.container}>
			<ButtonsSection sendSelectedField={sendSelectedField} />
			<FormGenerator
				deleteElement={deleteField}
				formFields={createdFields} />
		</div>
	);
};

export default CreateForm;
