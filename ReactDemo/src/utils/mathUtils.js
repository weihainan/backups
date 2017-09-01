export default {
    Percentage(number1, number2) {
        if (number2 == 0 || number2 == null || number2 == '' || number2 == 'undefined') return null
        return (Math.round(number1 / number2 * 10000) / 100.00 + '%')
    }
}
