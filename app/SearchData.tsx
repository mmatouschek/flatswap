import { create } from 'zustand'

type SearchData = {
 query: string;
 searchResult: any[];
 startDate: string;
 endDate:string;
 current: string;
 
  setQuery: (v: string) => void
  setSearchResult: (v: any[]) => void
  setStartDate: (v: string) => void
  setEndDate: (v: string) => void
  setCurrent: (v: string) => void
}

export const useSearchData = create<SearchData>((set) => ({
  query: "",
  searchResult: [],
  startDate: null,
  endDate: null,
  current: "start",

  
  setQuery: (v) => set({ query: v }),
  setSearchResult: (v) => set({ searchResult: v }),
  setStartDate: (v) => set({ startDate: v }),
  setEndDate: (v) => set({ endDate: v }),
  setCurrent: (v) => set({ current: v })
}))