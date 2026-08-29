"use client";

import { ChevronDown } from "lucide-react";

interface SortOption {
  value: string;
  label: string;
}

interface ProductFiltersProps {
  brands: string[];
  conditions: string[];
  storageOptions: string[];
  sortOptions: SortOption[];
  selectedBrand: string;
  selectedCondition: string;
  selectedStorage: string;
  sortBy: string;
  onBrandChange: (v: string) => void;
  onConditionChange: (v: string) => void;
  onStorageChange: (v: string) => void;
  onSortChange: (v: string) => void;
}

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[] | SortOption[];
  onChange: (v: string) => void;
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-[#111111] border border-white/10 hover:border-white/20 rounded-xl px-4 py-2.5 text-white text-sm pr-9 focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
      aria-label={label}
    >
      {options.map((opt) =>
        typeof opt === "string" ? (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ) : (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )
      )}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A1A1AA] pointer-events-none" />
  </div>
);

export default function ProductFilters({
  brands,
  conditions,
  storageOptions,
  sortOptions,
  selectedBrand,
  selectedCondition,
  selectedStorage,
  sortBy,
  onBrandChange,
  onConditionChange,
  onStorageChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <FilterSelect
        label="Filter by brand"
        value={selectedBrand}
        options={brands}
        onChange={onBrandChange}
      />
      <FilterSelect
        label="Filter by condition"
        value={selectedCondition}
        options={conditions}
        onChange={onConditionChange}
      />
      <FilterSelect
        label="Filter by storage"
        value={selectedStorage}
        options={storageOptions}
        onChange={onStorageChange}
      />
      <div className="ml-auto">
        <FilterSelect
          label="Sort by"
          value={sortBy}
          options={sortOptions}
          onChange={onSortChange}
        />
      </div>
    </div>
  );
}
