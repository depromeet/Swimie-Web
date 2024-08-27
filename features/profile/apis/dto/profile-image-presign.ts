import { Response } from '@/apis';

interface PresignedImageProps {
  imageName: string;
  presignedUrl: string;
}

export type ProfileImagePresignedResponse = Response<PresignedImageProps>;
