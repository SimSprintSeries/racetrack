export type navOption = {
  label: string;
  path?: string;
  icon?: string;
  type?: string;
  function?: Function;
  children?: navOption[];
};
