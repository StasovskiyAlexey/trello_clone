import { useInjection } from "@/app/providers/di-provider"
import { TTYPES } from "@/shared/di/types"
import { useQuery } from "@tanstack/react-query"
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