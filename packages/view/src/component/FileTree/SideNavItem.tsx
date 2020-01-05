import * as React from "react";

interface SideNavItemProps {
  id: string;
  name: string;
  onClick?: () => Promise<void>;
  items?: SideNavItemProps[];
  children?: React.ReactNode;
}

const SideNav = (props: SideNavItemProps) => {
  const [isActive, toggleActive] = React.useState(false);
  if (!props.children) {
    return (
      <button type="button" key={props.id} id={props.id}>
        <span
          onClick={() => {
            toggleActive(!isActive);
            props.onClick && props.onClick();
          }}
        >
          {props.name}
        </span>
        {isActive && props.children}
      </button>
    );
  }
  return (
    <div key={props.id} id={props.id}>
      <span
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
