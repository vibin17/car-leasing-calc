import { useState } from 'react'
import { formattedStrToNumb, numbToFormattedStr } from '../../data/data'
import './Range.scss'

type props = {
    name: string
    value: number
    setValue: (value: number) => void
    min: number
    max: number
    postfix?: string
    extra?: {
        formula: (value: number) => string
        unit: string
    }
}

const Range = ({ name, value, setValue, min, max, postfix, extra = undefined }: props) => {
    let [strValue, setStrValue] = useState(value && value.toString() || '')
    let [isActive, setIsActive] = useState(false)
    let sliderOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        setValue(parseInt(val))
        setStrValue(numbToFormattedStr(val))
    }
    let fieldOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replaceAll(/\D/g, '')
        let numVal = parseInt(val)
        if (numVal < min) {
            setStrValue(min.toString())
            setValue(min)
            return
        }
        if (numVal > max) {
            setStrValue(max.toString())
            setValue(max)
            return
        }
        setStrValue(val)
        setValue(numVal)
    }
    let fieldOnFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        setIsActive(true)
        setStrValue(val.replaceAll(/\s/g, '')) //deletes all whitespaces on focus

    }
    let fieldOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replaceAll(/\D/g, '')
        setIsActive(false)
        setStrValue(numbToFormattedStr(val)) //returns whitespaces after leaving the field
    }
    return (
        <div className='range'>
            <p className='range__title'>
                {name}
            </p>
            <div className={`range__input-section ${isActive && `range__input-section--active`}`}>
                <div className='range-field'>
                    <div className='range-field__wrapper'>
                        <input 
                            className='range-field__input' 
                            type='text' 
                            onChange={fieldOnChange}
                            onFocus={fieldOnFocus}
                            onBlur={fieldOnBlur}
                            placeholder={min.toString()}
                            value={strValue}
                        />
                        <div className='range-field__postfix'>
                            {postfix}
                        </div> 
                    </div>
                    {extra &&
                    <div className='range-field__extra'>
                        {`13%`}
                    </div>}
                </div>
                <div className='range-slider'>
                    <input 
                        className='range-slider__input'
                        type='range'
                        value={value}
                        min={min}
                        max={max}
                        onChange={sliderOnChange}

                    />
                </div>
            </div>

        </div>
    )
}

export default Range