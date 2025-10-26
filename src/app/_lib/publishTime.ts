const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const key in intervals) {
        const value = intervals[key];
        const time = Math.floor(diffInSeconds / value);
        if (time >= 1) {
            return `${time} ${key}${time > 1 ? "s" : ""} ago`;
        }
    }

    return "Just now";
};
export default timeAgo;