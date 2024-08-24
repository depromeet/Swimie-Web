import { useMutation } from '@tanstack/react-query';

import { ProfileImagePresignedResponse } from './dto';

async function getImageProfilePresignedUrl(
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

export function useGetImageProfilePresignedUrl() {
  return useMutation({
    mutationFn: getImageProfilePresignedUrl,
  });
}
