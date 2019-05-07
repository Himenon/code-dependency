export interface State {
  size: {
    width: number;
    height: number;
  };
  radius: number;
}

export const DEFAULT_STATE: State = {
  size: { width: NaN, height: NaN },
  radius: 6,
};
