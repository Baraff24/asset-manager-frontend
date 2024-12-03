export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  if (dateString.includes('T')) {
    return dateString.split('T')[0];
  }
  return dateString;
};
