export type BEGIN = Date

export type CATEGORY = string

export type CONTENT = string

export type CRAWLED_AT = Date

export type END = Date

export type NUM_AGREE = number

export type PETITION_IDX = INDEX

export type STATUS = '청원시작' | '청원진행중' | '청원종료' | '브리핑' | null

export type TITLE = string

export type INDEX = number

export type PETITION_IDX_LIST = PETITION_IDX[]

export type HTML = string

export type META = {
  begin: BEGIN
  end: END
  category: CATEGORY
}

export type PETION = {
  begin: BEGIN
  category: CATEGORY
  content: CONTENT
  crawled_at: CRAWLED_AT
  end: END
  num_agree: NUM_AGREE
  status: STATUS
  title: TITLE
  petition_idx: PETITION_IDX | undefined
}

export type PETION_LIST = PETION[]
