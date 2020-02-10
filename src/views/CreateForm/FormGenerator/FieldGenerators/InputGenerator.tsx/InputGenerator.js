import React from 'react';
import Input from '../../../../../components/input/Input';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './InputGenerator.module.css';

const InputGenerator = ({ defLabel, advanced, ...props }) => {

    const [editMode, setEditMode] = React.useState(false);
    const { value } = props.field

    return (
        <>
            {!editMode &&
                <h2 className={styles.component} onClick={() => setEditMode(true)}>
                    {(advanced && value && value.label) || value || defLabel || 'Nazwa Pola'}
                </h2>
            }
            {editMode &&
                <OutsideClickHandler display="contents" onOutsideClick={() => setEditMode(false)}>
                    <Input
                        label={defLabel || 'Nazwa Pola'}
                        value={(advanced && props.field.value && props.field.value.label) || props.field.value || ''}
                        {...props}
                    />
                </OutsideClickHandler>

            }

        </>
    );
}

export default InputGenerator;
