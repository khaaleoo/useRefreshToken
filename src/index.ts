import { GlobalThis, TOptions } from "./index.d";
/**
 * Constants
 * **/
const constants = {
  AUTH_HEADER_KEY: "Authorization",
};

/**
 * Global variables
 * **/
(globalThis as GlobalThis).refreshing_token = false;

const refreshToken = (
  axios: any,
  endpoint: string,
  refreshToken: string
): Promise<{
  data: { token: string; expiresIn: number };
}> => {
  return axios.post(endpoint, refreshToken);
};

export default {
  install: (options: TOptions) => {
    const {
      axiosIns,
      endpoint,
      authHeaderKey = constants.AUTH_HEADER_KEY,

      getToken,
      getRefreshToken,
      onRefreshTokenSuccess,
    } = options;

    axiosIns.interceptors.request.use((config: { headers: { [x: string]: string } }) => {
      config.headers[authHeaderKey] = getToken();
      return config;
    });

    axiosIns.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const originalRequest = error.config;
        originalRequest.headers = { ...originalRequest?.headers };

        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const isRefreshingToken = (globalThis as GlobalThis).refreshing_token;
          (globalThis as GlobalThis).refreshing_token =
            isRefreshingToken || refreshToken(axiosIns, endpoint, getRefreshToken());

          try {
            const res = await (globalThis as GlobalThis).refreshing_token;
            onRefreshTokenSuccess(res.data);
            return axiosIns(originalRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
  },
};
