import * as Domain from "@app/domain";
import * as Types from "@app/types";

export interface Store {
  links: Types.Link[];
  position: {
    scale: {
      x: number;
      y: number;
    };
    offset: {
      x: number;
      y: number;
    };
  };
  canShow: boolean;
}

export const generateStore = (domainStores: Domain.Stores): Store => ({
  links: domainStores.app.state.links,
  position: {
    scale: {
      x: domainStores.dendrogram.state.size.height,
      y: domainStores.dendrogram.state.size.width / 1.5,
    },
    offset: {
      x: 0,
      y: domainStores.dendrogram.state.size.width / 7,
    },
  },
  canShow: !isNaN(domainStores.dendrogram.state.size.width) && !isNaN(domainStores.dendrogram.state.size.height),
});
