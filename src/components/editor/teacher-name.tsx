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
import editorAtoms, {
  departmentLongMap,
  departmentShortMap,
} from '@/store/editor';
import { useQuery } from '@tanstack/react-query';
import { Command as CommandPrimitive } from 'cmdk';
import { type WritableAtom, atom, useAtom, useSetAtom } from 'jotai';
import { matchSorter } from 'match-sorter';
import {
  type ReactNode,
  memo,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export function TeacherName({
  nameAtom,
  designationAtom,
}: {
  nameAtom: WritableAtom<string, [string], void>;
  designationAtom: WritableAtom<string, [string], void>;
}) {
  const [open, setOpen] = useState(false);
  const [value, onValueChange] = useAtom(nameAtom);
  const search = useDeferredValue(value);
  const setDesignation = useSetAtom(designationAtom);
  const setDepartment = useSetAtom(editorAtoms.teacherDepartment);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data: teachers, isLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const res = await fetch(`${process.env.PUBLIC_API}/teachers`);
      const data = await res.json();
      return (data.list as { name: string; post: string; dept: string }[])
        .filter((x) => x.post !== 'Head')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((x, i) => ({ ...x, id: `${x.name} ${x.dept} ${x.post}:${i}` }));
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

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <Command
          shouldFilter={false}
          value={selected}
          onValueChange={setSelected}
        >
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
            >
              <Input placeholder="Teacher" ref={inputRef} />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target === inputRef.current
              ) {
                e.preventDefault();
              }
            }}
            className="w-[--radix-popover-trigger-width] p-0"
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
