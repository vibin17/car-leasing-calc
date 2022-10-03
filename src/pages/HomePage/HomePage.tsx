import { useState } from 'react'
import Range from '../../components/Range/Range'
import { getData } from '../../data/data'
import './HomePage.scss'

const HomePage = () => {
    const limits = getData()
    let [price, setPrice] = useState(limits.price.lower)
    let [initial, setInitial] = useState(limits.initial.lower * 100)
    let [months, setMonths] = useState(limits.months.lower)
    return (
        <div className='home'>
            <p className='title'>
                Рассчитайте стоимость автомобиля в лизинг
            </p>
            <div className='calculator'>
                <Range 
                    name='Стоимость автомобиля'
                    value={price}
                    setValue={setPrice}
                    limits={limits.price}
                    postfix={'₽'}
                />
                <Range 
                    name='Первоначальный взнос'
                    value={initial}
                    setValue={setInitial}
                    limits={{
                        lower: limits.initial.lower * 100,
                        upper: limits.initial.upper * 100,
                    }}
                    postfix={'₽'}
                    extra={{
                        formula: (rate: number) => {
                            return price * rate / 100
                        },
                        dep: price,
                        unit: '%'
                    }}
                />
                <Range 
                    name='Срок лизинга'
                    value={months}
                    setValue={setMonths}
                    limits={{
                        lower: limits.months.lower,
                        upper: limits.months.upper,
                    }}
                    postfix={'мес.'}
                />
                <div className='calculator-block'>
                    <div className='calculator-block__title'>
                        Сумма договора лизинга
                    </div>
                    <div className='calculator-block__results'>
                        4 467 313 ₽
                    </div>
                </div>
                <div className='calculator-block'>
                    <div className='calculator-block__title'>
                        Ежемесячный платеж
                    </div>
                    <div className='calculator-block__results'>
                        114 455 ₽
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomePage