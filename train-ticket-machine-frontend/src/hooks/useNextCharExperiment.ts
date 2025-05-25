import { useExperiment } from "@statsig/react-bindings";

export const NEXT_CHAR_EXPERIMENT_NAME = "next_char_suggestions_experiment";

export enum NextCharVariant {
  CLICKABLE = "clickable",
  NON_CLICKABLE = "non_clickable",
}

interface UseNextCharExperimentResult {
  isClickable: boolean;
  variant: NextCharVariant;
}

export const useNextCharExperiment = (): UseNextCharExperimentResult => {
  const experiment = useExperiment(NEXT_CHAR_EXPERIMENT_NAME);

  const variant =
    experiment?.value?.variant === NextCharVariant.CLICKABLE
      ? NextCharVariant.CLICKABLE
      : NextCharVariant.NON_CLICKABLE;

  return {
    isClickable: variant === NextCharVariant.CLICKABLE,
    variant,
  };
};
