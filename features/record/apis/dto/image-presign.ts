import { Response } from '@/apis';

interface PresignedImageProps {
  imageId: number;
  imageName: string;
  presignedUrl: string;
}

export type ImagePresignedResponse = Response<PresignedImageProps[]>;
