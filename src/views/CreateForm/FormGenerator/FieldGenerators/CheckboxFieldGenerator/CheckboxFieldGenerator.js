import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Input from '../../../../../components/input/Input';
import Button from '../../../../../components/Button/Button';
import styles from './CheckboxFieldGenerator.module.css';

const CheckboxFieldGenerator = ({ defLabel, checkboxFieldData, deleteOption, form, ...props }) => {
    const [editMode, setEditMode] = React.useState(false);

    return (
        <>
            {!editMode &&
                <div className={styles.container}>
                    <h2 className={styles.fieldText} onClick={() => setEditMode(true)}>
                        {(props.field.value && props.field.value.label) || 'Zaznacz pasujące odpowiedzi'}
                    </h2>
                    <ul className={styles.list}>
                        {Object.keys(checkboxFieldData.options).map((optionKey, index) =>
                            <li key={optionKey} className={styles.listItem}>
                                <span onClick={() => setEditMode(true)} className={styles.listOptionText}>{(props.field.value && props.field.value.options && props.field.value.options[optionKey] && props.field.value.options[optionKey].label) || `Opcja-${index + 1}`}</span>
                                {checkboxFieldData && checkboxFieldData.options && Object.keys(checkboxFieldData.options).length > 1 &&
                                    <Button
                                        onClick={() => {
                                            deleteOption(checkboxFieldData.fieldId, optionKey)
                                            // const fName = `${checkboxFieldData.name}`
                                            // console.log('checkboxFieldData ', checkboxFieldData)
                                            // console.log('FORM ', form.values)
                                            // if (form.values.fields[checkboxFieldData.fieldId])
                                            //     form.setFieldValue(fName, { ...form.values.fields[checkboxFieldData.fieldId], options: Object.keys(form.values.fields[checkboxFieldData.fieldId].options).filter(key => key !== optionKey && form.values.fields[checkboxFieldData.fieldId].options[key]) })
                                        }}
                                        size='small'
                                        shape='circle'
                                        value={<i className='fas fa-trash-alt'></i>}
                                    />
                                }
                            </li>
                        )}
                    </ul>
                </div>
            }
            {
                editMode &&
                <OutsideClickHandler display="contents" onOutsideClick={() => setEditMode(false)}>
                    <Input
                        label={defLabel || 'Pytanie'}
                        value={(props.field.value && props.field.value.label) || ''}
                        {...props}
                    />
                    <div className={styles.inputsOptionsContainer}>
                        {Object.keys(checkboxFieldData.options).map((optionKey, index) =>
                            <div className={styles.inputOption} key={optionKey}>
                                <Input
                                    name={`${checkboxFieldData.name}.options[${optionKey}]`}
                                    label={`Odpowiedź ${index + 1}`}
                                    value={(props.field.value && props.field.value.options && props.field.value.options[optionKey] && props.field.value.options[optionKey].label) || ''}
                                    onChange={(e) => {
                                        const fName = `${checkboxFieldData.name}.options[${optionKey}]`
                                        form.setFieldValue(fName, { ...checkboxFieldData[optionKey], label: e.target.value })
                                    }}
                                />
                                <div className={styles.buttonContainer}>
                                    {checkboxFieldData && checkboxFieldData.options && Object.keys(checkboxFieldData.options).length > 1 &&
                                        <Button
                                            onClick={() => {
                                                deleteOption(checkboxFieldData.fieldId, optionKey)
                                            }}
                                            size='small'
                                            shape='circle'
                                            value={<i className='fas fa-trash-alt'></i>}
                                        />
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </OutsideClickHandler>
            }
        </>
    );
}

export default CheckboxFieldGenerator