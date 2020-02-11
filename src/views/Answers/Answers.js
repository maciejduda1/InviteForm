import React from 'react';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { withRouter, Redirect } from 'react-router-dom'

import styles from './Answers.module.css';

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
        <div className={styles.container}>
            {!getDataStatus &&
                <div>
                    Dane pobieram szu szu szu!
                </div>
            }
            {getDataStatus && answersCollection && form &&
                <div>
                    {Object.keys(answersCollection).map(key =>
                        <div key={key}>
                            <h1>
                                Odpowiedzi osoby: {answersCollection[key].name}
                            </h1>
                            <div>
                                {Object.keys(answersCollection[key].fields).map(fieldKey =>
                                    <React.Fragment key={fieldKey}>
                                        {form.fields[fieldKey].type === 'text' &&
                                            <>
                                                <h2>
                                                    {form.fields[fieldKey].label}
                                                </h2>
                                                <p>
                                                    {answersCollection[key].fields[fieldKey].answer}
                                                </p>
                                            </>
                                        }
                                        {form.fields[fieldKey].type === 'checkbox' &&
                                            <>
                                                <h3>
                                                    {form.fields[fieldKey].label}
                                                </h3>
                                                <ul>
                                                    {form.fields[fieldKey].options.map((option, index) =>
                                                        <li key={index}>
                                                            {option.label}
                                                            {answersCollection[key].fields[fieldKey].answer[index] &&
                                                                <i className="fas fa-check-circle"></i>
                                                            }
                                                            {!answersCollection[key].fields[fieldKey].answer[index] &&
                                                                <i className="fas fa-exclamation-circle"></i>
                                                            }
                                                        </li>
                                                    )}
                                                </ul>
                                            </>
                                        }
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default withRouter(Answers);