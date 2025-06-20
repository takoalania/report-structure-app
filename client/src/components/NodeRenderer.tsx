import React from 'react';
import { Entry, Section } from '../utils/types';
import {
  isEntry,
  computeSum,
  updateEntryNote,
  updateEntrySum,
  addEntry,
  addSection,
  removeNodeAtPath
} from '../utils/helpers';
import { FiPlus, FiMinus, FiFolderPlus, FiTrash2, FiChevronDown, FiChevronRight } from 'react-icons/fi';

type Props = {
  node: Entry | Section;
  path?: number[];
  collapsed: Set<string>;
  toggleCollapse: (path: number[]) => void;
  data: Section;
  setData: React.Dispatch<React.SetStateAction<Section | null>>;
};

const NodeRenderer: React.FC<Props> = ({
  node,
  path = [],
  collapsed,
  toggleCollapse,
  data,
  setData
}) => {
  if (isEntry(node)) {
    return (
      <div className="entry">
        <p><strong>{node.name}</strong></p>

        <label>
          Sum:
          <input
            type="number"
            defaultValue={node.sum}
            onBlur={(e) => {
              const newData = structuredClone(data);
              updateEntrySum(newData, path, Number(e.target.value));
              setData(newData);
            }}
          />
        </label>

        <label>
          Note:
          <textarea
            defaultValue={node.note}
            onBlur={(e) => {
              const newData = structuredClone(data);
              updateEntryNote(newData, path, e.target.value);
              setData(newData);
            }}
          />
        </label>

        <button
          className="danger"
          onClick={() => {
            const newData = structuredClone(data);
            removeNodeAtPath(newData, path);
            setData(newData);
          }}
        >
          <FiTrash2 style={{ marginRight: 4 }} />
          Delete Entry
        </button>
      </div>
    );
  } else {
    const key = path.join('-');
    const isCollapsed = collapsed.has(key);

    return (
      <div className="section">
        <h4 className="toggle" onClick={() => toggleCollapse(path)}>
          {isCollapsed ? <FiChevronRight /> : <FiChevronDown />} {node.name} – Total: {computeSum(node)}
        </h4>

        {!isCollapsed && (
          <>
            {node.children.map((child, i) => (
              <NodeRenderer
                key={i}
                node={child}
                path={[...path, i]}
                collapsed={collapsed}
                toggleCollapse={toggleCollapse}
                data={data}
                setData={setData}
              />
            ))}

            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => {
                  const newData = structuredClone(data);
                  const target = path.reduce((acc: any, i) => acc.children[i], newData);
                  addEntry(target);
                  setData(newData);
                }}
              >
                <FiPlus style={{ marginRight: 4 }} />
                Add Entry
              </button>

              <button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  const newData = structuredClone(data);
                  const target = path.reduce((acc: any, i) => acc.children[i], newData);
                  addSection(target);
                  setData(newData);
                }}
              >
                <FiFolderPlus style={{ marginRight: 4 }} />
                Add Section
              </button>

              {path.length > 0 && (
                <button
                  className="danger"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    const newData = structuredClone(data);
                    removeNodeAtPath(newData, path);
                    setData(newData);
                  }}
                >
                  <FiTrash2 style={{ marginRight: 4 }} />
                  Delete Section
                </button>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
};

export default NodeRenderer;
