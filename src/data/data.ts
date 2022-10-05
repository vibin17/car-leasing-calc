export type FieldLimits = {
    lower: number
    upper: number
}

export const getData = () => ({
    price: {
        lower: 1_000_000,
        upper: 6_000_000
    },
    initial: {
        lower: 0.1,
        upper: 0.6
    },
    months: {
        lower: 1,
        upper: 60
    }
})

export const formatNumericStr = (numb: string | number) => {
    let str = clearNumericStr(numb.toString())
    let matchResults = str.split('').reverse().join('').match(/\d{3}/g)?? []
    if (matchResults.length === 0) {
        return str
    }
    let base = str.slice(0, -3 * matchResults.length)
    let space = base.length > 0 ? ' ': ''
    let sepThousands = matchResults.reverse().reduce((prev, cur) => {
        if (prev === '') {
            return `${cur.split('').reverse().join('')}`
        }
        return `${prev} ${cur.split('').reverse().join('')}`
    }, '')
    return `${base}${space}${sepThousands}`
}

export const getNumberFromNumStr = (str: string) => {
    return parseInt(clearNumericStr(str) || '0')
}

export const clearNumericStr = ((str: string) => {
    return str.replaceAll(/\D/g, '')
})

export const getValidValue = (value: number, lower: number, upper: number, step: number) => {
    if (value < lower) {
        return lower
    }
    if (value > upper) {
        return upper
    }
    return roundToNearest(value, step)
}

export const roundToNearest = (value: number, step: number) => {
    return value - value % step
}