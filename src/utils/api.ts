async function createBioLink(formData: FormData): Promise<{ data: any; error: string }> {
  try {
    const response = await fetch('/api/biolinks', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { data: null, error: errorData.error || 'Failed to create bio link' };
    }

    const data = await response.json();
    return { data, error: "null" };
  } catch (error) {
    return { data: null, error: 'An unexpected error occurred' };
  }
}