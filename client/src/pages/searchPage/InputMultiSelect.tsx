import { useState } from "react";
import { Trash2 } from "lucide-react";

interface InputMultiSelectProps {
  name: string;
  placeholder: string;
  initialSelection: string[];
}

export default function InputMultiSelect({
  name,
  placeholder,
  initialSelection,
}: InputMultiSelectProps) {
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

  const inputListener = (event: any) => {
    if (event.key === "Esc") {
      event.target.value = "";
      return;
    }

    if (event.key === "Enter") {
      addSelection(event.target.value);
      event.target.value = "";
    }
    return;
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
        <input
          type="text"
          name={lowerCaseName}
          id={`${lowerCaseName}-select`}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
          placeholder={placeholder}
          onKeyDown={inputListener}
          onBlur={(event: any) => addSelection(event.target.value)}
        />
      </div>

      <ul>
        {selected.map((item) => {
          return (
            <li
              key={`${item}-${name}`}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm m-2"
            >
              <span className="text-gray-800">{item}</span>
              <button
                onClick={() => {
                  removeSelection(item);
                }}
                className="text-gray-400 hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors duration-200"
                aria-label={`remove-${item}`}
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
