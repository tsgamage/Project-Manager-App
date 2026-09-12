import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/shadcn/input-group";
import { Button } from "./shadcn/button";
import { SearchIcon, XIcon } from "lucide-react";
import type { ComponentProps } from "react";

interface Props {
  placeholder?: string;
  value: string;
  onSearch: ComponentProps<"input">["onChange"];
  onReset: () => void;
}

export default function SearchInput({
  placeholder,
  value,
  onSearch,
  onReset,
}: Props) {
  return (
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        value={value}
        onChange={onSearch}
        placeholder={placeholder ?? "Search ..."}
      />
      <InputGroupAddon align={"inline-end"}>
        <Button size={"sm"} variant={"ghost"} onClick={onReset}>
          <XIcon />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
