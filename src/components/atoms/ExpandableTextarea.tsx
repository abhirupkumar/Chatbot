import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ExpandableTextareaProps = Omit<TextareaProps, "rows"> & {
  lineHeight?: number;
  maxRows?: number;
};

export const ExpandableTextarea = forwardRef<
  HTMLTextAreaElement,
  ExpandableTextareaProps
>(
  (
    {
      value,
      lineHeight = 32,
      maxRows = 3,
      className,
      ...rest
    },
    ref,
  ) => {
    const [rows, setRows] = useState(1);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      ...textareaRef.current!,
    }));

    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        const previousRows = textarea.rows;

        // Reset the number of rows
        textarea.rows = 1;

        const currentRows = Math.floor(textarea.scrollHeight / lineHeight);

        if (currentRows === previousRows) {
          textarea.rows = currentRows;
        }

        if (currentRows >= maxRows) {
          textarea.rows = maxRows;
          textarea.scrollTop = textarea.scrollHeight;
        }

        setRows(currentRows < maxRows ? currentRows : maxRows);
      }
    }, [value, maxRows, lineHeight]);

    return (
      <Textarea
        ref={textareaRef}
        className={cn("min-h-0 resize-none overflow-hidden overflow-y-auto", className)}
        rows={rows}
        value={value}
        {...rest}
      />
    );
  },
);

ExpandableTextarea.displayName = "ExpandableTextarea";
