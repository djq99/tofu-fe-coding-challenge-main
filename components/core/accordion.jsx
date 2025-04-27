import { Disclosure, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid';
import classNames from 'classnames';

const Accordion = ({
  label,
  children,
  initOpen = true,
  customizeClassName = {},
  iconPosition = 'left',
  testId = '',
  disabled = false,
}) => {
  return (
    <Disclosure defaultOpen={initOpen}>
      {({ open }) => (
        <div
          data-testid={testId}
          className={classNames(
            customizeClassName.border
              ? customizeClassName.border
              : 'rounded-sm border border-neutral-200',
            customizeClassName.paddingX ? customizeClassName.paddingX : 'px-1',
            customizeClassName.paddingY ? customizeClassName.paddingY : 'py-2',
            customizeClassName.paddingB
          )}
        >
          {iconPosition === 'left' && (
            <Disclosure.Button
              disabled={disabled}
              className="flex gap-x-2 items-center w-full bg-white px-2 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring"
            >
              {open ? (
                <ChevronDownIcon className="h-6 w-6" />
              ) : (
                <ChevronRightIcon className="h-6 w-6" />
              )}
              {label}
            </Disclosure.Button>
          )}
          {iconPosition === 'right' && (
            <>
              <Disclosure.Button disabled={disabled} className="w-full">
                <header
                  className={classNames(
                    'flex justify-between min-w-full my-4',
                    customizeClassName.buttonMarginY
                      ? customizeClassName.buttonMarginY
                      : 'my-4'
                  )}
                >
                  <h3 className="text-black font-medium">{label}</h3>

                  {open ? (
                    <ChevronUpIcon className="h-6 w-6 text-neutral-500 cursor-pointer" />
                  ) : (
                    <ChevronRightIcon className="h-6 w-6 text-neutral-500 cursor-pointer" />
                  )}
                </header>
              </Disclosure.Button>
              <div
                className={classNames(
                  'w-full border-t',
                  customizeClassName.buttonDividerColor
                    ? customizeClassName.buttonDividerColor
                    : 'border-gray-300'
                )}
              />
            </>
          )}

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel>
              <div
                className={classNames(
                  'bg-white flex flex-col gap-y-2',
                  customizeClassName.paddingX
                    ? customizeClassName.paddingX
                    : 'px-3',
                  customizeClassName.paddingY
                    ? customizeClassName.paddingY
                    : 'py-2'
                )}
              >
                {children}
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};

export default Accordion;
