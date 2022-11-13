declare module 'userefreshtoken/index' {
  import { TOptions } from "userefreshtoken/index.d/index";
  const _default: {
      install: (options: TOptions) => void;
  };
  export default _default;

}
declare module 'userefreshtoken' {
  import main = require('userefreshtoken/src/index');
  export = main;
}