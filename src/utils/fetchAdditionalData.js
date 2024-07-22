import { fetchAdditionalData } from './dynamicApi';
// To fetch the data for the leaf node
export const getAdditionalData = async (nodeId, setAdditionalData, setDataError) => {
  try {
    const data = await fetchAdditionalData(nodeId);
    setAdditionalData(data || null);
    setDataError(!data);
  } catch {
    setAdditionalData(null);
    setDataError(true);
  }
};
