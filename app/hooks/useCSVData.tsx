// hooks/useCSVData.ts
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { Individual } from '~/types/SeacoTypes';

interface CSVDataState {
  data: Individual[];
  isLoading: boolean;
  error: string | null;
}

export const useCSVData = (source: string): CSVDataState => {
  const [state, setState] = useState<CSVDataState>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(source);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setState({
              data: results.data as Individual[],
              isLoading: false,
              error: null,
            });
          },
          error: (err) => {
            setState(prev => ({
              ...prev,
              isLoading: false,
              error: "Error parsing CSV data"
            }));
            console.error("Parsing error:", err);
          },
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: "Error fetching data"
        }));
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [source]);

  return state;
};