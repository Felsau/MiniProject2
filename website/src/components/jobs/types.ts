export type Job = {
  id: number;
  title: string | null;
  salary: string | null;
  description: string | null;
  location: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};