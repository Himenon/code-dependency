import * as Domain from "@app/domain";
import * as Types from "@app/types";
import * as path from "path";
import * as url from "url";

export interface Store {
  current: Types.Project | undefined;
  projects: Types.Project[];
  hasProjects: boolean;
  changeProject: (project: Types.Project) => void | Promise<void>;
}

const join = (publicPath: string, relativePath: string) => {
  if (new RegExp(/^https?:\/\//).test(publicPath)) {
    return url.resolve(publicPath, relativePath);
  }
  return path.join(publicPath, relativePath);
};

const fetchCsrProps = async (projectUrl: string): Promise<Types.CsrProps> => {
  try {
    const res = await fetch(projectUrl);
    const text = await res.text();
    return JSON.parse(text);
  } catch (e) {
    alert(`Unavailable project: ${projectUrl}`);
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
      const csrProps = await fetchCsrProps(join(domainStores.app.state.site.projectBasePath, project.path));
      domainStores.app.dispatch({ type: "UPDATE_CSR_PROPS", csrProps });
    } catch (e) {
      console.error(e);
    }
  },
});
