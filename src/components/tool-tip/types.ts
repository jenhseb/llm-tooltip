export interface TipBaseProps<P extends object> {
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  open?: boolean;
  Content: React.ComponentType<P>;
  contentProps?: P;
}
