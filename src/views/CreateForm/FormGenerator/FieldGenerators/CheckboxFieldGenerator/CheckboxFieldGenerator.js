import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Input from '../../../../../components/input/Input';
import Button from '../../../../../components/Button/Button';

const CheckboxFieldGenerator = ({ defLabel, checkboxFieldData, form, ...props }) => {
    const [editMode, setEditMode] = React.useState(false);
    const { value } = props.field

    return (
        <>
            {!editMode &&

                <div onClick={() => setEditMode(true)}>
                    <h2>
                        {(props.field.value && props.field.value.label) || 'Zaznacz wszystke pasujące odpowiedzi'}
                    </h2>
                    <ul>
                        {checkboxFieldData.options.map((option, index) =>
                            <li key={index}>
                                {(props.field.value && props.field.value.options && props.field.value.options[index] && props.field.value.options[index].label) || `Opcja-${index + 1}`}
                                {checkboxFieldData && checkboxFieldData.options && checkboxFieldData.options.length > 1 &&
                                    <Button
                                        onClick={() => {
                                            const fName = `${option.name}.options[${index}]`
                                            form.setFieldValue(fName, { ...option, label: '' })
                                            checkboxFieldData.options.splice(index, 1)
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
                    <div>
                        {checkboxFieldData.options.map((option, index) =>
                            <Input
                                key={index}
                                name={`${option.name}.options[${index}]`}
                                label={`Odpowiedź ${index + 1}`}
                                value={(props.field.value && props.field.value.options && props.field.value.options[index] && props.field.value.options[index].label) || ''}
                                onChange={(e) => {
                                    const fName = `${option.name}.options[${index}]`
                                    form.setFieldValue(fName, { ...option, label: e.target.value })
                                }}
                            />
                        )}
                    </div>
                </OutsideClickHandler>
            }
        </>
    );
}

export default CheckboxFieldGenerator