interface PresignedImageProps {
  imageId: number;
  imageName: string;
  presignedUrl: string;
}

export interface ImagePresignedResponse {
  status: number;
  code: string;
  message: string;
  data: PresignedImageProps[];
}
