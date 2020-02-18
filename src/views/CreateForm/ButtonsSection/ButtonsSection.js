import React from 'react';
import styles from './ButtonsSection.module.css';
import Button from '../../../components/Button/Button';
import Select from '../../../components/Select/Select';
import PropTypes from 'prop-types';
import Helper from '../FormGenerator/Helper/Helper';

const optionForSelect = [
    { value: 'text', label: 'Pole tekstowe' },
    { value: 'checkbox', label: 'Pole wielokrotnego wyboru' }
]

const ButtonsSection = ({ sendSelectedField }) => {

    const [selectedOption, setSelectedOption] = React.useState('text')


    return (
        <div>
            <div className={styles.container}>
                <h2 className={styles.title}>Dodaj pole: </h2>
                <div className={styles.itemContainer}>
                    <Select
                        value={selectedOption}
                        options={optionForSelect}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    />
                </div>
                <div className={styles.itemContainer}>
                    <Button
                        type="button"
                        onClick={() => sendSelectedField(selectedOption)}
                        value="Dodaj Pole"
                    />
                </div>
            </div>
            <Helper />
        </div>
    );
}

ButtonsSection.propTypes = {
    sendSelectedField: PropTypes.func.isRequired
}

export default ButtonsSection;
