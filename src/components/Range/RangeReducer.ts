import { FieldLimits, filterNumeric, formatNumericString, getValidValue } from "../../data/data"

export type RangeState = {
    sliderValue: number
    fieldValue: string
    isFieldActive: boolean,
    lowerLimit: number,
    upperLimit: number,
    step: number,
    postfix: string
}

export enum RangeActionTypes {
    SLIDER_CHANGE = 'SLIDER_CHANGE',
    FIELD_CHANGE = 'FIELD_CHANGE',
    FIELD_FOCUS = 'FIELD_FOCUS',
    FIELD_BLUR = 'FIELD_BLUR',
    LIMITS_CHANGED = 'LIMITS_CHANGED'
}

type RangeAction = {
    type: RangeActionTypes,
    value?: string,
    limits?: FieldLimits
}

const emptyLimits = {
    lower: 0,
    upper: 0
}

export const RangeReducer = (state: RangeState, { type, value = '', limits = emptyLimits }: RangeAction): RangeState => {
    switch (type) {
        case RangeActionTypes.SLIDER_CHANGE:
            return {
                ...state,
                sliderValue: filterNumeric(value),
                fieldValue: formatNumericString(value) + ' ' + state.postfix
            }
        case RangeActionTypes.FIELD_CHANGE:
            return {
                ...state,
                fieldValue: filterNumeric(formatNumericString(value)).toString()
            }
        case RangeActionTypes.FIELD_FOCUS:
            return {
                ...state,
                fieldValue: filterNumeric(state.fieldValue).toString(),
                isFieldActive: true
            }
        case RangeActionTypes.FIELD_BLUR: {
            let validValue = getValidValue(
                filterNumeric(state.fieldValue), 
                state.lowerLimit, 
                state.upperLimit, 
                state.step
            )
            return {
                ...state,
                sliderValue: validValue,
                fieldValue: 
                    formatNumericString(validValue) +
                        ' ' + state.postfix,
                isFieldActive: false
            }
        }
        case RangeActionTypes.LIMITS_CHANGED: {
            let validValue = getValidValue(
                state.sliderValue, 
                limits.lower, 
                limits.upper, 
                state.step
            )
            return {
                ...state,
                sliderValue: validValue,
                fieldValue: state.isFieldActive? 
                    validValue.toString()
                        :
                    formatNumericString(validValue) +
                        ' ' + state.postfix,
                upperLimit: limits.upper,
                lowerLimit: limits.lower
            }
        }
        default:
            throw new Error('WRONG CASE')
    }
}