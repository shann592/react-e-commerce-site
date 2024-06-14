import apiClient from "../utils/api_client";

export function getSuggestionsAPI(search) {
  return apiClient.get(`/products/suggestions?search=${search}`);
}
