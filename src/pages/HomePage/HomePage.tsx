import { useState } from 'react'
import Range from '../../components/Range/Range'
import './HomePage.scss'

const HomePage = () => {
    let [carPrice, setCarPrice] = useState(0)
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
                    max={0}
                    postfix={'₽'}
                />

                <Range 
                    name='Стоимость автомобиля'
                    value={carPrice}
                    setValue={setCarPrice}
                    min={0}
                    max={0}
                    postfix={'₽'}
                    extra={{
                        formula: (val: number) => {
                            return val
                        },
                        unit: '%'
                    }}
                />
            </div>
        </div>
    )
}

export default HomePage