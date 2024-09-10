export const isFuture = (dateString: string) => {
  const givenDate = new Date(dateString);

  const currentDate = new Date();

  return givenDate > currentDate;
};
