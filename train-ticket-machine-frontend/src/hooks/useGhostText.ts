import { useCallback, useEffect, useRef } from "react";

interface UseGhostTextProps {
  inputValue: string;
  suggestion: string;
}

type TextStyles = Record<string, string> & {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
};

type Position = Record<string, string> & {
  left: string;
  top: string;
  transform: string;
};

/**
 * Hook for managing ghost text positioning in input fields
 *
 * @param inputValue The current value of the input field
 * @param suggestion The ghost text suggestion to show
 * @returns Refs and utilities for ghost text positioning
 */
export function useGhostText({ inputValue, suggestion }: UseGhostTextProps) {
  const ghostTextRef = useRef<HTMLDivElement>(null);
  const measurementRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastUpdatedValueRef = useRef<string>(inputValue);

  const updateGhostTextPosition = useCallback(() => {
    const elements = {
      input: inputRef.current,
      ghost: ghostTextRef.current,
      measurement: measurementRef.current,
    };

    if (!elements.input || !elements.ghost || !elements.measurement) return;

    const currentValue = elements.input.value || inputValue;
    lastUpdatedValueRef.current = currentValue;

    const textStyles = getTextStyles(elements.input);

    applyStyles(elements.measurement, textStyles);
    elements.measurement.textContent = currentValue;

    const position = calculateGhostPosition(elements.input, elements.measurement);

    applyStyles(elements.ghost, {
      ...textStyles,
      ...position,
      position: "absolute",
    });
  }, [inputValue]);

  const getTextStyles = (element: HTMLElement): TextStyles => {
    const styles = window.getComputedStyle(element);
    return {
      fontFamily: styles.fontFamily,
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      letterSpacing: styles.letterSpacing,
    };
  };

  // Calculate ghost position based on input and measurement
  const calculateGhostPosition = (input: HTMLElement, measurement: HTMLElement): Position => {
    const inputStyles = window.getComputedStyle(input);
    const textWidth = measurement.offsetWidth;
    const paddingLeft = parseFloat(inputStyles.paddingLeft);
    const inputHeight = input.getBoundingClientRect().height;

    return {
      left: `${paddingLeft + textWidth + 1}px`,
      top: `${inputHeight / 2}px`,
      transform: "translateY(-50%)",
    };
  };

  const applyStyles = (element: HTMLElement, styles: Record<string, string>) => {
    Object.assign(element.style, styles);
  };

  useEffect(() => {
    if (inputValue && suggestion) {
      updateGhostTextPosition();
    }
  }, [inputValue, suggestion, updateGhostTextPosition]);

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(updateGhostTextPosition);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateGhostTextPosition]);

  return {
    ghostTextRef,
    measurementRef,
    inputRef,
    updateGhostTextPosition,
  };
}
