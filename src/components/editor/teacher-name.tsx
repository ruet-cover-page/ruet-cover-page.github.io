/**
 * @link https://github.com/Balastrong/shadcn-autocomplete-demo/
 */

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  departmentLongMap,
  departmentShortMap,
  teachersIDBStore,
} from '@/store/editor';
import { ArrowLeftIcon, Cross1Icon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { Command as CommandPrimitive } from 'cmdk';
import * as idbKeyVal from 'idb-keyval';
import { type WritableAtom, useAtom, useSetAtom } from 'jotai';
import { type RESET, useResetAtom } from 'jotai/utils';
import { matchSorter } from 'match-sorter';
import {
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button } from '../ui/button';
import { FormItemContext } from './form-item';
import classes from './teacher-name.module.css';

export function TeacherName({
  nameAtom,
  designationAtom,
  departmentAtom,
}: {
  nameAtom: WritableAtom<string, [string | typeof RESET], void>;
  designationAtom: WritableAtom<string, [string], void>;
  departmentAtom: WritableAtom<string, [string], void>;
}) {
  const [open, setOpen] = useState(false);
  const [value, onValueChange] = useAtom(nameAtom);
  const reset = useResetAtom(nameAtom);
  const search = useDeferredValue(value);
  const setDesignation = useSetAtom(designationAtom);
  const setDepartment = useSetAtom(departmentAtom);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { id } = useContext(FormItemContext);

  const { data: teachers, isLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      try {
        const updatedAt = (await idbKeyVal.get(
          'updatedAt',
          teachersIDBStore,
        )) as Date | null;
        if (new Date().getTime() - (updatedAt?.getTime() || 0) < 36e5) {
          const teachers = await idbKeyVal.get('teachers', teachersIDBStore);
          if (Array.isArray(teachers)) return teachers;
        }
        const res = await fetch(`${process.env.PUBLIC_API}/teachers`);
        const data = await res.json();
        const teachers = (
          data.list as { name: string; post: string; dept: string }[]
        )
          .filter((x) => x.post !== 'Head')
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((x, i) => ({ ...x, id: `${x.name} ${x.dept} ${x.post}:${i}` }));

        await idbKeyVal.setMany(
          [
            ['updatedAt', new Date()],
            ['teachers', teachers],
          ],
          teachersIDBStore,
        );

        return teachers;
      } catch {
        const teachers = await idbKeyVal.get('teachers', teachersIDBStore);
        return Array.isArray(teachers) ? teachers : [];
      }
    },
  });

  const filteredTeachers = useMemo(() => {
    return (
      teachers &&
      (search
        ? matchSorter(teachers, search, {
            keys: ['name', 'post', 'dept'],
          }).slice(0, 5)
        : teachers)
    );
  }, [search, teachers]);

  const onSelectItem = (id: string) => {
    const i = +id.slice(id.lastIndexOf(':') + 1);
    const teacher = teachers?.[i];
    if (teacher) {
      onValueChange(teacher.name || '');
      setDesignation(teacher.post || '');
      const dept = departmentLongMap[teacher.dept.toLowerCase()];
      dept && setDepartment(dept);
    }
    setOpen(false);
  };

  const [selected, setSelected] = useState('');

  useEffect(() => {
    const selected = filteredTeachers?.[0]?.id;
    selected && setSelected(selected);
  }, [filteredTeachers]);

  useEffect(() => {
    inputRef.current?.setAttribute('id', id);
    inputRef.current
      ?.closest('[cmdk-root]')
      ?.querySelector('label')
      ?.setAttribute('for', id);
  });

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        open && classes.containerFullScreen,
      )}
    >
      <button
        type="button"
        className={cn('hidden', classes.backDrop)}
        onClick={() => setOpen(false)}
        tabIndex={-1}
      />
      <Button
        variant="outline"
        size="icon"
        className={cn('hidden', classes.back)}
        onClick={() => setOpen(false)}
      >
        <ArrowLeftIcon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Back</span>
      </Button>
      <Popover open={open} onOpenChange={setOpen}>
        <Command
          shouldFilter={false}
          value={selected}
          onValueChange={setSelected}
          className={cn('bg-transparent', classes.command)}
        >
          <div className="relative">
            <PopoverAnchor asChild>
              <CommandPrimitive.Input
                asChild
                value={value}
                onValueChange={onValueChange}
                onKeyDown={(e) => {
                  setOpen(e.key !== 'Escape');
                }}
                onMouseDown={() => setOpen((open) => !!value || !open)}
                onFocus={() => setOpen(true)}
                className={classes.input}
              >
                <Input placeholder="Teacher" ref={inputRef} />
              </CommandPrimitive.Input>
            </PopoverAnchor>
            {!!value && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 bottom-0 z-10"
                aria-label="reset"
                onClick={() => {
                  reset();
                  inputRef.current?.focus();
                }}
              >
                <Cross1Icon className="h-4 w-4 opacity-50" />
              </Button>
            )}
          </div>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            onFocus={() => inputRef.current?.focus()}
            className="w-screen sm:w-[var(--radix-popper-anchor-width)] p-0"
          >
            <CommandList>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {filteredTeachers?.length && !isLoading ? (
                <CommandGroup>
                  {filteredTeachers.map((teacher) => (
                    <CommandItem
                      key={teacher.id}
                      value={teacher.id}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={onSelectItem}
                      className="block"
                    >
                      <div>{teacher.name}</div>
                      <div className="text-xs">{teacher.post}</div>
                      <div className="text-xs">
                        Dept. of{' '}
                        {departmentShortMap[teacher.dept.toLowerCase()]}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
