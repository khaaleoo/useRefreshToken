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

  // Handlers
  handleRefreshToken?: (...args: any[]) => Promise<any>;

  // Callback
  onRefreshTokenSuccess: (payload: any) => void;
};

export type TOptions = TInstances & TVariables & TFunctions;

export type GlobalThis = any;
