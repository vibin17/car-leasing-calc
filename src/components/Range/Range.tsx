import { useEffect, useReducer } from 'react'
import { FieldLimits, formatNumericString } from '../../data/data'
import './Range.scss'
import { RangeActionTypes, RangeReducer } from './RangeReducer'

type props = {
    value: number
    setValue: (value: number) => void
    limits: FieldLimits
    postfix: string
    disabled: boolean
    step?: number
    getExtraInfo?: () => string
}

const Range = ({ value, setValue, limits, postfix, disabled, step = 1000, getExtraInfo = undefined }: props) => {
    let [{ sliderValue, fieldValue, isFieldActive, lowerLimit, upperLimit }, rangeDispatch] = useReducer(RangeReducer, {
        sliderValue: value,
        fieldValue: formatNumericString(value),
        isFieldActive: false,
        lowerLimit: limits.lower,
        upperLimit: limits.upper,
        postfix: (getExtraInfo && postfix) || '',
        step: step
    })

    let sliderOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value
        rangeDispatch({
            type: RangeActionTypes.SLIDER_CHANGE,
            value: inputValue
        })
    }
    const fieldOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value
        if (inputValue.length > limits.upper.toString().length) {
            return
        }
        rangeDispatch({
            type: RangeActionTypes.FIELD_CHANGE,
            value: inputValue
        })
    }
    const fieldOnFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        rangeDispatch({
            type: RangeActionTypes.FIELD_FOCUS
        })
    }
    const fieldOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        rangeDispatch({
            type: RangeActionTypes.FIELD_BLUR
        })
    }
    const blurOnEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = (e.target as HTMLInputElement)
        if (e.key === 'Enter') {
            input.blur()
          }
    }

    useEffect(() => {
        setValue(sliderValue)
    }, [sliderValue, setValue])

    useEffect(() => {
        rangeDispatch({
            type: RangeActionTypes.LIMITS_CHANGED,
            limits: {
                lower: limits.lower,
                upper: limits.upper
            }
        })
    }, [limits])

    useEffect(() => {
        if (isFieldActive && disabled)
        {
            rangeDispatch({
                type: RangeActionTypes.FIELD_BLUR 
            })
        }
    }, [disabled])

    return (
        <div className={`range 
            ${isFieldActive && `range--active`}
            ${disabled && `range--disabled`}`}
        >
            <div className='range-field'>
                <input
                    className='range-field__input'
                    type='text'
                    onChange={fieldOnChange}
                    onFocus={fieldOnFocus}
                    onBlur={fieldOnBlur}
                    onKeyDown={blurOnEnterPress}
                    placeholder={lowerLimit.toString()}
                    value={fieldValue}
                />
                {getExtraInfo &&
                <div className='range-field__extra'>
                    {getExtraInfo()}
                </div> 
                    ||
                <div className='range-field__postfix'>
                    {postfix}
                </div>
                    }
            </div>
            <div className='range-slider'>
                <input
                    className='range-slider__input'
                    type='range'
                    value={sliderValue}
                    step={step}
                    min={lowerLimit}
                    max={upperLimit}
                    onChange={sliderOnChange}
                    style={{
                        backgroundSize: `30%`
                    }}
                />
            </div>
        </div>
    )
}

export default Range