import * as Types from "@app/types";
import classNames from "classnames";
import * as React from "react";
import { Project } from "./Constants";

interface ClassNames {
  dropdown?: string;
  btn?: string;
  btnSm?: string;
  btnSecondary?: string;
  dropdownToggle?: string;
  dropdownMenu?: string;
  dropdownItem?: string;
  show?: string;
  active?: string;
}

const styles: ClassNames = require("./project-menu.scss");

export interface ProjectMenuProps {
  current: Types.Project | undefined;
  projects: Project[];
}

const createMenuItem = ({ project, ...props }: Project, idx: number, current: Types.Project | undefined) => {
  const isActive = !!current && (current.name === project.name && current.path === project.path);
  return (
    <button
      className={classNames(styles.dropdownItem, isActive ? styles.active : undefined)}
      type="button"
      key={`project-menu-${idx}`}
      {...props}
    >
      {project.name}
    </button>
  );
};

const ProjectMenu = ({ projects, current }: ProjectMenuProps) => {
  const [isShow, toggleDropdownMenu] = React.useState(false);
  return (
    <>
      <div className={classNames(styles.dropdown)}>
        <button
          className={classNames(styles.btn, styles.btnSecondary, styles.btnSm, styles.dropdownToggle)}
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => toggleDropdownMenu(!isShow)}
        >
          Project Menu
        </button>
        <div className={classNames(styles.dropdownMenu, isShow ? styles.show : undefined)} aria-labelledby="dropdownMenu2">
          {projects.map((project, idx) => createMenuItem(project, idx, current))}
        </div>
      </div>
    </>
  );
};

export { ProjectMenuProps as Props, ProjectMenu as Component };
