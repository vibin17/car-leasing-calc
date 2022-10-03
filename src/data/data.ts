export type FieldLimits = {
    lower: number
    upper: number
}

export const getData = () => ({
    price: {
        lower: formattedTextToNumb('1 000 000'),
        upper: formattedTextToNumb('6 000 000')
    },
    initial: {
        lower: 0.1,
        upper: 0.6
    },
    months: {
        lower: 1,
        upper: 60
    },
    interest: 0.035
})

export const numbToFormattedText = (number: string | number) => {
    let str = number.toString()
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

export const formattedTextToNumb = (str: string) => {
    return parseInt(str.replaceAll(/\s/g, ''))
}