import React from 'react';
import TextArea from '../../../../components/TextArea/TextArea';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './TextFieldGenerator.module.css';

const TextFieldGenerator = ({ defLabel, ...props }) => {

    const [editMode, setEditMode] = React.useState(false);

    const { value } = props.field

    console.log(props)
    return (
        <>
            {!editMode &&
                <p className={styles.component} onClick={() => setEditMode(true)}>
                    {value || defLabel || 'Nazwa Pola'}
                </p>
            }
            {editMode &&
                <OutsideClickHandler display="contents" onOutsideClick={() => setEditMode(false)}>
                    <TextArea
                        label={defLabel || 'Nazwa Pola'}
                        {...props}
                    />
                </OutsideClickHandler>
            }

        </>
    );
}

export default TextFieldGenerator