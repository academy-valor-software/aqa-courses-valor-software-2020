export function getRandom(maxValue: number): number {
    const range = maxValue !== null ? maxValue + 1 : 1000;
    return Math.floor(Math.random() * range);
}

export function removeNonNumeric(text: string): string {
    return text.replace(/\D/g, '').trim();
}
