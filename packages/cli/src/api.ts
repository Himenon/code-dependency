export interface ApiResponse<T> {
  meta: {
    statusCode: number;
  };
  data: T;
}

export const createApiResponse = <T>(data: T): ApiResponse<T> => {
  return {
    meta: {
      statusCode: 200,
    },
    data,
  };
};
