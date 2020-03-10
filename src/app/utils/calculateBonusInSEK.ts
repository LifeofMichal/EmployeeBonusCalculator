export function bonusInSEKCalculator(bonusPool: number, debitPoints: number, totalDebitPoints: number) {
    return parseFloat((bonusPool * (debitPoints / totalDebitPoints)).toFixed(2))
}