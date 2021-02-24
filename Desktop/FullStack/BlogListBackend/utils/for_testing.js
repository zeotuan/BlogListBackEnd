const palidrome = (text) => {
    return  text.split('').reverse().join('')
}

const average = (array) => {
    const reducer = (sum,item) => {
        return  sum + item 
    }
    return array.reduce(reducer,0)/array.length
}



