## Use Refresh Token
This package work with Axios that helps 401 request auto trigger refresh-token-api and force all concurrent requests in waiting status.

If one request has http response status code: 401. The request will try to fetch refresh token then. If succeeded, the initial request will be triggered.

If there are many requests 401 at the same time, only one refresh token'll be triggered.
## Usage

Install with pnpm

```bash
$ pnpm i use-refresh-token
```

With npm
```bash
$ npm i use-refresh-token
```

With yarn
```bash
$ yarn add use-refresh-token
```


## Available Parameters

- axiosIns: AxiosInstance

- endpoint: Refresh token endpoint

- authHeaderKey: Header key. Default: `Authorization`

- getToken: Function. Return access token - must be string

- getRefreshToken: Function. Return refresh token - must be string

- handleRefreshToken: Function. This'll be triggered before refresh token. You can use this to add custom headers, etc.

- onRefreshTokenSuccess: Callback function. This'll be triggered after refresh token succeed


## Demo

Insert gif or link to demo

```
import axios from 'axios'
import useRefreshToken from 'use-refresh-token'

const axios_instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

useRefreshToken.install({
  axiosIns: axios_instance,
  endpoint: 'https://abc/auth/refresh-token',
  getToken: () => localStorage.getItem('access_token'),
  getRefreshToken: () => localStorage.getItem('refresh_token'),
  onRefreshTokenSuccess: (payload: any) => {
    localStorage.setItem('access_token', payload.access_token || '')
  },
})

/*
  Sample requests
  Replace with your own API
  Suppose that this API will return 401 if access token is expired, and you need to refresh token to get new access token
  Then, only one request will be triggered to refresh token
  After that, all concurrent requests will be triggered
*/
const resourceUrl = https://abc/store/get-scope-of-user
axios_instance
  .get(resourceUrl)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

axios_instance
  .get(resourceUrl)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

axios_instance
  .get(resourceUrl)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

```