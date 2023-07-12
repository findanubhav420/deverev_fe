import axios from 'axios';
import { BACKEND_URL, AUTH_URL} from '../../constants/apiEndPoints';

const makeRequest = async (apiEndPoint, navigate, dynamicConfig = {}) => {
  try {
    const requestDetails = {
      baseURL: BACKEND_URL,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    };
    const { data } = await axios(requestDetails);
    return data;
  } catch (e) {
    return null;
  }
};

const makeAuthRequest = async (apiEndPoint, navigate, dynamicConfig) => {
  try {
    const requestDetails = {
      baseURL: AUTH_URL,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
    };
    const { data } = await axios(requestDetails);
    return data;
  } catch (e) {
    return null;
  }
};

export {makeRequest, makeAuthRequest};