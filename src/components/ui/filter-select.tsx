import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";

type FilterItems<T extends string> = { value: T; label: string };

interface FilterSelectProps<T extends string> {
  label?: string;
  items: FilterItems<T>[];
  value: string;
  onValueChange: (value: T) => void;
}

export default function FilterSelect<T extends string>({
  label,
  items,
  value,
  onValueChange,
}: FilterSelectProps<T>) {
  return (
    <div>
      {label && (
        <p className="text-xs mb-1 font-medium text-muted-foreground">
          {label}
        </p>
      )}
      <Select
        items={items}
        value={value}
        onValueChange={(nextValue) => {
          if (nextValue !== null) onValueChange(nextValue as T);
        }}
      >
        <SelectTrigger size="sm" aria-label={label} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
