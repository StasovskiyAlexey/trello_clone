import { useInjection } from "@/app/providers/di-provider"
import { TTYPES } from "@/shared/di/types"
import { queryClient } from "@/shared/lib/query-client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { BoardService } from "./board.service"

export const useBoardsList = () => {
  const boardsService = useInjection<BoardService>(TTYPES.BoardService)

  return useQuery({
    queryKey: ['boards'],
    queryFn: () => boardsService.getBoards(),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
};

export const useBoard = (boardId?: number) => {
  const boardsService = useInjection<BoardService>(TTYPES.BoardService)

  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => boardsService.getBoard(boardId),
    enabled: !!boardId,
    select: (data) => data.data,
  });
};

export const useBoardMutations = () => {
  const boardId = parseInt(useParams({strict: false}).boardId)

  const createMutation = useMutation({
    mutationFn: (title: string) => 
      kanbanService.createBoard({ data: { title } }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['board-item', boardId] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.success(error.response?.data.detail)
      }
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ boardId, title }: { boardId: number, title: string }) => 
      kanbanService.updateBoard({ data: { title }, boardId }),
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

  const deleteMutation = useMutation({
    mutationFn: (id: number) => kanbanService.deleteBoard(id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['board-item', boardId] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.success(error.response?.data.detail)
      }
    }
  });

  return {
    createBoard: createMutation.mutate,
    updateBoard: updateMutation.mutate,
    deleteBoard: deleteMutation.mutate,
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  };
};