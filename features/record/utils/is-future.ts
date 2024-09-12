export const isFuture = (dateString: string) => {
  const givenDate = new Date(dateString);

  givenDate.setHours(0, 0, 0, 0);

  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);

  return givenDate > currentDate;
};
