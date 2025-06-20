export type TreeNode = {
  name: string;
};

export type Entry = TreeNode & {
  note: string;
  sum: number;
};

export type Section = TreeNode & {
  children: (Entry | Section)[];
};
