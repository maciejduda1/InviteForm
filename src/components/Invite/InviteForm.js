import React from "react";
import { Formik, Form, Field } from "formik";
import Input from "../input/Input";
import styles from './InviteForm.module.css';
import CheckboxSelect from '../CheckboxSelect/CheckboxSelect';
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";

const InviteForm = () => {

	const initialValues = {
		name: '',
		selectedOption: [false, false, false],
		note: '',
	}

	function handleSubmit(values, actions) {
		// console.log(values)
		setTimeout(() => {
			alert(JSON.stringify(values, null, 2));
			actions.setSubmitting(false);
		}, 400);
	}

	return (
		<div className={styles.formContainer}>
			<div className={styles.formContent} >
				<Formik
					onSubmit={(values, actions) => handleSubmit(values, actions)}
					initialValues={initialValues}
					render={({ values, errors, touched, isSubmitting }) => (
						<Form>
							<Field
								name="name"
								label="Imię"
								component={Input} />
							<div className={styles.checkboxes}>
								<h2>Terminy na imprezę</h2>
								<h5>Zaznacz wszystkie pasujące!</h5>
								<Field
									name="selectedOption[0]"
									label="07.03.2020"
									component={CheckboxSelect} />
								<Field
									name="selectedOption[1]"
									label="14.03.2020"
									component={CheckboxSelect} />
								<Field
									name="selectedOption[2]"
									label="21.03.2020"
									component={CheckboxSelect} />
							</div>
							<Field
								rows={5}
								cols={50}
								name="note"
								label="Komentarz"
								component={TextArea} />
							<Button
								disabled={isSubmitting}
								value={'Raport do gniazda'}
							/>
						</Form>
					)}
				/>
			</div>
		</div>
	);
};

export default InviteForm;
