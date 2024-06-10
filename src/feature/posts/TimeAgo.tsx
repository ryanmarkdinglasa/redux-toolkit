import { parseISO, formatDistanceToNow } from 'date-fns';

export const TimeAgo = ({ timestamp }: { timestamp: string}) => {
    let timeAgo = '';
    if (!timestamp) timeAgo =`No timestamp provided`;
    const date = parseISO(timestamp);
    if (date !instanceof Date && !isNaN(date as any)) timeAgo =`An error occured`;
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    );
};
