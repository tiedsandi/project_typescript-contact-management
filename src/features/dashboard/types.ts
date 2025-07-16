export type FilterValues = {
  name: string;
  email: string;
  phone: string;
};

export type FilterProps = {
  filters: FilterValues;
  setFilters: (filters: FilterValues) => void;
};

export type Contact = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};
