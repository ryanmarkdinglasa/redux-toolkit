import { parseISO, formatDistanceToNow } from 'date-fns';

export const TimeAgo = ({ timestamp }: { timestamp: string | undefined }) => {
    let timeAgo = '';

    if (timestamp) {
        const date = parseISO(timestamp);

        if (date instanceof Date && !isNaN(date as any)) { // Check if date is valid
            const timePeriod = formatDistanceToNow(date);
            timeAgo = `${timePeriod} ago`;
        } else {
            console.error('Invalid timestamp format:', timestamp);
        }
    } else {
        console.warn('No timestamp provided.');
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    );
};
