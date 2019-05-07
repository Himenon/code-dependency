import * as Domain from "@app/domain";
import * as Types from "@app/types";

export interface Store {
  current: string;
  projects: Types.Project[];
  hasProjects: boolean;
}

export const generateStore = (domainStores: Domain.Stores): Store => ({
  current: domainStores.project.state.current,
  projects: domainStores.project.state.config.projects,
  hasProjects: domainStores.project.state.config.projects.length !== 0,
});
