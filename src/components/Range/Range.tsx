import { useEffect, useState } from 'react'
import { FieldLimits, numbToFormattedText } from '../../data/data'
import './Range.scss'

type props = {
    readonly name: string
    readonly value: number
    readonly setValue: (value: number) => void
    readonly limits: FieldLimits
    readonly postfix: string
    readonly extra?: {
        formula: (val: number) => number
        dep: number
        unit: string
    }
}

const Range = ({ name, value, setValue, limits, postfix, extra = undefined }: props) => {
    let [textValue, setTextValue] = useState(() => {
        if (extra) {
            return numbToFormattedText(Math.ceil(extra.formula(value)))
        }
        return numbToFormattedText(value)
    })
    let [isTextInputActive, setIsTextInputActive] = useState(false)
    let sliderOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(e.target.value)
        setValue(val)
        if (extra) {
            setTextValue(numbToFormattedText(Math.ceil(extra.formula(val))))
            return
        }
        setTextValue(numbToFormattedText(val))
    }
    let textOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replaceAll(/\D/g, '')
        if (val.length > 7) {
            return
        }
        setTextValue(val)
    }
    let textOnFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        setIsTextInputActive(true)
        setTextValue(val.replaceAll(/\s/g, '')) //deletes all whitespaces on focus
    }
    let textOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(e.target.value.replaceAll(/\D/g, '') || '0')
        if (extra) {
            if (val < Math.ceil(extra.formula(limits.lower))) {
                val = Math.ceil(extra.formula(limits.lower))
            }
            if (val > Math.ceil(extra.formula(limits.upper))) {
                val = Math.ceil(extra.formula(limits.upper))
            }
            setIsTextInputActive(false)
            setValue(Math.ceil(val / extra.dep * 100))
            setTextValue(numbToFormattedText(val))
            return
        }
        if (val < limits.lower) {
            val = limits.lower
        }
        if (val > limits.upper) {
            val = limits.upper
        }
        setIsTextInputActive(false)
        setValue(val)
        setTextValue(numbToFormattedText(val)) //puts whitespaces after leaving the field
    }

    useEffect(() => {
        if (extra) {
            setTextValue(numbToFormattedText(Math.ceil(extra.formula(value))))
        }
    }, [extra, value])
    return (
        <div className='range'>
            <p className='range__title'>
                {name}
            </p>
            <div className={`range__field ${isTextInputActive && `range__field--active`}`}>
                <div className='range-text'>
                    <div className='range-text__wrapper'>
                        <input 
                            className='range-text__input' 
                            type='text' 
                            onChange={textOnChange}
                            onFocus={textOnFocus}
                            onBlur={textOnBlur}
                            size={0 || (extra && textValue.length)}
                            placeholder={
                                (extra && extra.formula(limits.lower).toString())
                                || limits.lower.toString()
                            }
                            value={textValue}
                        />
                        <div className='range-text__postfix'>
                            {postfix}
                        </div> 
                    </div>
                    {extra &&
                    <div className='range-text__extra'>
                        {`${value}${extra.unit}`}
                    </div>}
                </div>
                <div className='range-slider'>
                    <input 
                        className='range-slider__input'
                        type='range'
                        value={value}
                        min={limits.lower}
                        max={limits.upper}
                        onChange={sliderOnChange}

                    />
                </div>
            </div>

        </div>
    )
}

export default Range