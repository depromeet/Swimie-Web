interface PresignedImageProps {
  imageName: string;
  presignedUrl: string;
}

export interface ProfileImagePresignedResponse {
  status: number;
  code: string;
  message: string;
  data: PresignedImageProps;
}
