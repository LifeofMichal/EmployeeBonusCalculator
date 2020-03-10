export function yearsHiredCalculator(hiringDate: string) {
    let yearsHired = Math.floor((new Date().getTime() - new Date(hiringDate).getTime()) / 31536000000)
    return yearsHired
}