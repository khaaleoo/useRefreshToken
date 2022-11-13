/**
 * Type Definitions
 * **/
type TInstances = {
  axiosIns: any;
};

type TVariables = {
  endpoint: string;
  maxRefreshAttempts?: number;
  timeRange?: number;
  authHeaderKey?: string;
};

type TFunctions = {
  // Getters
  getToken: () => string;
  getRefreshToken: () => string;
  getAccessTokenExpiresIn: () => number;

  // Callback
  onRefreshTokenSuccess: (payload: any) => void;
};

export type TOptions = TInstances & TVariables & TFunctions;

export type GlobalThis = any;
