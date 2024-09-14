type Replace<T, R extends { [K in keyof T]?: unknown }> = {
  [P in keyof T]: P extends keyof R ? R[P] : T[P]
}

type RequiredFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] }

export type { Replace, RequiredFields }
