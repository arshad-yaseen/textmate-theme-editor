"use client";

import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Editor, Monaco } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  DEFAULT_CODE_LANGUAGE,
  DEFAULT_DARK_CODE_THEME,
  DEFAULT_LIGHT_CODE_THEME,
  DEFAULT_MONACO_OPTIONS,
} from "@/constants/code";
import {
  CodeEditorProps,
  CodeEditorRef,
  EditorModel,
  EditorOptions,
  StandaloneEditor,
} from "@/types/code";
import { assignRef } from "@/utils/misc";
import { deepObjectMerge } from "@/utils/object";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { TextAlignLeftIcon } from "@radix-ui/react-icons";
import { getResolvedCodeTheme } from "@/utils/code";

const INITIAL_HEIGHT = 40;
const EDITOR_TOP_PADDING = (DEFAULT_MONACO_OPTIONS.padding?.top ?? 5) / 2;

export const CodeEditor = memo(
  forwardRef<CodeEditorRef, CodeEditorProps>(
    (
      {
        className,
        containerClassName,
        defaultValue,
        language = DEFAULT_CODE_LANGUAGE,
        readOnly,
        options,
        onMount,
        hideCodeFormatter,
        theme = {
          dark: DEFAULT_DARK_CODE_THEME,
          light: DEFAULT_LIGHT_CODE_THEME,
        },
        ...props
      }: CodeEditorProps,
      ref
    ) => {
      const { resolvedTheme } = useTheme();

      const [height, setHeight] = useState<number>(INITIAL_HEIGHT);

      const editorTopPadding = useRef(EDITOR_TOP_PADDING);

      const monacoRef = useRef<Monaco | null>(null);
      const editorRef = useRef<StandaloneEditor | null>(null);
      const modelRef = useRef<EditorModel | null>(null);

      const [editorWidth, setEditorWidth] = useState<number | undefined>(
        undefined
      );

      const containerRef = useRef<HTMLDivElement>(null);

      const handleEditorDidMount = useCallback(
        async (_editor: StandaloneEditor, _monaco: Monaco) => {
          const _model = _editor.getModel();

          editorRef.current = _editor;
          monacoRef.current = _monaco;
          modelRef.current = _model;

          assignRef(ref, { editor: _editor, model: _model });

          if (_model) {
            _model.updateOptions({
              tabSize: 2,
              indentSize: 2,
              trimAutoWhitespace: true,
            });
          }

          _editor.onDidContentSizeChange(() => {
            setHeight(_editor.getContentHeight() + editorTopPadding.current);
          });

          onMount?.(_editor, _monaco, _model);
        },
        [ref, onMount]
      );

      // set the editor width to the container width
      useEffect(() => {
        const handleResize = () => {
          if (containerRef.current) {
            setEditorWidth(containerRef.current.clientWidth);
          }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        if (containerRef.current) {
          resizeObserver.observe(containerRef.current);
        }

        return () => {
          resizeObserver.disconnect();
        };
      }, []);

      // layout the editor when the width changes
      useEffect(() => {
        if (editorRef.current) {
          editorRef.current.layout();
        }
      }, [editorWidth]);

      const formatCode = useCallback(() => {
        if (!editorRef.current) return;
        const action = editorRef.current.getAction(
          "editor.action.formatDocument"
        );
        if (action) {
          action.run();
        }
      }, []);

      const memoizedEditorOptions = useMemo<EditorOptions>(
        () => deepObjectMerge({ ...options, readOnly }, DEFAULT_MONACO_OPTIONS),
        [options, readOnly]
      );

      return (
        <div
          className={cn("relative grid h-full w-full", containerClassName)}
          ref={containerRef}
        >
          {!hideCodeFormatter && !readOnly && (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  className="absolute right-2 top-2 z-10"
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => formatCode()}
                >
                  <TextAlignLeftIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Format Code (Cmd + S)</TooltipContent>
            </Tooltip>
          )}
          <Editor
            options={memoizedEditorOptions}
            {...props}
            language={language}
            theme={getResolvedCodeTheme(resolvedTheme, theme)}
            defaultValue={defaultValue}
            height={height}
            width={editorWidth}
            onMount={handleEditorDidMount}
            className={cn(
              "h-full space-y-0 border bg-background font-mono",
              className
            )}
          />
        </div>
      );
    }
  )
);

CodeEditor.displayName = "CodeEditor";
