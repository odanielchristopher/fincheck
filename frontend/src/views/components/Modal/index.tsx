import * as RdxDialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cn } from '../../../app/utils/cn';

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  onClose?(): void;
}

export function Modal({
  title,
  open,
  children,
  rightAction,
  onClose,
}: ModalProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm',
            'data-[state=open]:animate-overlay-show',
          )}
        />
        <RdxDialog.Content
          aria-describedby={undefined}
          className={cn(
            'data-[state=open]:animate-content-show',
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none',
          )}
        >
          <RdxDialog.Title asChild>
            <header className="h-12 flex items-center justify-between text-gray-800">
              <button
                onClick={onClose}
                className="h-12 w-12 flex items-center justify-center rounded-full outline-none"
              >
                <Cross2Icon className="w-6 h-6" />
              </button>

              <span className="text-lg font-bold tracking-[-1px]">{title}</span>

              <div className="h-12 w-12 flex items-center justify-center">
                {rightAction}
              </div>
            </header>
          </RdxDialog.Title>

          <div>{children}</div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
