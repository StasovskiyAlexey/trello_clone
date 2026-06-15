import { BoardService } from '@/entities/board/api/board.service'
import { Container } from 'inversify'
import { TTYPES, type THttpClient } from './types'
import { ColumnService } from '@/entities/column/api/column.service'
import { CardService } from '@/entities/card/api/card.service'
import { axiosClient } from '@/shared/api/client'

export const container = new Container()

container.bind<BoardService>(TTYPES.BoardService).to(BoardService).inSingletonScope()
container.bind<ColumnService>(TTYPES.ColumnService).to(ColumnService).inSingletonScope()
container.bind<CardService>(TTYPES.CardService).to(CardService).inSingletonScope()
container.bind<THttpClient>(TTYPES.HttpClient).toConstantValue(axiosClient)