import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

// POST like => like + 1
export const postArtworkLike = async (id: number) => {
  const { data } = await axios.post(
    HOST_ADDRESS + '/artwork/' + id + '/like',
    null,
    { withCredentials: true }
  );
  return data;
};

// POST want => want + 1
export const postArtworkComment = async (id: number) => {
  const { data } = await axios.post(
    HOST_ADDRESS + '/artwork/' + id + '/comment',
    null,
    { withCredentials: true }
  );
  return data;
};

// POST comment
export const postArtworkWant = async (id: number) => {
  const { data } = await axios.post(
    HOST_ADDRESS + '/artwork/' + id + '/want',
    null,
    { withCredentials: true }
  );
  return data;
};
