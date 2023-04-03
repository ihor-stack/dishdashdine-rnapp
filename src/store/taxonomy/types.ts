import { ITaxonomy } from "@/api/generic";

export type taxonomyStateType = {
  taxonomy: ITaxonomy[];
  topPicks: ITaxonomy[];
  loadingTaxonomy: boolean;
};
