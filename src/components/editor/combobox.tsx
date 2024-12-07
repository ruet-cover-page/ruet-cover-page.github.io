import {
  CaretSortIcon,
  CheckIcon,
  Cross1Icon,
  Cross2Icon,
} from '@radix-ui/react-icons';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { type WritableAtom, useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

export function Combobox({
  name,
  atom,
  options,
}: {
  name: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  atom: WritableAtom<string, any, void>;
  options: { value: string; label: string }[];
}) {
  const [value, setValue] = useAtom(atom);
  const reset = useResetAtom(atom);
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            // biome-ignore lint/a11y/useSemanticElements: <explanation>
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            aria-label={name}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : `Select ${name}...`}
            <CaretSortIcon className="mr-8 ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 z-10"
          aria-label="reset"
          onClick={reset}
        >
          <Cross1Icon className="h-4 w-4 opacity-50" />
        </Button>
      </div>
      <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0">
        <Command>
          <CommandInput placeholder={`Search ${name}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {name} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (currentValue !== value) setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
