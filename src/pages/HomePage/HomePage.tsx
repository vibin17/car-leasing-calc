import axios from 'axios'
import { useEffect, useState } from 'react'
import Range from '../../components/Range/Range'
import { formatNumericString, getData } from '../../data/data'
import './HomePage.scss'

const HomePage = () => {
    const inputData = getData()
    let [price, setPrice] = useState(inputData.price.lower)
    let [initial, setInitial] = useState(price * inputData.initial.lower)
    let [months, setMonths] = useState(inputData.months.lower)
    let [isLoading, setIsLoading] = useState(false)
    const monthPay = Math.ceil(
        (price - initial) 
            * 
        (
            (0.035 * Math.pow((1 + 0.035), months)) 
                / 
            (Math.pow((1 + 0.035), months) - 1)
        )
    )

    return (
        <div className='home'>
            <p className='title'>
                Рассчитайте стоимость автомобиля в лизинг
            </p>
            <div className='calculator'>
                <div className='calculator__fields'>
                    <div className='calculator-block'>
                        <div className='calculator-block__title'>
                            Стоимость автомобиля
                        </div>
                        <div className='calculator-block__range'>
                            <Range
                                value={price}
                                setValue={setPrice}
                                limits={inputData.price}
                                postfix={'₽'}
                                disabled={isLoading}
                                step={1000}
                            />
                        </div>
                    </div>
                    <div className='calculator-block'>
                        <div className='calculator-block__title'>
                            Первоначальный взнос
                        </div>
                        <div className='calculator-block__range'>
                            <Range
                                value={initial}
                                setValue={setInitial}
                                limits={{
                                    lower: price * inputData.initial.lower,
                                    upper: price * inputData.initial.upper,
                                }}
                                postfix={'₽'}
                                disabled={isLoading}
                                step={100}
                                getExtraInfo={() => 
                                    `${Math.ceil(initial / price * 100)}%`
                                }
                            />
                        </div> 
                    </div>
                    <div className='calculator-block'>
                        <div className='calculator-block__title'>
                            Срок лизинга
                        </div>
                        <div className='calculator-block__range'>
                            <Range
                                value={months}
                                setValue={setMonths}
                                limits={{
                                    lower: inputData.months.lower,
                                    upper: inputData.months.upper,
                                }}
                                postfix={'мес.'}
                                disabled={isLoading}
                                step={1}
                            />
                        </div>
                    </div>
                </div>
                <div className='calculator__results'>
                    <div className='calculator-block'>
                        <div className='calculator-block__title'>
                            Сумма договора лизинга
                        </div>
                        <div className='calculator-block__value'>
                            {`${formatNumericString(initial + months + monthPay)} ₽`}
                        </div>
                    </div>
                    <div className='calculator-block'>
                        <div className='calculator-block__title'>
                            Ежемесячный платеж от
                        </div>
                        <div className='calculator-block__value'>
                            {`${formatNumericString(monthPay)} ₽`}
                        </div>
                    </div>
                    <div className='calculator-block'>
                        <button 
                            className='calculator-btn' 
                            onClick={() => {
                                (async () => {
                                    setIsLoading(true)
                                    try {
                                        const result = await axios.post('https://eoj3r7f3r4ef6v4.m.pipedream.net', 
                                            {
                                                price: price,
                                                initial: initial,
                                                months: months,
                                                monthPay: monthPay
                                            }
                                        )
                                        console.log(result)
                                    } catch (error) {
                                        console.log(error)
                                    } finally {
                                        setIsLoading(false)
                                    }

                                })()
                            }}
                            disabled={isLoading}
                        >
                            {!isLoading && 'Оставить заявку' ||
                                <div className='calculator-btn__loading'/>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage