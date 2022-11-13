## Use Refresh Token
This package work with Axios that helps 401 request auto trigger refresh-token-api and force all concurrent requests in waiting status.

If one request has http response status code: 401. The request will try to fetch refresh token then. If succeeded, the initial request will be triggered.

If there are many requests 401 at the same time, only one refresh token'll be triggered.
## Usage

Install with pnpm

```bash
$ pnpm i userefreshtoken
```

With npm
```bash
$ npm i userefreshtoken
```

With yarn
```bash
$ yarn add userefreshtoken
```


## Available Parameters

- axiosIns: AxiosInstance

- endpoint: Refresh token endpoint

- authHeaderKey: Header key. Default: `Authorization`

- getToken: Function. Return access token - must be string

- getRefreshToken: Function. Return refresh token - must be string

- onRefreshTokenSuccess: Callback function. This'll be triggered after refresh token succeed

