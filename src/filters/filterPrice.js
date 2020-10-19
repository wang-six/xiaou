export default function (price, num) {
    if (price == undefined) {
        return
    }
    if (num) {
        return price.toFixed(num)
    } else {
        return price.toFixed(2)
    }
}