import React from 'react';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { withRouter, Redirect } from 'react-router-dom'

import styles from '../../components/Invite/InviteForm.module.css';
import localStyles from './Answers.module.css';

const Answers = ({ match }) => {

    const [getDataStatus, setGetDataStatus] = React.useState(false);

    const [answersCollection, setAnswersCollection] = React.useState()
    const [form, setForm] = React.useState()

    React.useEffect(() => {
        const db = firebase.firestore();
        const docId = match.params.id;
        const dbRef = db.collection("forms").doc(docId).collection("answers");
        dbRef.get()
            .then(res => {
                if (!res.empty) {
                    const data = res.docs.map(doc => doc.data())
                    setAnswersCollection(data)
                    db.collection("forms").doc(docId).get()
                        .then(
                            res => {
                                if (res.exists) {
                                    const data = res.data()
                                    setForm(data)
                                    // console.log("DATA ", data)
                                    setGetDataStatus(true)
                                }
                            }
                        )
                }
                return res.empty && <Redirect to="/" />
            })
            .catch(
                error => console.log('error: ', error)
            )
    }, [match])

    return (
        <div className={styles.formContainer}>
            {!getDataStatus &&
                <div>
                    Dane pobieram szu szu szu!
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
                                                    {Object.keys(form.fields[fieldKey].options).map((optionKey, index) =>
                                                        <li key={index} className={localStyles.listItem}>
                                                            <span>{form.fields[fieldKey].options[optionKey].label}</span>
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

export default withRouter(Answers);