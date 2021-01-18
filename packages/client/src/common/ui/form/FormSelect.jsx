import React from 'react'
import PropTypes from 'prop-types'
import ElementPropTypes from 'react-element-proptypes'
import { Select } from '@chakra-ui/react'

import FormItemContainer from './FormItemContainer'
import { useFormContext, getHelperTextId } from './utils'

export function FormSelect({
    children,
    fieldName,
    labelText,
    placeholder,
    isRequired,
    ...props
}) {
    const { onFieldChange, validationError, isInvalid, value } = useFormContext(
        fieldName,
    )

    return (
        <FormItemContainer
            fieldName={fieldName}
            isRequired={isRequired}
            labelText={labelText}
            isInvalid={isInvalid}
            validationError={validationError}>
            <Select
                {...props}
                focusBorderColor="primary.100"
                placeholder={placeholder}
                id={fieldName}
                name={fieldName}
                isInvalid={isInvalid}
                onChange={onFieldChange}
                defaultValue={value}
                aria-describedby={getHelperTextId(fieldName)}>
                {children}
            </Select>
        </FormItemContainer>
    )
}
FormSelect.defaultProps = {
    isRequired: false,
    labelText: '',
}

FormSelect.propTypes = {
    children: PropTypes.arrayOf(
        ElementPropTypes.elementOfType(FormSelectOption),
    ),
    fieldName: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    isRequired: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
}

export function FormSelectOption({ value, children }) {
    return <option value={value}>{children}</option>
}

FormSelectOption.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    children: PropTypes.node.isRequired,
}
