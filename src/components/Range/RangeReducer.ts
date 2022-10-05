import { FieldLimits, getNumberFromNumStr, formatNumericStr, getValidValue, clearNumericStr } from "../../data/data"

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
                sliderValue: getNumberFromNumStr(value),
                fieldValue: formatNumericStr(value) + ' ' + state.postfix
            }
        case RangeActionTypes.FIELD_CHANGE:
            return {
                ...state,
                fieldValue: clearNumericStr(value)
            }
        case RangeActionTypes.FIELD_FOCUS:
            return {
                ...state,
                fieldValue: clearNumericStr(state.fieldValue),
                isFieldActive: true
            }
        case RangeActionTypes.FIELD_BLUR: {
            let validValue = getValidValue(
                getNumberFromNumStr(state.fieldValue), 
                state.lowerLimit, 
                state.upperLimit, 
                state.step
            )
            return {
                ...state,
                sliderValue: validValue,
                fieldValue: 
                    formatNumericStr(validValue) +
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
                    formatNumericStr(validValue) +
                        ' ' + state.postfix,
                upperLimit: limits.upper,
                lowerLimit: limits.lower
            }
        }
        default:
            throw new Error('WRONG CASE')
    }
}