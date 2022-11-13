"use strict";
(() => {
  // src/index.ts
  var constants = {
    AUTH_HEADER_KEY: "Authorization"
  };
  globalThis.refreshing_token = false;
  var refreshToken = (axios, endpoint, refreshToken2) => {
    return axios.post(endpoint, refreshToken2);
  };
  var src_default = {
    install: (options) => {
      const {
        axiosIns,
        endpoint,
        authHeaderKey = constants.AUTH_HEADER_KEY,
        getToken,
        getRefreshToken,
        onRefreshTokenSuccess
      } = options;
      axiosIns.interceptors.request.use((config) => {
        config.headers[authHeaderKey] = getToken();
        return config;
      });
      axiosIns.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
          originalRequest.headers = { ...originalRequest?.headers };
          if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const isRefreshingToken = globalThis.refreshing_token;
            globalThis.refreshing_token = isRefreshingToken || refreshToken(axiosIns, endpoint, getRefreshToken());
            try {
              const res = await globalThis.refreshing_token;
              onRefreshTokenSuccess(res.data);
              return axiosIns(originalRequest);
            } catch (error2) {
              return Promise.reject(error2);
            }
          }
          return Promise.reject(error);
        }
      );
    }
  };
})();
