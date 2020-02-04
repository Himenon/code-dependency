import * as React from "react";
import { Link, LinkProps } from "react-router-dom";

interface SideNavItemProps extends LinkProps {
  id: string;
  name: string;
  onClick?: () => Promise<void>;
  items?: SideNavItemProps[];
  depth?: number;
  children?: React.ReactNode;
  isDefaultOpen?: boolean;
}

const SpanStyle: React.CSSProperties = {
  paddingLeft: 8,
  paddingRight: 8,
  lineHeight: 1.5,
  fontSize: 14,
  cursor: "pointer",
  width: "100%",
};

const ButtonStyle: React.CSSProperties = {
  position: "relative",
  paddingRight: 8,
  lineHeight: 1.5,
  textAlign: "left",
  display: "block",
  width: "100%",
  padding: "2px 0",
  color: "#000",
  margin: 0,
  outline: "none",
  borderRadius: 0,
  cursor: "pointer",
  backgroundColor: "rgba(0, 0, 0, 0)",
  borderStyle: "none",
  fontSize: 14,
};

const SideNav = ({ isDefaultOpen, ...props }: SideNavItemProps) => {
  const [isActive, toggleActive] = React.useState(!!isDefaultOpen);
  if (!props.children) {
    const { id, name, items, depth, ...linkProps } = props;
    return (
      <Link
        key={props.id}
        id={props.id}
        style={{ ...ButtonStyle, paddingLeft: 6 * (props.depth || 0) }}
        onClick={() => {
          toggleActive(!isActive);
          props.onClick && props.onClick();
        }}
        {...linkProps}
      >
        {props.name}
        {isActive && props.children}
      </Link>
    );
  }
  return (
    <div key={props.id} id={props.id} style={{ paddingLeft: 6 * (props.depth || 0) }}>
      <span
        style={SpanStyle}
        onClick={() => {
          toggleActive(!isActive);
          props.onClick && props.onClick();
        }}
      >
        {props.name}
      </span>
      {isActive && props.children}
    </div>
  );
};

export { SideNav as Component, SideNavItemProps as Props };
