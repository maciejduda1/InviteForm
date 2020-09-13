import React from 'react';
import FieldGeneratorLayout from './FieldGenerators/FieldGeneratorLayout/FieldGeneratorLayout';
import { Formik, Form, Field, FieldArray } from 'formik';
import PropTypes from 'prop-types';
import InputGenerator from './FieldGenerators/InputGenerator.tsx/InputGenerator';
import TextFieldGenerator from './FieldGenerators/TextFieldGenerator';
import Button from '../../../components/Button/Button';
import CheckboxFieldGenerator from './FieldGenerators/CheckboxFieldGenerator/CheckboxFieldGenerator';
import styles from './FormGenerator.module.css';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import ButtonsSection from '../ButtonsSection/ButtonsSection';
import Schema from './FormGenerator.schema';

const FormGenerator = ({ deleteElement, history, match, user }) => {
	const initialValues = {
		title: 'Tytuł formularza',
		description: 'Opis wydarzenia',
		name: 'Imię uczestnika',
		fields: [],
	};

	function handleSubmit(values, actions) {
		const db = firebase.firestore();
		const batch = db.batch();
		const formsRef = db.collection('forms').doc();
		const userRef = db.collection(user.uid).doc(formsRef.id);

		batch.set(formsRef, {
			creationDate: firebase.firestore.Timestamp.now(),
			creatorId: user.uid,
			...values,
		});
		batch.set(userRef, { formid: formsRef.id });

		batch
			.commit()
			.then((res) => history.push(`./${res.id}`))
			.catch((error) => {
				console.log('Nie udało się');
			});
	}

	const sendSelectedField = (selectedOption) => {
		const fieldId = () => uuid();

		let newField = {
			fieldId: fieldId(),
			type: selectedOption,
			label: '',
		};

		let optionField = () => ({
			fieldId: fieldId(),
			label: '',
		});

		if (selectedOption === 'checkbox')
			newField.options = [optionField(), optionField(), optionField()];

		return newField;
	};

	return (
		<>
			<Formik
				enableReinitialize
				onSubmit={(values, actions) => handleSubmit(values, actions)}
				initialValues={initialValues}
				validationSchema={Schema}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					setFieldValue,
					/* and other goodies */
				}) => (
					<div className={styles.containerGrid}>
						<ButtonsSection
							sendSelectedField={(name) => {
								const el = sendSelectedField(name);
								setFieldValue(`fields[${values.fields.length}]`, el);
							}}
						/>
						<div className={styles.container}>
							<Form>
								<FieldGeneratorLayout
									isDeletable={false}
									deleteElement={() => deleteElement('title')}
								>
									<Field
										defLabel="Dodaj tytuł formularza"
										name="title"
										component={InputGenerator}
									/>
									<div className={styles.descriptionContainer}>
										<Field
											defLabel="Wprowadź opis wydarzenia"
											name="description"
											component={TextFieldGenerator}
										/>
									</div>
								</FieldGeneratorLayout>
								<div className={styles.userContainer}>
									<FieldGeneratorLayout
										isDeletable={false}
										deleteElement={() => deleteElement('name')}
									>
										<Field
											defLabel="Wpisz określenie wypełniającego"
											name="name"
											component={InputGenerator}
										/>
									</FieldGeneratorLayout>
								</div>
								<FieldArray
									name="fields"
									render={(arrayHelpers) => (
										<>
											{values &&
												values.fields &&
												values.fields.map((fieldFormik, index) => (
													<FieldGeneratorLayout
														key={fieldFormik.fieldId}
														deleteElement={() =>
															arrayHelpers.remove(index)
														}
													>
														{fieldFormik &&
															fieldFormik.type === 'text' && (
																<Field
																	name={`fields[${index}].label`}
																	onChange={(e) =>
																		setFieldValue(
																			`fields[${index}]`,
																			{
																				...values.fields[
																					index
																				],
																				label:
																					e.target.value,
																			},
																		)
																	}
																	component={InputGenerator}
																/>
															)}
														{fieldFormik &&
															fieldFormik.type === 'checkbox' && (
																<Field name={`fields[${index}]`}>
																	{({ field, form, meta }) => (
																		<CheckboxFieldGenerator
																			defLabel={
																				fieldFormik.label
																			}
																			field={field}
																		/>
																	)}
																</Field>
															)}
													</FieldGeneratorLayout>
												))}
										</>
									)}
								/>
								<div>
									<Button
										type="submit"
										disabled={isSubmitting}
										value="Stwórz formularz"
									/>
								</div>
							</Form>
						</div>
					</div>
				)}
			</Formik>
		</>
	);
};

FormGenerator.propTypes = {
	formFields: PropTypes.shape({
		fieldId: PropTypes.string,
		type: PropTypes.string,
		label: PropTypes.string,
		name: PropTypes.string,
	}),
	user: PropTypes.shape({
		name: PropTypes.string,
		photo: PropTypes.string,
		uid: PropTypes.string,
		email: PropTypes.string,
	}),
};

FormGenerator.defaultProps = {
	user: null,
};

export default withRouter(FormGenerator);
