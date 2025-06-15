import { createContext, useContext } from 'react';
import { ZodTypeAny } from 'zod';

const SchemaContext = createContext<ZodTypeAny | undefined>(undefined);

export const SchemaProvider = ({ schema, children }: { schema: ZodTypeAny; children: React.ReactNode }) => {
  return <SchemaContext.Provider value={schema}>{children}</SchemaContext.Provider>;
};

export const useFormSchema = (): ZodTypeAny => {
  const context = useContext(SchemaContext);
  if (context === undefined) {
    throw new Error('useFormSchema must be used within a SchemaProvider');
  }
  return context;
};
