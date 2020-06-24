import React from 'react';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from '../Form/Form.module.css';
import localStyles from './Answers.module.css';

const Answers = ({ match, user }) => {
	const [getDataStatus, setGetDataStatus] = React.useState(false);

	const [answersCollection, setAnswersCollection] = React.useState();
	const [form, setForm] = React.useState();

	React.useEffect(() => {
		if (user) {
			const db = firebase.firestore();
			const docId = match.params.id;
			const dbRef = db.collection(user.uid).doc(docId).collection('answers');

			async function getData() {
				try {
					const answersData = dbRef.get();
					const formData = db.collection(user.uid).doc(docId).get();

					const allData = await Promise.all([answersData, formData]);

					const data = allData[0].docs.map((doc) => doc.data());
					setAnswersCollection(data);
					if (data.length === 0) {
						setGetDataStatus(true);
					}

					if (allData[1].exists) {
						const data = allData[1].data();
						setForm(data);
						setGetDataStatus(true);
					}
				} catch (error) {
					console.log('error: ', error);
				}
			}

			getData();
		}
	}, [match, user]);

	function generateLink() {
		return `${match.url}`.split('/answers').shift();
	}

	return (
		<div className={`${styles.formContainer} ${localStyles.container}`}>
			<h4 className={styles.linkTitle}>
				Link do wygenerowanego formularza. Skopiuj go i roześlij znajomym do wypełnienia:
				<p className={styles.link}>{generateLink()}</p>
			</h4>
			{!getDataStatus && <div className={styles.formContent}>Dane pobieram szu szu szu!</div>}
			{getDataStatus && answersCollection.length === 0 && (
				<div className={styles.formContent}>Brak Odpowiedzi</div>
			)}
			{getDataStatus && answersCollection && form && (
				<>
					{Object.keys(answersCollection).map((key) => (
						<div key={key} className={styles.formContent}>
							<h1 className={localStyles.title}>
								Odpowiedzi osoby:{' '}
								<span className={localStyles.userName}>
									{answersCollection[key].name}
								</span>
							</h1>
							<div>
								{Object.keys(answersCollection[key].fields).map((fieldKey) => (
									<React.Fragment key={fieldKey}>
										{form.fields[fieldKey].type === 'text' && (
											<div
												className={`${styles.titleDescriptionContainer} ${localStyles.textField}`}
											>
												<h2 className={localStyles.title}>
													{form.fields[fieldKey].label}
												</h2>
												<p>
													{answersCollection[key].fields[fieldKey].answer}
												</p>
											</div>
										)}
										{form.fields[fieldKey].type === 'checkbox' && (
											<div className={styles.checkboxes}>
												<h3>{form.fields[fieldKey].label}</h3>
												<ul className={localStyles.list}>
													{form.fields[fieldKey].options.map(
														(option, index) => (
															<li
																key={index}
																className={localStyles.listItem}
															>
																<span>{option.label}</span>
																{answersCollection[key].fields[
																	fieldKey
																].answer[index] && (
																	<i
																		style={{ color: 'green' }}
																		className="fas fa-check-circle"
																	></i>
																)}
																{!answersCollection[key].fields[
																	fieldKey
																].answer[index] && (
																	<i
																		style={{ color: 'red' }}
																		className="fas fa-exclamation-circle"
																	></i>
																)}
															</li>
														),
													)}
												</ul>
											</div>
										)}
									</React.Fragment>
								))}
							</div>
						</div>
					))}
				</>
			)}
		</div>
	);
};

Answers.propTypes = {
	user: PropTypes.shape({
		name: PropTypes.string,
		photo: PropTypes.string,
		uid: PropTypes.string,
		email: PropTypes.string,
	}),
};

export default withRouter(Answers);
