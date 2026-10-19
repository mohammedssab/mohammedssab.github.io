export type CommandOutputType =
  | 'table'
  | 'describe'
  | 'logs'
  | 'text'
  | 'error'
  | 'clear'
  | 'all';

export interface TableOutput {
  type: 'table';
  resource: string;
  headers: string[];
  rows: string[][];
  footer?: string;
}

export interface DescribeSection {
  title: string;
  items?: string[];
  fields?: Record<string, string>;
}

export interface DescribeOutput {
  type: 'describe';
  kind: string;
  name: string;
  metadata: Record<string, string>;
  sections: DescribeSection[];
}

export interface LogsOutput {
  type: 'logs';
  podName: string;
  lines: string[];
}

export interface TextOutput {
  type: 'text';
  content: string;
  isHelp?: boolean;
  isExplain?: boolean;
}

export interface ErrorOutput {
  type: 'error';
  message: string;
  suggestion?: string;
}

export interface ClearOutput {
  type: 'clear';
}

export interface AllOutput {
  type: 'all';
  sections: {
    title: string;
    output: TableOutput;
  }[];
}

export type CommandResult =
  | TableOutput
  | DescribeOutput
  | LogsOutput
  | TextOutput
  | ErrorOutput
  | ClearOutput
  | AllOutput;

export interface HistoryItem {
  id: string;
  command: string;
  result: CommandResult;
  timestamp: number;
}
