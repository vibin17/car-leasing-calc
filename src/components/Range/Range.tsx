import './Range.scss'

type props = {
    name: string
    value: number
    setValue: (value: number) => void
    min: number
    max: number
    postfix?: string
    extra?: {
        formula: (value: number) => number
        unit: string
    }
}

const Range = ({ name, value, setValue, min, max, postfix, extra = undefined }: props) => {
    return (
        <div className='range'>
            <p className='range__title'>
                {name}
            </p>
            <div className='range__input-section'>
                <div className='range-field'>
                    <div className='range-field__wrapper'>
                        <input 
                            className='range-field__input' 
                            type='number' 
                            step='1'
                            placeholder='3 300 000'
                        />
                        <div className='range-field__postfix'>
                            {postfix}    
                        </div> 
                    </div>
                    {extra &&
                    <div className='range-field__extra'>
                        {`13 %`}
                    </div>}
                </div>
                <div className='range-slider'>
                    <input 
                        className='range-slider__input'
                        type='range'
                        min={min}
                        max={max}

                    />
                </div>
            </div>

        </div>
    )
}

export default Range