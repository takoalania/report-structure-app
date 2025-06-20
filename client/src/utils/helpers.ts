import { Entry, Section } from './types';

export function isEntry(node: any): node is Entry {
  return typeof node.sum === 'number' && typeof node.note === 'string';
}

export function computeSum(node: Section | Entry): number {
  if (isEntry(node)) return node.sum;
  return node.children.reduce((total, child) => total + computeSum(child), 0);
}

export function updateEntrySum(data: Section | Entry, path: number[], value: number) {
  let current: any = data;
  for (let i = 0; i < path.length - 1; i++) {
    current = current.children[path[i]];
  }
  const entry = current.children[path[path.length - 1]];
  if (isEntry(entry)) {
    entry.sum = value;
  }
}

export function updateEntryNote(data: Section | Entry, path: number[], value: string) {
  let current: any = data;
  for (let i = 0; i < path.length - 1; i++) {
    current = current.children[path[i]];
  }
  const entry = current.children[path[path.length - 1]];
  if (isEntry(entry)) {
    entry.note = value;
  }
}

export function addEntry(target: Section) {
  target.children.push({
    name: "New Entry",
    sum: 0,
    note: ""
  });
}

export function addSection(target: Section) {
  target.children.push({
    name: "New Section",
    children: []
  });
}

export function removeNodeAtPath(data: Section | Entry, path: number[]) {
  if (path.length === 0) return;
  let current: any = data;
  for (let i = 0; i < path.length - 1; i++) {
    current = current.children[path[i]];
  }
  current.children.splice(path[path.length - 1], 1);
}

