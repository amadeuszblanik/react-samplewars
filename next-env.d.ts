/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.scss" {
  interface ClassNames {
    [className: string]: string;
  }
  const classNames: ClassNames;
  export = classNames;
}
