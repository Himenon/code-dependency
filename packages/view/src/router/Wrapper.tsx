import * as React from "react";
import { useLocation } from "react-router-dom";
import { ServerSideRenderingProps } from "@app/interface";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export interface HoCProps {
  pathname: string;
}

export interface Props {
  ssrProps: ServerSideRenderingProps;
  component: React.FC<ServerSideRenderingProps & HoCProps>;
}

export const Container: React.FC<Props> = ({ component: Component, ssrProps }) => {
  const query = useQuery();
  const pathname = query.get("pathname") || "";
  const hocProps: HoCProps = {
    pathname,
  };
  const props: ServerSideRenderingProps & HoCProps = { ...ssrProps, ...hocProps };
  return <Component {...props} />;
};
