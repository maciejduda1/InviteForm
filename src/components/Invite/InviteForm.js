import React from "react";
import { Formik, Form, Field } from "formik";
import Input from "../input/Input";
import styles from './InviteForm.module.css';
import CheckboxSelect from '../CheckboxSelect/CheckboxSelect';
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { withRouter, Redirect } from 'react-router-dom'

const InviteForm = ({ match }) => {

	const [databaseForm, setForm] = React.useState();

	const [gettingData, setGettingData] = React.useState(true);

	React.useEffect(() => {
		setGettingData(true)
		const docId = match.params.id
		const db = firebase.firestore();
		db.collection("forms").doc(docId).get()
			.then(res => {
				if (res.exists) {
					const data = res.data()
					setForm(data)
					return setGettingData(false)
				}
				return !res.exists && <Redirect to="/" />
			})
			.catch(error =>
				console.log('error: ', error)
			)
	}, [match])

	const initialValues = {
		name: '',
		fields: {}
	}

	function getInitialValues() {
		if (databaseForm) {
			let fields = {}
			Object.keys(databaseForm.fields).map(
				(key) => (
					fields = {
						...fields,
						[key]: {
							type: databaseForm.fields[key].type,
							answer: databaseForm.fields[key].type === 'checkbox' ? databaseForm.fields[key].options.map(opt => false) : '',
						}
					})
			);

			const initialVal = {
				name: '',
				fields: fields
			}
			return initialVal
		}
		return initialValues
	}

	function handleSubmit(values, actions) {
		console.log('VAL ', values)
		if (values.name) {
			const db = firebase.firestore();
			const docId = match.params.id;
			const dbRef = db.collection("forms").doc(docId).collection("answers").doc(values.name)
			dbRef.set(values)
				.then(res => console.log('dodałem dane i res: ', res))
				.catch(error => {
					console.log('Nie udało się')
					actions.setSubmitting(false)
				})
		}
	}

	return (
		<>
			{gettingData &&
				<h1>POBIERAM DANE</h1>
			}
			{!gettingData && databaseForm &&
				<div className={styles.formContainer}>
					<div className={styles.formContent} >
						<Formik
							enableReinitialize
							onSubmit={(values, actions) => handleSubmit(values, actions)}
							initialValues={getInitialValues()}
							render={({ values, errors, touched, isSubmitting }) => (
								<Form>
									<h1>{databaseForm.title}</h1>
									<p>{databaseForm.description}</p>
									<Field
										name="name"
										label={databaseForm.name || "Imię i nazwisko wypełniającego"}
										value={values.name}
										component={Input} />
									{Object.keys(databaseForm.fields).map(key =>
										<React.Fragment key={key}>
											{databaseForm.fields[key].type === 'checkbox' &&
												<div className={styles.checkboxes}>
													<h2>{databaseForm.fields[key].label}</h2>
													<h5>Zaznacz wszystkie pasujące!</h5>
													{databaseForm.fields[key].options.map((option, index) =>
														<Field
															key={index}
															name={`${option.name}.answer[${index}]`}
															label={option.label}
															component={CheckboxSelect} />
													)}
												</div>
											}
											{databaseForm.fields[key].type === 'text' &&
												<Field
													rows={5}
													cols={50}
													name={`fields[${key}].answer`}
													label={databaseForm.fields[key].label}
													component={TextArea} />
											}
										</React.Fragment>


									)}
									<Button
										disabled={isSubmitting}
										value={'Wyślij odpowiedzi'}
									/>
								</Form>
							)}
						/>
					</div>
				</div>
			}
		</>

	);
};

export default withRouter(InviteForm);
