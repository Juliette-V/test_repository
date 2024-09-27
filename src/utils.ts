export const getBoundingRect = (jsEvent: MouseEvent | null) => {
  const rect = (jsEvent?.target as HTMLElement)?.getBoundingClientRect();
  const top = rect.top + rect.height / 2 + window.scrollY;
  const left = rect.left + rect.width / 2;

  return { top, left };
};

export const getTimeString = (date?: Date | null) => {
  if (!date) return '';

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
