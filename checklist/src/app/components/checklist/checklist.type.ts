export interface Checklist {
  id: string;
  name: string;
  phases: ChecklistPhase[];
  activePhase: number;
}

export interface ChecklistPhase {
  id: string;
  name: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  action: string;
  checked: boolean;
}
