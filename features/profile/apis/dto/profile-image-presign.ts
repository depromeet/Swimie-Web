import { Response } from '@/apis';

interface PresignedImageProps {
  imageName: string;
  presignedUrl: string;
}

export interface ProfileImagePresignedResponse extends Response {
  data: PresignedImageProps;
}
