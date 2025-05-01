import { Fragment } from "react";
import { Listbox, ListboxOption, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const TargetSelectDropdown = ({
  targets,
  value,
  onChange,
}) => {
  if (!targets.length) return null;

  return (
    <div className="mt-4">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <Label className="block mb-1 text-xs font-medium text-slate-500">
              Select target
            </Label>

            <div className="relative">
              <ListboxButton className="relative w-full cursor-default rounded border border-slate-300 bg-white py-2 pl-3 pr-10 text-left text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <span className="block truncate">
                  {value ?? "Choose…"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-slate-400" />
                </span>
              </ListboxButton>

              <Transition
                as={Fragment}
                show={open}
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOption className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-sm shadow-lg ring-1 ring-black/10 focus:outline-none">
                  {targets.map((t) => (
                    <ListboxOption
                      key={t}
                      value={t}
                      className={({ active }) =>
                        `${active ? "bg-primary text-white" : "text-slate-900"
                        } cursor-pointer select-none py-2 pl-3 pr-9`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? "font-medium" : "font-normal"
                              }`}
                          >
                            {t}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                              <CheckIcon className="h-5 w-5" />
                            </span>
                          )}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOption>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default TargetSelectDropdown;