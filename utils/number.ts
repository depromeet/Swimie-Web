export const formatMeters = (meter: number) => {
  return meter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
