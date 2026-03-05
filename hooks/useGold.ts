import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useWorldGold() {
  return useSWR("/api/gold/world", fetcher, {
    refreshInterval: 120000
  });
}

export function useGoldSJC() {
  return useSWR("/api/gold/vietnam/sjc", fetcher, {
    refreshInterval: 120000
  });
}

export function useGoldRing() {
  return useSWR("/api/gold/vietnam/ring", fetcher, {
    refreshInterval: 120000
  });
}