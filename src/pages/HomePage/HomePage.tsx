import { useState } from 'react'
import Range from '../../components/Range/Range'
import './HomePage.scss'

const HomePage = () => {
    let [carPrice, setCarPrice] = useState(0)
    let [initPay, setInitPay] = useState(0)
    return (
        <div className='home'>
            <p className='title'>
                Рассчитайте стоимость автомобиля в лизинг
            </p>
            <div className='calculator'>
                <Range 
                    name='Стоимость автомобиля'
                    value={carPrice}
                    setValue={setCarPrice}
                    min={0}
                    max={4000000}
                    postfix={'₽'}
                />
                <Range 
                    name='Первоначальный взнос'
                    value={initPay}
                    setValue={setInitPay}
                    min={0}
                    max={4000000}
                    postfix={'₽'}
                    extra={{
                        unit: '%',
                        formula: (val: number) => {
                            return val.toString()
                        }
                    }}
                />

            </div>
        </div>
    )
}

export default HomePage