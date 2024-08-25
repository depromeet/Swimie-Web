import { Response } from '@/apis';

interface PresignedImageProps {
  imageId: number;
  imageName: string;
  presignedUrl: string;
}

export interface ImagePresignedResponse extends Response {
  data: PresignedImageProps[];
}
