// Format time function
export const formatTime = (timeString) => {
  if (!timeString) return 'N/A';
  
  return new Date(timeString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format date function
export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

};
