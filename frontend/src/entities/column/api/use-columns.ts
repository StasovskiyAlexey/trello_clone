import { queryClient } from "@/shared/lib/query-client"
import type { TColumn } from "../model/types";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner"
import { useInjection } from "@/app/providers/di-provider";
import { TTYPES } from "@/shared/di/types";
import { ColumnService } from "./column.service";

export const useColumnMutations = () => {
  const columnService = useInjection<ColumnService>(TTYPES.ColumnService)

  const createMutation = useMutation({
    mutationFn: ({ data, boardId }: { data: { title: string }, boardId: number }) => 
      columnService.createColumn(data.title, boardId),
    onSuccess: (data, variables) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['board-item', variables.boardId] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.success(error.response?.data.detail)
      }
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ data, columnId, boardId }: { data: { title: string, order: number }, columnId: number, boardId: number }) => 
      columnService.updateColumn(data.title, data.order, columnId, boardId),
    onSuccess: (data, variables) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['board-item', variables.boardId] });
      queryClient.invalidateQueries({ queryKey: ['board-item', variables.columnId] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.success(error.response?.data.detail)
      }
    }
  });

  const deleteMutation = useMutation({
    mutationFn: ({ columnId, boardId }: { columnId: number, boardId: number }) => 
      columnService.deleteColumn(boardId, columnId),
    onSuccess: (data, variables) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['board-item', variables.boardId] });
      queryClient.removeQueries({ queryKey: ['board-item', variables.columnId] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.success(error.response?.data.detail)
      }
    }
  });

  const updateOrdersMutation = useMutation({
    mutationFn: ({boardId, columns}: {boardId: number, columns: TColumn[]}) => 
      columnService.reorderColumns(boardId, columns),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({queryKey: ['board-item', variables.boardId]})
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.detail)
      }
    },
  })

  return {
    createColumn: createMutation.mutate,
    updateColumn: updateMutation.mutate,
    deleteColumn: deleteMutation.mutate,
    reorderColumns: updateOrdersMutation.mutate,
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending || updateMutation.isPending
  };
};