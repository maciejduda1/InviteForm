import React from 'react';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

import styles from '../Form/Form.module.css';
import localStyles from './Answers.module.css';

const Answers = ({ match, user }) => {

    const [getDataStatus, setGetDataStatus] = React.useState(false);

    const [answersCollection, setAnswersCollection] = React.useState()
    const [form, setForm] = React.useState()

    React.useEffect(() => {
        if (user) {
            const db = firebase.firestore();
            const docId = match.params.id;
            const dbRef = db.collection(user.uid).doc(docId).collection("answers");
            dbRef.get()
                .then(res => {
                    const data = res.docs.map(doc => doc.data())
                    setAnswersCollection(data)
                    if (data.length === 0) {
                        setGetDataStatus(true)
                    }
                    db.collection(user.uid).doc(docId).get()
                        .then(
                            res => {
                                if (res.exists) {
                                    const data = res.data()
                                    setForm(data)
                                    setGetDataStatus(true)
                                }
                            }
                        )
                })
                .catch(
                    error => console.log('error: ', error)
                )
        }
    }, [match, user])

    return (
        <div className={styles.formContainer}>
            {!getDataStatus &&
                <div className={styles.formContent}>
                    Dane pobieram szu szu szu!
                </div>
            }
            {getDataStatus && answersCollection.length === 0 &&
                <div className={styles.formContent}>
                    Brak Odpowiedzi
                </div>
            }
            {getDataStatus && answersCollection && form &&
                <>
                    {Object.keys(answersCollection).map(key =>
                        <div key={key} className={styles.formContent} >
                            <h1 className={localStyles.title}>
                                Odpowiedzi osoby: <span className={localStyles.userName}>{answersCollection[key].name}</span>
                            </h1>
                            <div>
                                {Object.keys(answersCollection[key].fields).map(fieldKey =>
                                    <React.Fragment key={fieldKey}>
                                        {form.fields[fieldKey].type === 'text' &&
                                            <div className={`${styles.titleDescriptionContainer} ${localStyles.textField}`}>
                                                <h2 className={localStyles.title}>
                                                    {form.fields[fieldKey].label}
                                                </h2>
                                                <p>
                                                    {answersCollection[key].fields[fieldKey].answer}
                                                </p>
                                            </div>
                                        }
                                        {form.fields[fieldKey].type === 'checkbox' &&
                                            <div className={styles.checkboxes}>
                                                <h3>
                                                    {form.fields[fieldKey].label}
                                                </h3>
                                                <ul className={localStyles.list}>
                                                    {form.fields[fieldKey].options.map((option, index) =>
                                                        <li key={index} className={localStyles.listItem}>
                                                            <span>{option.label}</span>
                                                            {answersCollection[key].fields[fieldKey].answer[index] &&
                                                                <i style={{ color: 'green' }} className="fas fa-check-circle"></i>
                                                            }
                                                            {!answersCollection[key].fields[fieldKey].answer[index] &&
                                                                <i style={{ color: 'red' }} className="fas fa-exclamation-circle"></i>
                                                            }
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        }
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                    )}
                </>
            }

        </div>
    )
}

Answers.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        photo: PropTypes.string,
        uid: PropTypes.string,
        email: PropTypes.string,
    })
};

export default withRouter(Answers);