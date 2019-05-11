import * as Domain from "@app/domain";
import * as Types from "@app/types";

export interface Store {
  current: Types.Project;
  projects: Types.Project[];
  hasProjects: boolean;
  changeProject: (project: Types.Project) => void | Promise<void>;
}

const fetchCsrProps = async (url: string): Promise<Types.CsrProps> => {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (e) {
    throw Error(e);
  }
};

export const generateStore = (domainStores: Domain.Stores): Store => ({
  current: domainStores.project.state.current,
  projects: domainStores.project.state.config.projects,
  hasProjects: domainStores.project.state.config.projects.length !== 0,
  changeProject: async (project: Types.Project) => {
    domainStores.project.dispatch({ type: "CHANGE_PROJECT", project });
    try {
      const csrProps = await fetchCsrProps(domainStores.app.state.site.projectBasePath + project.path);
      domainStores.app.dispatch({ type: "UPDATE_CSR_PROPS", csrProps });
    } catch (e) {
      console.error(e);
    }
  },
});
