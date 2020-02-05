import * as React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { ServerSideRenderingProps } from "@app/interface";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export interface HoCProps {
  pathname?: string;
  history?: ReturnType<typeof useHistory>;
  query: URLSearchParams;
}

export interface Props {
  ssrProps: ServerSideRenderingProps;
  component: React.FC<ServerSideRenderingProps & HoCProps>;
}

export const Container: React.FC<Props> = ({ component: Component, ssrProps }) => {
  const query = useQuery();
  const pathname = ssrProps.selectedPathname || query.get("pathname") || "";
  const history = useHistory();
  const hocProps: HoCProps = {
    pathname,
    history,
    query,
  };
  const props: ServerSideRenderingProps & HoCProps = { ...ssrProps, ...hocProps };
  return <Component {...props} />;
};

export const SsrContainer: React.FC<Props> = ({ component: Component, ssrProps }) => {
  const query = new URLSearchParams();
  const hocProps: HoCProps = {
    pathname: ssrProps.selectedPathname,
    history: undefined,
    query,
  };
  const props: ServerSideRenderingProps & HoCProps = { ...ssrProps, ...hocProps };
  return <Component {...props} />;
};
