export function px2vw (value, viewWidth = 375) {
    return (value * 100)/viewWidth + 'vw'
}