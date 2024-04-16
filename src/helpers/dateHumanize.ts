import humanizeDuration from 'humanize-duration';

export const dateDurationHumanize = (date: string)=> {
    const now = Date.now();
    const dateMilliseconds = new Date(date).getTime();

    return humanizeDuration(now - dateMilliseconds, { units: ['d', 'h'], round: true });
};