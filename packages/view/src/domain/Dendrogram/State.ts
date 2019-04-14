export interface State {
  size: {
    width: number;
    height: number;
  };
  radius: number;
}

export const initialState: State = {
  size: { width: NaN, height: NaN },
  radius: 6,
};
