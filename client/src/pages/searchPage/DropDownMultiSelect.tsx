import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DropDownMultiSelectProps {
  name: string;
  placeholder: string;
  options: string[];
  initialSelection: string[];
}

export default function DropDownMultiSelect({
  name,
  placeholder,
  options,
  initialSelection,
}: DropDownMultiSelectProps) {
  const lowerCaseName = name.toLowerCase();
  const [selected, setSelected] = useState<string[]>(initialSelection);

  const addSelection = (target: string) => {
    if (!target) {
      return;
    }

    if (selected.includes(target)) {
      return;
    }

    setSelected((previousValues: string[]) => [...previousValues, target]);
  };

  const removeSelection = (target: string) => {
    const updatedSelection = selected.filter((item) => item !== target);

    setSelected(updatedSelection);
  };

  const updateSelection = (current: string, target: string) => {
    if (!target) {
      return;
    }

    if (selected.includes(target)) {
      return;
    }
    const filteredSelection = selected.filter((item) => item !== current);
    setSelected([...filteredSelection, target]);
  };

  return (
    <>
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={lowerCaseName}
      >
        {name}
      </label>

      <div className="flex items-center space-x-2">
        <select
          name={lowerCaseName}
          id={`${lowerCaseName}-select`}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
          onChange={(event: any) => {
            addSelection(event.target.value);
            event.target.value = "";
          }}
        >
          <option selected value="">
            {placeholder}
          </option>

          {/* all option components*/}
          {options.map((option) => {
            return (
              <option value={option} id={`${option}-option`}>
                {option}
              </option>
            );
          })}
        </select>
      </div>

      <ul>
        {selected.map((item) => {
          return (
            <li
              key={`${item}-${name}`}
              id={`${lowerCaseName}-${item}`}
              className="flex items-center justify-between"
            >
              <select
                name={`${item}-${lowerCaseName}`}
                id={`${item}-${lowerCaseName}`}
                onChange={(event: any) => {
                  updateSelection(item, event.target.value);
                }}
                className=" bg-white border border-gray-200 rounded-lg p-3 shadow-sm m-2 w-full"
              >
                <option selected value={item}>
                  {item}
                </option>

                {/* all option components*/}
                {options.map((option) => {
                  return (
                    <option value={option} id={`${option}-option`}>
                      {option}
                    </option>
                  );
                })}
                <span className="text-gray-800">{item}</span>
                <button
                  onClick={() => {
                    removeSelection(item);
                  }}
                  className="text-gray-400 hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors duration-200"
                  aria-label={`remove ${item}`}
                  id={`remove-${item}`}
                >
                  <Trash2 />
                </button>
              </select>
              <button
                onClick={() => {
                  removeSelection(item);
                }}
                className="text-gray-400 hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors duration-200"
                aria-label={`remove ${item}`}
                id={`remove-${item}`}
              >
                <Trash2 />
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
