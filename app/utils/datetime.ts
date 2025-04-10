export const convertToFormattedDate = (isoString: string) => {
    const date = new Date(isoString);
    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(date);
    
    return formattedDate;
};

export const getDateName = (isoString: string) => {
    const today = new Date(); // 오늘 날짜
    const yesterday = new Date(today); // 어제 날짜
    yesterday.setDate(today.getDate() - 1);
    const dayBeforeYesterday = new Date(today); // 그제 날짜
    dayBeforeYesterday.setDate(today.getDate() - 2);

    switch(isoString) {
        case today.toISOString().split('T')[0]:
          return "오늘";
        case yesterday.toISOString().split('T')[0]:
          return "어제";
        case dayBeforeYesterday.toISOString().split('T')[0]:
          return "그저께";
        default:
          return new Date(isoString).toISOString().split('T')[0];
    }

};