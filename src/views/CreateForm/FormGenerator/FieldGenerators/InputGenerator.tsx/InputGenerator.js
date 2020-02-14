import React from 'react';
import Input from '../../../../../components/input/Input';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './InputGenerator.module.css';

const InputGenerator = ({ defLabel, fieldFormik, ...props }) => {

    const [editMode, setEditMode] = React.useState(false);
    return (
        <>
            {!editMode &&
                <h2 className={styles.component} onClick={() => setEditMode(true)}>
                    {(!!props.simple && props.field.value) || (fieldFormik && fieldFormik.label) || defLabel || 'Nazwa Pola'}
                </h2>
            }
            {editMode &&
                <OutsideClickHandler display="contents" onOutsideClick={() => setEditMode(false)}>
                    <Input
                        label={defLabel || 'Nazwa Pola'}
                        name={props.field.name}
                        {...props}
                    />
                </OutsideClickHandler>

            }

        </>
    );
}

export default InputGenerator;
