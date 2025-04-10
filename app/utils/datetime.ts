export const convertToFormattedDate = (isoString: string) => {
    const date = new Date(isoString);
    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(date);
    
    return formattedDate;
};