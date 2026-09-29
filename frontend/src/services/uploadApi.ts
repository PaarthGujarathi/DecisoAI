export interface UploadQuality {
  duplicate_rows: number;
  missing_cells: number;
  completeness: number;
}

export interface UploadResponse {
  filename: string;
  rows: number;
  columns: number;
  column_names: string[];
  numeric_columns: string[];
  categorical_columns: string[];
  missing_values: Record<string, number>;
  quality: UploadQuality;
  preview: Record<string, unknown>[];
}

const API_BASE_URL = "http://localhost:8000";

export async function uploadDataset(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload/dataset`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = `Upload failed with status code ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && typeof errorData.detail === "string") {
          errorMessage = errorData.detail;
        } else if (errorData && typeof errorData.message === "string") {
          errorMessage = errorData.message;
        }
      } catch {
        // Fallback to generic status error if JSON parsing fails
      }
      throw new Error(errorMessage);
    }

    const data: UploadResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected network error occurred while connecting to the backend server.");
  }
}
