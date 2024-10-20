import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/constants/code";
import { capitalize } from "@/utils/string";
import { RefreshCw } from "lucide-react";
import { useMemo } from "react";

const PreviewHeader = ({
  selectedLanguage,
  onLanguageChange,
  onFetchRandomCode,
  loading,
}: {
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  onFetchRandomCode: () => void;
  loading: boolean;
}) => {
  const languageOptions = useMemo(
    () =>
      LANGUAGES.map((lang) => (
        <SelectItem key={lang} value={lang}>
          {capitalize(lang)}
        </SelectItem>
      )),
    []
  );

  return (
    <header className="flex justify-between items-center min-h-14">
      <Select onValueChange={onLanguageChange} value={selectedLanguage}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>{languageOptions}</SelectContent>
      </Select>
      <Button
        onClick={onFetchRandomCode}
        disabled={loading}
        className="flex items-center"
      >
        <RefreshCw className="size-4 mr-2" />
        New Example
      </Button>
    </header>
  );
};

export default PreviewHeader;
