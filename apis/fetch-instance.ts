export async function fetchData<T>(
  url: string,
  accessToken: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error('Error fetching data:', errorData);
      throw new Error(`Failed to fetch data: ${errorData}`);
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
