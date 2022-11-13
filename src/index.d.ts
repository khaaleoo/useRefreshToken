/**
 * Type Definitions
 * **/
type TInstances = {
  axiosIns: any;
};

type TVariables = {
  endpoint: string;
  authHeaderKey?: string;
};

type TFunctions = {
  // Getters
  getToken: () => string;
  getRefreshToken: () => string;

  // Callback
  onRefreshTokenSuccess: (payload: any) => void;
};

export type TOptions = TInstances & TVariables & TFunctions;

export type GlobalThis = any;
