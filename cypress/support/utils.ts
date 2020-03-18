export function getRandom(max: number): number {
    return Math.round(Math.random() * max);
}

export function getSubstringByRegex(text: string, regex: string): string {
    const result = text.match(regex) || [];
    if (result[1]) {
        return result[1];
    }
    return 'Nothing found';
}

export function getRandomString(): string {
    return Math.random().toString(36).slice(-10);
}
