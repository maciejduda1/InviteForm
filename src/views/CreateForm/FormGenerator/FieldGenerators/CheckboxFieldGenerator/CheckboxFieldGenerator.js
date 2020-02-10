import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import CheckboxSelect from '../../../../../components/CheckboxSelect/CheckboxSelect';
import Input from '../../../../../components/input/Input';

const CheckboxFieldGenerator = ({ defLabel, checkboxFieldData, form, ...props }) => {
    const [editMode, setEditMode] = React.useState(false);
    const { value } = props.field

    return (
        <>
            {!editMode &&

                <div onClick={() => setEditMode(true)}>
                    <h2>
                        Zaznacz wszystke pasujące odpowiedzi
                    </h2>
                    <ul>
                        <li>
                            Opcja 1
                        </li>
                        <li>
                            Opcja 2
                        </li>
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