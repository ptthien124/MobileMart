import { useCallback } from 'react';

/**
 * Represents a set of validation rules for a single field or value.
 * Uses a fluent interface (chaining) to add rules.
 */
export class ValidationRuleSet {
  required: { value: boolean; message: string } | undefined = undefined;
  minLength: { value: number; message: string } | undefined = undefined;
  maxLength: { value: number; message: string } | undefined = undefined;

  /**
   * Adds a 'required' validation rule.
   * @param message - Optional custom error message. Defaults to `Required`.
   * @returns The ValidationRuleSet instance for chaining.
   */
  addRequired(message: string = 'Required'): this {
    this.required = { value: true, message };
    return this;
  }

  /**
   * Adds a 'minimum length' validation rule.
   * @param length - The minimum required length.
   * @param message - Optional custom error message. Defaults to `Min length {length}`.
   * @returns The ValidationRuleSet instance for chaining.
   */
  addMinLength(length: number, message: string = `Min length ${length}`): this {
    this.minLength = { value: length, message };
    return this;
  }

  /**
   * Adds a 'maximum length' validation rule.
   * @param length - The maximum allowed length.
   * @param message - Optional custom error message. Defaults to `Max length {length}`.
   * @returns The ValidationRuleSet instance for chaining.
   */
  addMaxLength(length: number, message: string = `Max length ${length}`): this {
    this.maxLength = { value: length, message };
    return this;
  }
}

/**
 * React Hook that provides a memoized factory function for creating ValidationRuleSet instances.
 *
 * This helps define validation rules consistently within React components.
 * The factory function itself is memoized using useCallback, ensuring stable references
 * if passed down as props or used in dependency arrays of other hooks.
 *
 * @returns {() => ValidationRuleSet} A function that, when called, returns a new ValidationRuleSet instance.
 */
export const useRules = () => {
  /**
   * Factory function to create and configure a new ValidationRuleSet.
   * Example: const nameRules = buildRuleSet().addRequired().addMinLength(3);
   * @returns {ValidationRuleSet} A new ValidationRuleSet instance ready for configuration.
   */
  const buildRuleSet = useCallback((): ValidationRuleSet => {
    return new ValidationRuleSet();
  }, []); // Empty dependency array means this function reference is stable

  return buildRuleSet;
};
