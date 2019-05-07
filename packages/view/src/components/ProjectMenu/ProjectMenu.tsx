import * as Types from "@app/types";
import classNames from "classnames";
import * as React from "react";

interface ClassNames {
  dropdown?: string;
  btn?: string;
  btnSm?: string;
  btnSecondary?: string;
  dropdownToggle?: string;
  dropdownMenu?: string;
  dropdownItem?: string;
  show?: string;
}

const styles: ClassNames = require("./project-menu.scss");

export interface ProjectMenuProps {
  current: string;
  projects: Types.Project[];
}

const createMenuItem = (project: Types.Project, idx: number) => {
  return (
    <button className={styles.dropdownItem} type="button" key={`project-menu-${idx}`}>
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
          {projects.map(createMenuItem)}
        </div>
      </div>
    </>
  );
};

export { ProjectMenuProps as Props, ProjectMenu as Component };
