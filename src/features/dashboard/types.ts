export type FilterValues = {
  name: string;
  email: string;
  phone: string;
};

export type FilterProps = {
  filters: FilterValues;
  setFilters: (filters: FilterValues) => void;
};
