
const API_URL = "http://127.0.0.1:8000";

export interface DatasetOptions {
  dataset_id: string;
  products: string[];
  categories: string[];
  regions: string[];
}

export interface ProductDetails {
  dataset_id: string;
  product: string;
  category: string;
  region: string;
  current_cost: number;
  current_price: number;
  quantity: number;
  month: string;
}

export async function getDatasetOptions(
  datasetId: string
): Promise<DatasetOptions> {
  const response = await fetch(
    `${API_URL}/datasets/${encodeURIComponent(datasetId)}/options`
  );

  if (!response.ok) {
    throw new Error(`Unable to load dataset options (${response.status}).`);
  }

  return response.json();
}

export async function getProductDetails(
  datasetId: string,
  product: string,
  region: string
): Promise<ProductDetails> {
  const params = new URLSearchParams({ product, region });

  const response = await fetch(
    `${API_URL}/datasets/${encodeURIComponent(datasetId)}/product-details?${params.toString()}`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail ??
        `Unable to load product details (${response.status}).`
    );
  }

  return response.json();
}
