// 모든 API 오류 응답의 모양을 하나로 맞춘다: { error: { code, message } }
// 화면은 code 로 분기하고, message 는 사용자에게 그대로 보여 줄 수 있는 해요체 문장이다.

export type ErrorBody = { error: { code: string; message: string } };

/** 서비스·라우트에서 던지는 "예상한" 오류. 상태 코드와 화면용 문구를 함께 들고 있다 */
export class AppError extends Error {
  constructor(
    readonly statusCode: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorBody = (code: string, message: string): ErrorBody => ({
  error: { code, message },
});
