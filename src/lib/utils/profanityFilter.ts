// Basic profanity filter
const profanityList = [
    'fuck', 'shit', 'ass', 'bitch', 'damn', 'hell', 'crap', 'piss', 
    'dick', 'cock', 'pussy', 'bastard', 'slut', 'whore', 'fag', 
    'nigger', 'nigga', 'retard', 'cunt', 'twat', 'wank', 'bollocks'
];

/**
 * Checks if text contains profanity
 */
export function containsProfanity(text: string): boolean {
    if (!text) return false;
    
    const lowerText = text.toLowerCase();
    
    return profanityList.some(word => {
        // Check for whole word matches with word boundaries
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        return regex.test(lowerText);
    });
}

/**
 * Replaces profanity in text with asterisks
 */
export function filterProfanity(text: string): string {
    if (!text) return text;
    
    let filtered = text;
    
    profanityList.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        filtered = filtered.replace(regex, (match) => '*'.repeat(match.length));
    });
    
    return filtered;
}

/**
 * Filters profanity from project object
 */
export function filterProjectProfanity<T extends { project_name: string; project_description: string }>(
    project: T
): T {
    return {
        ...project,
        project_name: filterProfanity(project.project_name),
        project_description: filterProfanity(project.project_description || '')
    };
}
