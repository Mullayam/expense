import { Button } from '@/components/ui/button';
import { HelpCircle, Plus, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ActionButtonsProps {
  onAddCategory: () => void;
  onRemoveCategory: () => void;
  isRemoveDisabled: boolean;
}

export function ActionButtons({
  onAddCategory,
  onRemoveCategory,
  isRemoveDisabled,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-4">
      <Button onClick={onAddCategory} className="flex-1">
        <Plus className="mr-2 h-4 w-4" />
        Add Expense
      </Button>
      <Button
        variant="destructive"
        onClick={onRemoveCategory}
        disabled={isRemoveDisabled}
        className="flex-1"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Remove Category
      </Button>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Select a category to manage your expenses</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}