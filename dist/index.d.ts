declare module 'use-refresh-token/index' {
  import { TOptions } from "use-refresh-token/index.d/index";
  const _default: {
      install: (options: TOptions) => void;
  };
  export default _default;

}
declare module 'use-refresh-token' {
  import main = require('use-refresh-token/src/index');
  export = main;
}