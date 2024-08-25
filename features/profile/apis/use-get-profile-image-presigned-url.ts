import { useMutation } from '@tanstack/react-query';

import { ProfileImagePresignedResponse } from './dto';

async function getProfileImagePresignedUrl(
  imageName: string,
): Promise<ProfileImagePresignedResponse> {
  const res = await fetch(`/api/image/profile/presigned/url`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageName }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useGetProfileImagePresignedUrl() {
  return useMutation({
    mutationFn: getProfileImagePresignedUrl,
  });
}
