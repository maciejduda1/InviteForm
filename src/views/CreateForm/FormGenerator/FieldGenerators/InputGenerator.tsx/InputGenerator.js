import React from 'react';
import Input from '../../../../../components/input/Input';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './InputGenerator.module.css';

const InputGenerator = ({ defLabel, ...props }) => {

    const [editMode, setEditMode] = React.useState(false);

    return (
        <>
            {!editMode &&
                <h2 className={styles.component} onClick={() => setEditMode(true)}>
                    {props.field.value || defLabel || 'Nazwa Pola'}
                </h2>
            }
            {editMode &&
                <OutsideClickHandler display="contents" onOutsideClick={() => setEditMode(false)}>
                    <Input
                        label={defLabel || 'Nazwa Pola'}
                        {...props.field}
                    />
                </OutsideClickHandler>

            }

        </>
    );
}

export default InputGenerator;
