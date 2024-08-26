import { ProfileIndexType } from '@/public/images/default-profile';

export interface ProfileEditImageSectionProps {
  defaultProfileIndex: ProfileIndexType;
  onChangeFile: (file: File) => void;
  onChangeDefaultProfileIndex: (index: ProfileIndexType) => void;
}

export interface ProfileImageBottomSheetProps
  extends Omit<ProfileEditImageSectionProps, 'defaultProfileIndex'> {
  isOpen: boolean;
  onClose: () => void;
  onChangeImage: (image: string) => void;
}
