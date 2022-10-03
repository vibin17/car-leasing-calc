export const numbToFormattedStr = (number: string | number) => {
    let str = number.toString()
    console.log(`str ${str}`)
    let matchResults = str.split('').reverse().join('').match(/\d{3}/g)?? []
    if (matchResults.length === 0) {
        return str
    }
    if (matchResults.length * 3 === str.length) {
        return matchResults.reverse().reduce((prev, cur) => `${prev} ${cur.split('').reverse().join('')}`, '')
    }
    return `${str.slice(0, -3 * matchResults.length)}` + 
    `${matchResults.reverse().reduce((prev, cur) => `${prev} ${cur.split('').reverse().join('')}`, '')}`
}

export const formattedStrToNumb = (str: string) => {
    return parseInt(str.replaceAll(/\s/g, ''))
}