import React from 'react';
import PropTypes from "prop-types";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { withRouter } from 'react-router-dom';

import styles from './MyForms.module.css';

const MyForms = ({ user, history }) => {

    const [userForms, setForms] = React.useState([])

    React.useEffect(() => {
        const db = firebase.firestore();
        const dbRef = db.collection(user.uid);
        dbRef.get()
            .then(res => {
                if (!res.empty) {
                    // console.log(res)
                    const userFormsData = res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                    // console.log('DATA 1', userFormsData)
                    setForms(userFormsData)
                }
                return res.empty && null
            })
            .catch(
                error => console.log('error: ', error)
            )
    }, [user.uid])

    function prepareDate(dateMS) {
        const months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
        const date = new Date(dateMS * 1000);
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} godz. ${date.getHours()} : ${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Twoje Formularze: </h1>
            {userForms.map(form =>
                <div key={form.id} onClick={() => history.push(`${form.id}/answers`)} className={styles.form}>
                    <h1 >{form.title}</h1>
                    <div className={styles.date}><h5>Utworzono: </h5>{prepareDate(form.creationDate.seconds)}</div>
                </div>
            )}
        </div>
    )
}

MyForms.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        photo: PropTypes.string,
        uid: PropTypes.string,
        email: PropTypes.string,
    }).isRequired
};
export default withRouter(MyForms);
