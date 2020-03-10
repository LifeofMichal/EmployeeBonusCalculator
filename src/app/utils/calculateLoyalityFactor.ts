export function loyalityFactorCalculator(hiringDate: string) {
    let years = Math.floor((new Date().getTime() - new Date(hiringDate).getTime()) / 31536000000)

    switch (years) {
        case 0:
            return 1
        case 1:
            return 1.1
        case 2:
            return 1.2
        case 3:
            return 1.3
        case 4:
            return 1.4
        default:
            return 1.5
    }
}