export interface ProfileEditImageSectionProps {
  image?: string;
  currentProfileImage?: string;
  onChangeImage: (image: string) => void;
  onChangeFile: (file?: File) => void;
}

export interface ProfileImageBottomSheetProps
  extends ProfileEditImageSectionProps {
  isOpen: boolean;
  onClose: () => void;
}
