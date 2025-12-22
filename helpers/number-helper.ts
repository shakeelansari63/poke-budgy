import { numberOption } from "@/constants/app-constants";

export const formatNumberLabel = (label: number): string => {
  if (Math.abs(label) > 1000000000000)
    return `${(label / 1000000000000).toLocaleString("en-US", numberOption)} T`;

  if (Math.abs(label) > 1000000000)
    return `${(label / 1000000000).toLocaleString("en-US", numberOption)} B`;

  if (Math.abs(label) > 1000000)
    return `${(label / 1000000).toLocaleString("en-US", numberOption)} M`;

  if (Math.abs(label) > 1000)
    return `${(label / 1000).toLocaleString("en-US", numberOption)} K`;

  return label.toLocaleString("en-US", numberOption);
};
