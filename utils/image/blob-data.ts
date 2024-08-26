export const getBlobData = (file: File) => {
  const blobData = new Blob([file]);
  return blobData;
};
