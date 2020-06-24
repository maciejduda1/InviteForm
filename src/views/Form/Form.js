import React from 'react';
import { Formik, Form, Field } from 'formik';
import Input from '../../components/Input/Input';
import styles from './Form.module.css';
import CheckboxSelect from '../../components/CheckboxSelect/CheckboxSelect';
import TextArea from '../../components/TextArea/TextArea';
import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { withRouter, Link } from 'react-router-dom';

const InviteForm = ({ match, history, user }) => {
	const [databaseForm, setForm] = React.useState();

	const [gettingData, setGettingData] = React.useState(true);

	React.useEffect(() => {
		setGettingData(true);
		const docId = match.params.id;
		const db = firebase.firestore();
		db.collection(user.uid)
			.doc(docId)
			.get()
			.then((res) => {
				if (res.exists) {
					const data = res.data();
					setForm(data);
					return setGettingData(false);
				}
				return !res.exists && history.push('/');
			})
			.catch((error) => console.log('error: ', error));
	}, [match, history, user.uid]);

	const initialValues = {
		name: '',
		fields: {},
	};

	function getInitialValues() {
		if (databaseForm) {
			let fields = {};
			Object.keys(databaseForm.fields).map(
				(key) =>
					(fields = {
						...fields,
						[key]: {
							type: databaseForm.fields[key].type,
							answer:
								databaseForm.fields[key].type === 'checkbox'
									? databaseForm.fields[key].options.map((opt) => false)
									: '',
						},
					}),
			);

			const initialVal = {
				name: '',
				fields: fields,
			};
			return initialVal;
		}
		return initialValues;
	}

	function handleSubmit(values, actions) {
		if (values.name) {
			const db = firebase.firestore();
			const docId = match.params.id;
			const dbRef = db.collection(user.uid).doc(docId).collection('answers').doc(values.name);
			dbRef
				.set(values)
				.then((res) => history.push(`${match.url}/answers`))
				.catch((error) => {
					console.log('Nie udało się ', error);
					actions.setSubmitting(false);
				});
		}
	}

	return (
		<>
			{gettingData && <h1>POBIERAM DANE</h1>}
			{!gettingData && databaseForm && (
				<div className={styles.formContainer}>
					<div className={styles.formContent}>
						<Formik
							enableReinitialize
							onSubmit={(values, actions) => handleSubmit(values, actions)}
							initialValues={getInitialValues()}
							render={({ values, errors, touched, isSubmitting }) => (
								<Form>
									<div className={styles.linkArea}>
										<h3>Zapisz linki aby mieć dostęp do formularzy!</h3>
										<h4 className={styles.linkTitle}>
											Link do wygenerowanego formularza:{' '}
											<Link className={styles.link} to={match.url}>
												{match.url}
											</Link>{' '}
										</h4>
										<h4 className={styles.linkTitle}>
											Link do udzielonych odpowiedzi:{' '}
											<Link
												className={styles.link}
												to={`${match.url}/answers`}
											>{`${match.url}/answers`}</Link>{' '}
										</h4>
										<p></p>
									</div>
									<div className={styles.titleDescriptionContainer}>
										<h1>{databaseForm.title || 'Brak tytułu'}</h1>
										<p>{databaseForm.description || 'Brak opisu'}</p>
									</div>
									<Field
										name="name"
										label={
											databaseForm.name || 'Imię i nazwisko wypełniającego'
										}
										value={values.name}
										component={Input}
									/>
									{databaseForm.fields.map((field, index) => (
										<React.Fragment key={index}>
											{field.type === 'checkbox' && (
												<div className={styles.checkboxes}>
													<h2>{field.label}</h2>
													<h5>Zaznacz wszystkie pasujące odpowiedzi!</h5>
													{field.options.map((option, ind) => (
														<Field
															key={ind}
															name={`fields.${index}.answer[${ind}]`}
															label={option.label}
															component={CheckboxSelect}
														/>
													))}
												</div>
											)}
											{field.type === 'text' && (
												<Field
													rows={5}
													cols={50}
													name={`fields[${index}].answer`}
													label={field.label}
													component={TextArea}
												/>
											)}
										</React.Fragment>
									))}
									<Button disabled={isSubmitting} value={'Wyślij odpowiedzi'} />
								</Form>
							)}
						/>
					</div>
				</div>
			)}
		</>
	);
};

InviteForm.propTypes = {
	user: PropTypes.shape({
		name: PropTypes.string,
		photo: PropTypes.string,
		uid: PropTypes.string,
		email: PropTypes.string,
	}).isRequired,
};

export default withRouter(InviteForm);
